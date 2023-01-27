import Link from "next/link";
import React, { FC, ReactElement } from "react";

import styles from "./Button.module.scss";
interface IButton {
  link?: string;
  children: React.ReactNode;
}
export const Button: FC<IButton> = ({ link, children }) => {
  if (!link) {
    return <button className={styles.button}>{children}</button>;
  }
  return (
    <Link href={link} className={styles.button}>
      {children}
    </Link>
  );
};
