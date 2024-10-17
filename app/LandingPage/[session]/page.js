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

  const [screenWidth, setScreenWidth] = useState();
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
                    rows={screenWidth > 426 ? 5 : 3}
                    cols={screenWidth > 426 ? 5 : 3}
                  />
                </section>
                <section className={styles.referral}>
                  <label htmlFor={styles.referral}>
                    Referral code from Everdrawn
                  </label>
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
              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </form>
          </div>
          {screenWidth > 375 && (
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" }).then(() => {
                  router.push("/");
                });
              }}
              className={styles.signOut}
            >
              {screenWidth < 427 ? (
                <svg
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32v224c0 17.7 14.3 32 32 32s32-14.3 32-32V32zm-144.5 88.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4 0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" />
                </svg>
              ) : (
                "Sign Out"
              )}
            </button>
          )}
          {loading && (
            <h1
              style={{
                textAlign: "center",
                color: "white",
                fontFamily:
                  "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                margin: "0.5rem",
              }}
            >
              Saving User Data
            </h1>
          )}
        </>
      ) : (
        <p>Loading...</p> // Show loading state or a message if not signed in
      )}
    </>
  );
}
