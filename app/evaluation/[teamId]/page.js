import Button from "@/components/button";
import styles from "./page.module.css";
import BackgroundVideo from "@/components/BackgroundVideo";
export default function MarkingPage({ teamId }) {
  return (
    <div className={styles.container}>
      <BackgroundVideo />
      <div className={styles.evaluationContainer}>
        <section className={styles.info}>
          <h1>Team: Resonix</h1>
          <h2>Team Id: PHVhsi2hs</h2>
          {/* <h2>Evaluator Name: Aryan Saini</h2> */}
        </section>
        <form>
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
          <input type="number" name="Readiness" max={10} step={0.01} required />
          <Button type={"submit"} text={"Submit"} fontSize={"1rem"} />
        </form>
      </div>
    </div>
  );
}
