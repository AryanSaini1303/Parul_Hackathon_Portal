"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import BackgroundVideo from "@/components/BackgroundVideo";
import { useSession } from "next-auth/react";

const Leaderboard = () => {
  const { data: session, status } = useSession();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (
    status == "unauthenticated" ||
    (session && session.user.email != "yograj.rr@gmail.com")
  ) {
    return <p>Unauthorised</p>;
  } else {
    return (
      <>
        <BackgroundVideo />
        <div className={styles.wrapper}>
          <h1>Leaderboard</h1>
          {loading ? (
            <p>Fetching Data...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Game</th>
                  <th>Quiz</th>
                  <th>Tasks</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry, index) => (
                  <tr key={entry.id}>
                    <td>{index+1}</td>
                    <td>{entry.name}</td>
                    <td>{entry.game}</td>
                    <td>{entry.quiz || "N/A"}</td>
                    <td>{entry.tasks || "N/A"}</td>
                    <td>{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {leaderboardData.length === 0 && !loading&& <p>No entries found.</p>}
        </div>
      </>
    );
  }
};

export default Leaderboard;
