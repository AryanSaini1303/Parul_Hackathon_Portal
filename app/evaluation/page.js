"use client";
import BackgroundVideo from "@/components/BackgroundVideo";
import Button from "@/components/button";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./page.module.css";
import Link from "next/link";

export default function EvaluationPage() {
  const { data: session, error } = useSession();
  console.log(session?.user.email);
  return (
    <div className={styles.container}>
      <BackgroundVideo />
      {!session ? (
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
            <li>
              <Link href={"/evaluation/PHVkho23"}>
                <h1>Underestimated Coders</h1>
                <h5>PHVhoi23h</h5>
              </Link>
            </li>
            <li>
              <Link href={"/evaluation/PHVkho23"}>
                <h1>Resonix</h1>
                <h5>PHVhoi23h</h5>
              </Link>
            </li>
            <li>
              <Link href={"/evaluation/PHVkho23"}>
                <h1>Underestimated Coders</h1>
                <h5>PHVhoi23h</h5>
              </Link>
            </li>
            <li>
              <Link href={"/evaluation/PHVkho23"}>
                <h1>Resonix</h1>
                <h5>PHVhoi23h</h5>
              </Link>
            </li>
            <li>
              <Link href={"/evaluation/PHVkho23"}>
                <h1>Underestimated Coders</h1>
                <h5>PHVhoi23h</h5>
              </Link>
            </li>
            <li>
              <Link href={"/evaluation/PHVkho23"}>
                <h1>Resonix</h1>
                <h5>PHVhoi23h</h5>
              </Link>
            </li>
            <li>
              <Link href={"/evaluation/PHVkho23"}>
                <h1>Underestimated Coders</h1>
                <h5>PHVhoi23h</h5>
              </Link>
            </li>
            <li>
              <Link href={"/evaluation/PHVkho23"}>
                <h1>Resonix</h1>
                <h5>PHVhoi23h</h5>
              </Link>
            </li>
          </ul>
        </section>
      )}
    </div>
  );
}
