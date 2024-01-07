import React from "react";
import styles from "./Table.module.css";

const baseUrl = process.env.REACT_APP_SERVERURL || "http://localhost:5019";

export default function Table(props) {
  const copyToClipboard = (shortUrl) => {
    try {
      navigator.clipboard.writeText(`${baseUrl}/${shortUrl}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerCell}>Original URL</th>
            <th className={`${styles.headerCell} ${styles.rightAlign}`}>Clicks</th>
            <th className={`${styles.headerCell} ${styles.rightAlign}`}>
              Short URL
            </th>
          </tr>
        </thead>
        <tbody>
          {props.fetchedData.map((item) => (
            <tr key={item.id} className={styles.row}>
              <td className={styles.urlCell}>
                <a
                  href={`${item.full}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.link}
                >
                  {item.full}
                </a>
              </td>
              <td className={`${styles.urlCell} ${styles.rightAlign}`}>
                <p>{item.visitHistory.length}</p>
              </td>
              <td className={`${styles.urlCell} ${styles.rightAlign}`}>
                <a href={`${baseUrl}/${item.short}`} className={styles.link}>
                  {item.short}
                </a>
                <img
                  className={styles.copyUrl}
                  title="copy url"
                  src="/copy.png"
                  alt="copy url"
                  onClick={() => copyToClipboard(item.short)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
