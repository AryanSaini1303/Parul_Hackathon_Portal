"use client";
import BackgroundVideo from "@/components/BackgroundVideo";
import Button from "@/components/button";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EvaluationPage() {
  const { data: session, error, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState();
  console.log(session?.user.email);

  useEffect(() => {
    const fetchEvaluatorTeams = async () => {
      try {
        const response = await fetch(
          `/api/getEvaluatorTeams?email=${session?.user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setTeams(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    session && fetchEvaluatorTeams();
  }, [session]);
  return (
    <div className={styles.container}>
      <BackgroundVideo />
      {status == "unauthenticated" ? (
        <div className={styles.loginContainer}>
          <Button
            text={"Login In to Evaluate"}
            onClick={() => {
              signIn("google");
            }}
          />
        </div>
      ) : (
        <section className={styles.teams}>
          <Button
            text={"Sign Out"}
            onClick={() => {
              signOut({ callbackUrl: "/evaluation" });
            }}
          />
          <ul>
            {loading ? (
              <p style={{ textAlign: "center" }}>Loading...</p>
            ) : teams.length != 0 ? (
              teams.map((element) => (
                <li
                  key={element.teamId}
                  style={
                    element.Innovation != 0 ||
                    element.Uniqueness != 0 ||
                    element.Feasibility != 0 ||
                    element.Presentation != 0 ||
                    element.Readiness != 0
                      ? {
                          pointerEvents: "none",
                          opacity: "0.7",
                          filter: "brightness(50%)",
                        }
                      : null
                  }
                >
                  <Link
                    href={`/evaluation/${encodeURIComponent(
                      element.teamId
                    )}_${encodeURIComponent(element.teamName)}`}
                  >
                    <h1>{element.teamName}</h1>
                    <h5>{element.teamId}</h5>
                  </Link>
                </li>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>You are not an Evaluator</p>
            )}
          </ul>
        </section>
      )}
    </div>
  );
}
