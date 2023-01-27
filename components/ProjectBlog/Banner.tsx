import React from "react";
import styles from "./Banner.module.scss";
export const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.header}>
        <h1>BearTrouble Daily Blog</h1>
        <h2>
          Welcome to{" "}
          <span className={styles.primaryColor}>Every Developers </span>
          favorite blog in the Devosphere
        </h2>
      </div>
      <p className={styles.features}>
        New product features | The latest in technology |<br></br> The weekly
        debugging nightmares & more!
      </p>
    </div>
  );
};
