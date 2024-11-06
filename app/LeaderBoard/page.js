"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import BackgroundVideo from "@/components/BackgroundVideo";
import { useSession } from "next-auth/react";
import LeaderboardTable from "@/components/leaderboardTable.js";

const Leaderboard = () => {
  const { data: session, status } = useSession();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableFlag, setTableFlag] = useState(false);
  const [click, setClick] = useState(0);
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        // data.forEach((player) => {
        //   player.score = player.quiz + player.tasks + player.game;
        // });
        // Sorting data array by score in descending order
        data.sort((a, b) => b.score - a.score);
        data.length = 20;
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);
  console.log(leaderboardData);

  function handleClick() {
    setClick(click + 1);
    console.log(click);
  }

  if (
    status == "unauthenticated" ||
    (session && session.user.email != "yograj.rr@gmail.com")
  ) {
    return <p>Unauthorised</p>;
  } else {
    return (
      <>
        <BackgroundVideo />
        {!loading && (
          <button
            onClick={() => {
              setTableFlag(!tableFlag);
            }}
            className={styles.changeButton}
          >
            {!tableFlag ? "Show table" : "Show Top 3"}
          </button>
        )}
        <div
          className={styles.wrapper}
          onClick={click < 3 && !loading ? handleClick : null}
        >
          <h1 className={styles.header}>LEADERBOARD</h1>
          {loading ? (
            <h1>Fetching Data...</h1>
          ) : !tableFlag ? (
            <div className={styles.wrapper1}>
              <div className={styles.top3}>
                <div className={styles.trophies}>
                  <div
                    className={styles.trophy}
                    style={
                      click == 1 || click == 2 || click == 3
                        ? { animation: " trophie1 1.5s ease-in-out" }
                        : { opacity: 0 }
                    }
                  >
                    <h3>{leaderboardData[2].name}</h3>
                    <img src="/images/7.png" alt="" />
                  </div>
                  <div
                    className={styles.trophy}
                    style={
                      click == 3
                        ? { animation: " trophie2 1.5s ease-in-out" }
                        : { opacity: 0 }
                    }
                  >
                    <h3>{leaderboardData[0].name}</h3>
                    <img src="/images/9.png" alt="" />
                  </div>
                  <div
                    className={styles.trophy}
                    style={
                      click == 2 || click == 3
                        ? { animation: " trophie3 1.5s ease-in-out" }
                        : { opacity: 0 }
                    }
                  >
                    <h3>{leaderboardData[1].name}</h3>
                    <img src="/images/10.png" alt="" />
                  </div>
                </div>
                <img src="/images/8.png" alt="" className={styles.stand} />
                <div className={styles.platform}></div>
                {click == 3 && (
                  <img
                    src="/images/congratulation.gif"
                    alt=""
                    className={styles.congoGif}
                  />
                )}
              </div>
            </div>
          ) : (
            <LeaderboardTable leaderboardData={leaderboardData} />
          )}
          {/* {leaderboardData.length === 0 && !loading && <p>No entries found.</p>} */}
        </div>
      </>
    );
  }
};

export default Leaderboard;
