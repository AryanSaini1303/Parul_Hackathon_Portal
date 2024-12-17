"use client";
import styles from "./page.module.css";
import AnimatedGlobe from "@/components/animatedGlobe";
import BackgroundVideo from "@/components/BackgroundVideo";
import Button from "@/components/button";
import { signOut, useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";

export default function TeamsPage() {
  const [screenWidth, setScreenWidth] = useState();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState();
  const [copyClick, setCopyClick] = useState(false);
  let teamId;
  if (typeof window !== "undefined") {
    teamId = localStorage.getItem("teamId");
  }
  // console.log(teamId);
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
    const getTeamMembers = async () => {
      try {
        const response = await fetch(`/api/getTeamMembers?teamId=${teamId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        // console.log(data);
        setTeamMembers(data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    getTeamMembers();
  }, []);

  function handleCopy() {
    setCopyClick(true);
    navigator.clipboard.writeText(teamId);
    setTimeout(() => {
      setCopyClick(false);
    }, 2000);
  }

  if (status == "unauthenticated") return <p>Unauthorised</p>;
  if (typeof window !== "undefined") {
    if (localStorage.getItem("registrationFlag") == "false") {
      return <p>You are not registered yet!</p>;
    }
  }

  return (
    status == "authenticated" && (
      <>
        <BackgroundVideo />
        <div className={styles.container}>
          <div className={styles.card}>
            <section>
              <div className={styles.info}>
                {!loading && teamMembers ? (
                  <div className={styles.teamNameContainer}>
                    <h1>
                      {teamMembers[0].teamName} (
                      <span
                        style={{
                          fontWeight: "lighter",
                          fontFamily: "sans-serif",
                          fontSize: "1.4rem",
                        }}
                      >
                        {teamMembers[0].teamId}
                      </span>
                      <span>
                        {!copyClick ? (
                          <svg
                            viewBox="-85 -85 1024 1024"
                            fill="currentColor"
                            height="1.5rem"
                            width="1.5rem"
                            onClick={handleCopy}
                          >
                            <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z" />
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 512 512"
                            fill="currentColor"
                            height="1.5rem"
                            width="1.5rem"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={32}
                              d="M464 128L240 384l-96-96M144 384l-96-96M368 128L232 284"
                            />
                          </svg>
                        )}
                      </span>
                      ){" "}
                    </h1>
                    <h3>Team Members:</h3>
                    <ol>
                      {teamMembers.map((element) => (
                        <>
                          <li key={element.name}>
                            {element.name}{" "}
                            {element.role == "Leader" && `(${element.role})`}
                          </li>
                        </>
                      ))}
                    </ol>
                  </div>
                ) : (
                  loading && (
                    <p style={{ color: "white", fontFamily: "cursive" }}>
                      Loading...
                    </p>
                  )
                )}
              </div>
              {screenWidth > 426 && <AnimatedGlobe />}
            </section>
          </div>
          <Button
            text={"Sign Out"}
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
            width={"fit-content"}
            position={"absolute"}
            top={"1rem"}
            right={"1rem"}
          />
        </div>
      </>
    )
  );
}
