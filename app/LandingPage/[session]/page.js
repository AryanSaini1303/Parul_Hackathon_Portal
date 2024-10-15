"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LandingPage({ params }) {
  const [session, setSession] = useState();
  const router = useRouter();

  const [formData, setFormData] = useState({
    phoneNumber: "",
    name: "",
    university: "",
    purpose: "",
    screenshot: "",
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

    // Log for debugging
    console.log("Email:", email); // Check if email is being captured

    try {
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
        alert("User registered successfully");
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
          <h1>
            Signed In!, {session.user.name} {session.user.email}
          </h1>
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" }).then(() => {
                router.push("/");
              });
            }}
          >
            Sign Out
          </button>

          {/* Form for user input */}
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="name">Enter Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <br />
            <label htmlFor="phoneNumber">Enter your phone number: </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
            <br />
            <label htmlFor="university">University</label>
            <input
              type="text"
              name="university"
              id=""
              value={formData.university}
              onChange={handleInputChange}
              required
            />
            <br />
            <label htmlFor="purpose">Purpose</label>
            <input
              type="text"
              name="purpose"
              id=""
              value={formData.purpose}
              onChange={handleInputChange}
              required
            />
            <br />
            <label htmlFor="screenshot">Screenshot Link</label>
            <input
              type="text"
              name="screenshot"
              value={formData.screenshot}
              onChange={handleInputChange}
              required
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <p>Loading...</p> // Show loading state or a message if not signed in
      )}
    </>
  );
}
