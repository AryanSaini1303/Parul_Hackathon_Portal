"use client";
import BackgroundVideo from "@/components/BackgroundVideo";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function LandingPage({ params }) {
  const [session, setSession] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phoneNumber: "",
    name: "",
    university: "",
    purpose: "",
    referral: "",
  });

  useEffect(() => {
    setSession(JSON.parse(decodeURIComponent(params.session)));
  }, [params]);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Extract email from session
    const email = session?.user?.email; // Ensure session is available

    try {
      setLoading(true);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          email, // Include email from the session
        }),
      });

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok) {
        setLoading(false);
        signOut({ callbackUrl: "/" }).then(() => {
          router.push("/");
        });
      } else {
        alert("Error registering user");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {session ? (
        <>
          <BackgroundVideo />
          <section className={styles.header}>
            <h1>Registration Form</h1>
          </section>
          <div className={styles.card}>
            <form onSubmit={handleFormSubmit}>
              <div className={styles.firstSection}>
                <section>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </section>
                <section>
                  <label htmlFor="phoneNumber">Contact</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </section>
                <section>
                  <label htmlFor="university">University</label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    required
                  />
                </section>
                <section>
                  <label htmlFor="github">Github</label>
                  <input
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                  />
                </section>
              </div>
              <br />
              <section className={styles.secondSection}>
                <section className={styles.purpose}>
                  <label htmlFor={styles.purpose}>
                    Why do you want to participate?
                  </label>
                  <textarea
                    type="text"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    cols={5}
                  />
                </section>
                <section className={styles.referral}>
                  <label htmlFor={styles.referral}>Referral code from Everdrawn</label>
                  <button type="button">
                    <a
                      href="https://game.everdawn.io/enter/register/?referral=web3hackselaunch"
                      target="_blank"
                    >
                      Create EverDrawn Login
                    </a>
                  </button>
                  <input
                    type="text"
                    name="referral"
                    value={formData.referral}
                    onChange={handleInputChange}
                    required
                    placeholder="Your Referral Code"
                  />
                </section>
              </section>
              <br />
              <button type="submit" className={styles.submitBtn}>Submit</button>
            </form>
          </div>
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" }).then(() => {
                router.push("/");
              });
            }}
            className={styles.signOut}
          >
            Sign Out
          </button>
          {loading && <h1 style={{textAlign:"center", color:"white", fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif", margin:"0.5rem"}}>Saving User Data</h1>}
        </>
      ) : (
        <p>Loading...</p> // Show loading state or a message if not signed in
      )}
    </>
  );
}
