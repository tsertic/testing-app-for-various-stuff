import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./BlogHeader.module.scss";
export const BlogHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image src="/images/LOGO1.png" height={60} width={60} alt="logo" />
        </Link>
        <h1>BearTrouble</h1>
      </div>

      <div className={styles.nav}>
        <Link href="/studio">Studio</Link>
      </div>
    </div>
  );
};
