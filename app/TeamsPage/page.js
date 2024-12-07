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
  const { status } = useSession();
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
                <div className={styles.option1}>
                  <h1>Looking to create & lead your own squad?</h1>
                  <Button
                    text={"Create Team"}
                    onClick={() => {
                      router.push("/TeamsPage/Create");
                    }}
                  />
                </div>
                <div className={styles.option2}>
                  <h1>Already got an amazing squad to join?</h1>
                  <Button
                    text={"Join Team"}
                    onClick={() => {
                      router.push("/TeamsPage/Join");
                    }}
                  />
                </div>
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
