import BackgroundVideo from "@/components/BackgroundVideo";

export default function JoinPage() {
  return (
    <>
      <BackgroundVideo />
      <h1
        style={{
          margin: 0,
          color: "white",
          fontFamily: "monospace",
          position: "absolute",
          top: "50%",
          left: "50%",
          fontSize: "clamp(1.1rem, 2vw, 2rem)",
          transform: "translate(-50%, -50%)",
          width: "90%",
          textAlign: "center",
        }}
      >
        Join a Team and Make an Impact – Coming Soon!
      </h1>
    </>
  );
}
