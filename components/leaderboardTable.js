import styles from "./leaderboardTable.module.css";

function Leaderboard({ leaderboardData }) {
  return (
    <div className={styles["table-wrapper"]}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.header}>S.no.</th>
            <th className={styles.header}>Team Name</th>
            <th className={styles.header}>Team Id</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <>
              <tr key={entry.id} className={styles.row}>
                <td className={styles.cell}>{index+1}</td>
                <td className={styles.cell}>{entry.teamName}</td>
                <td className={styles.cell}>{entry.teamId}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
