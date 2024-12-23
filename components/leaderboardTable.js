import styles from './leaderboardTable.module.css';

function Leaderboard({ leaderboardData }) {
  return (
    <div className={styles['table-wrapper']}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.header}>Rank</th>
            <th className={styles.header}>Profile_Name</th>
            <th className={styles.header}>Quiz</th>
            <th className={styles.header}>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <>
              <tr key={entry.id} className={styles.row}>
              <td className={styles.cell}>{index + 1}</td>
              <td className={styles.cell}>{entry.name}</td>
              <td className={styles.cell}>{entry.quiz}</td>
              <td className={styles.cell}>
                {entry.score}
              </td>
            </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
