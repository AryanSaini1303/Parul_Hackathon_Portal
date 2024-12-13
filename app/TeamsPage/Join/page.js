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
  const [teamId, setTeamId] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [joinFlag, setJoinFlag] = useState(false);
  const [inputFlag, setInputFlag] = useState(false);
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
    if (joinFlag) {
      const setTeamId = async () => {
        try {
          const response = await fetch(
            `/api/setTeamId?email=${session.user.email}&teamId=${teamId}&role=Member&teamName=${teamMembers[0].teamName}`,
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
            alert("You have successfully joined the team 🎉");
            setInputFlag(false);
            setJoinFlag(false);
            router.push(`/TeamsPage/TeamInfo?q=${teamId}`);
          } else if ((data.message = "Already a member of a team")) {
            alert(`You are already a member of the team "${data.teamName}"`);
            setLoading(false);
            setShowCodeFlag(false);
            setInputFlag(false);
            setJoinFlag(false);
          }
        } catch (error) {
          console.error(error.message);
        }
      };
      setTeamId();
    }
  }, [joinFlag]);

  useEffect(() => {
    if (teamId && inputFlag == true) {
      const getTeamMembers = async () => {
        try {
          const response = await fetch(`/api/getTeamMembers?teamId=${teamId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          console.log(data);
          let alreadyJoinedFlag = false;
          data.map((element) => {
            if (element.email == session.user.email) {
              alreadyJoinedFlag = true;
            }
          });
          if (data.length == 0) {
            alert("Enter a valid Team Id");
            setInputFlag(false);
            setJoinFlag(false);
            setLoading(false);
            setShowCodeFlag(false);
          } else if (alreadyJoinedFlag) {
            alert("You are already part of this team!");
            setInputFlag(false);
            setJoinFlag(false);
            setTeamMembers(data);
            setLoading(false);
            setShowCodeFlag(false);
          } else {
            setTeamMembers(data);
            setLoading(false);
          }
        } catch (error) {
          console.error(error.message);
        }
      };
      getTeamMembers();
    }
  }, [teamId, inputFlag]);

  function handleSubmit(e) {
    e.preventDefault();
    setInputFlag(true);
    setTeamId(e.target.teamId.value);
    setLoading(true);
    setShowCodeFlag(true);
    console.log(e.target.teamId.value);
  }

  function handleChange(e) {
    e.preventDefault();
    // if (e.target.value == "") {
    //   setShowCodeFlag(false);
    //   setLoading(false);
    // }
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
                  <label htmlFor="teamId">Team Id</label>
                  <input
                    type="text"
                    name="teamId"
                    placeholder="e.g. PHVjd2wem"
                    onChange={handleChange}
                  />
                </form>
                {showCodeFlag && !loading ? (
                  <div className={styles.teamNameContainer}>
                    <h1>{teamMembers[0].teamName}</h1>
                    <h3>Team Members:</h3>
                    <ol>
                      {teamMembers.map((element) => (
                        <>
                          <li key={element.name}>{element.name}</li>
                        </>
                      ))}
                    </ol>
                  </div>
                ) : (
                  showCodeFlag &&
                  loading && (
                    <p style={{ color: "white", fontFamily: "cursive" }}>
                      Loading...
                    </p>
                  )
                )}
                {showCodeFlag && !loading && (
                  <Button
                    text={joinFlag ? "Joining..." : "Join"}
                    fontSize={"0.8rem"}
                    width={"fit-content"}
                    onClick={() => {
                      setJoinFlag(true);
                    }}
                  />
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
