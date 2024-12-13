"use client";
import styles from "./page.module.css";
import AnimatedGlobe from "@/components/animatedGlobe";
import BackgroundVideo from "@/components/BackgroundVideo";
import Button from "@/components/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TeamsPage() {
  const [screenWidth, setScreenWidth] = useState();
  const { data: session, status } = useSession();
  const [showCodeFlag, setShowCodeFlag] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [copyClick, setCopyClick] = useState(false);
  const router = useRouter();
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
    if (generatedCode) {
      const setTeamId = async () => {
        try {
          const response = await fetch(
            `/api/setTeamId?email=${session.user.email}&teamId=${generatedCode}&teamName=${teamName}&role=Leader`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          console.log(data);
          if (data == "ok") {
            setShowCodeFlag(true);
            setLoading(false);
          }
        } catch (error) {
          console.error(error.message);
        }
      };
      setTeamId();
    }
  }, [generatedCode]);

  useEffect(() => {
    if (loading) {
      const getTeamFlag = async () => {
        try {
          const response = await fetch(
            `/api/getTeamFlag?email=${session.user.email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          // console.log(data);

          if (!data.teamId) {
            const response1 = await fetch(`/api/getAllTeamNames`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data1 = await response1.json();
            let matchFound = false;
            data1.forEach((element, index) => {
              const teamNameLower = teamName.toLowerCase();
              // Ensure `teamName` exists and is valid
              if (
                element.teamName &&
                element.teamName.toLowerCase() === teamNameLower
              ) {
                alert("This team name is already taken!");
                setShowCodeFlag(false);
                setLoading(false);
                matchFound = true; // Set flag and stop further checks
                return;
              }
              // If this is the last element and no match has been found
              if (index === data1.length - 1 && !matchFound) {
                console.log("No match found, generating code...");
                setGeneratedCode("PHV" + makeid(8));
              }
            });
          } else {
            alert("You are already a member of a team!");
            setTeamName();
            setLoading(false);
            setShowCodeFlag(false);
          }
        } catch (error) {
          console.error(error.message);
        }
      };
      getTeamFlag();
    }
  }, [loading]);

  function handleSubmit(e) {
    e.preventDefault();
    setTeamName(e.target.squadName.value);
    setLoading(true);
    setShowCodeFlag(true);
    console.log(e.target.squadName.value);
  }

  function handleChange(e) {
    e.preventDefault();
    // if (e.target.value == "") {
    //   setShowCodeFlag(false);
    //   setLoading(false);
    // }
  }

  function makeid(length) {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  function handleCopy() {
    setCopyClick(true);
    navigator.clipboard.writeText(generatedCode);
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
                <form onSubmit={handleSubmit}>
                  <label htmlFor="squadName">Team Name</label>
                  <input
                    type="text"
                    name="squadName"
                    placeholder="e.g. Resonix"
                    onChange={handleChange}
                  />
                </form>
                {showCodeFlag && !loading ? (
                  <div className={styles.teamIdContainer}>
                    <h1>
                      Team Id: {generatedCode}
                      <span>
                        {!copyClick ? (
                          <svg
                            viewBox="-85 -85 1024 1024"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            onClick={handleCopy}
                          >
                            <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z" />
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 512 512"
                            fill="currentColor"
                            height="1em"
                            width="1em"
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
                    </h1>
                    <p>
                      Copy the above code &amp; share it with your teammates to
                      join.
                    </p>
                  </div>
                ) : (
                  showCodeFlag &&
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
