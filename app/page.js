'use client'
import { useEffect } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router=useRouter();
  useEffect(() => {
    session &&router.push(`/LandingPage/${encodeURIComponent(JSON.stringify(session))}`)
  }, [session]);
  return (
    <>
      <h1>Welcome To Parul Hackatron</h1>
      <button onClick={(()=>{signIn("google")})}>Register Now !</button>
    </>
  );
}
