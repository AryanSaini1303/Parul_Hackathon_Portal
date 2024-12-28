"use client";
import Button from "@/components/button";
import styles from "./page.module.css";
import BackgroundVideo from "@/components/BackgroundVideo";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MarkingPage({ params }) {
  const { data: session, error, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [scoreUpdationLoading, setScoreUpdationLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [scores, setScores] = useState({
    Innovation: "",
    Uniqueness: "",
    Feasibility: "",
    Presentation: "",
    Readiness: "",
  });
  const teamInfo = params.teamInfo;
  // console.log("params", params.params);
  // console.log("teamInfo", teamInfo);
  const teamInfoArray = teamInfo?.split("_");
  // console.log("teamInfoArray", teamInfoArray);
  const teamId = decodeURIComponent(teamInfoArray[0]);
  const teamName = decodeURIComponent(teamInfoArray[1]);
  const router=useRouter();
  // console.log(teamId);
  // console.log(teamName);

  useEffect(() => {
    const verifyEvaluator = async () => {
      try {
        const response = await fetch(
          `/api/verifyEvaluator?email=${session?.user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setVerified(data);
        setLoading(false);
        // console.log(data);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    session && verifyEvaluator();
  }, [session]);

  useEffect(() => {
    const updateScores = async () => {
      if (teamId && Object.keys(scores).length > 0 && verified) {
        setScoreUpdationLoading(true)
        try {
          const response = await fetch(`/api/setScores?teamId=${teamId}&scores=${JSON.stringify(scores)}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Failed to update evaluation');
          }
          const data = await response.json();
          console.log('Scores updated successfully:', data);
          setScoreUpdationLoading(false);
          alert("Scores updated successfully 🎉");
          router.push("/evaluation")
        } catch (error) {
          console.error('Error updating scores:', error);
        }
      }
    };
    updateScores();
  }, [scores]);

  if ((verified != true && !loading) || status == "unauthenticated")
    return "unauthorised";

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e.target.Innovation.value);
    setScores({
      Innovation: e.target.Innovation.value,
      Uniqueness: e.target.Uniqueness.value,
      Feasibility: e.target.Feasibility.value,
      Presentation: e.target.Presentation.value,
      Readiness: e.target.Readiness.value,
    });
  }
  // console.log(scores);

  return (
    <div className={styles.container}>
      <Button
        text={"Sign Out"}
        onClick={() => {
          signOut({ callbackUrl: "/evaluation" });
        }}
      />
      <BackgroundVideo />
      {!loading ? (
        <div className={styles.evaluationContainer}>
          <section className={styles.info}>
            <h1>Team: {teamName}</h1>
            <h3>Team Id: {teamId}</h3>
            {/* <h2>Evaluator Name: Aryan Saini</h2> */}
          </section>
          <form onSubmit={handleSubmit}>
            <label htmlFor="Innovation">Innovation</label>
            <input
              type="number"
              name="Innovation"
              max={10}
              step={0.01}
              required
            />
            <label htmlFor="Uniqueness">Uniqueness</label>
            <input
              type="number"
              name="Uniqueness"
              max={10}
              step={0.01}
              required
            />
            <label htmlFor="Feasibility">Feasibility</label>
            <input
              type="number"
              name="Feasibility"
              max={10}
              step={0.01}
              required
            />
            <label htmlFor="Presentation">Presentation</label>
            <input
              type="number"
              name="Presentation"
              max={10}
              step={0.01}
              required
            />
            <label htmlFor="Readiness">Readiness</label>
            <input
              type="number"
              name="Readiness"
              max={10}
              step={0.01}
              required
            />
            <Button type={"submit"} text={scoreUpdationLoading?"Submitting...":"Submit"} fontSize={"1rem"} />
          </form>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>Loading...</p>
      )}
    </div>
  );
}
