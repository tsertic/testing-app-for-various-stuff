import React, { FC } from "react";
import { BlogHeader } from "./BlogHeader";
import styles from "./Layout.module.scss";
import { MainHeader } from "./MainHeader";
interface IHeader {
  children: React.ReactNode;
}
export const Layout: FC<IHeader> = (props) => {
  return (
    <>
      <BlogHeader />
      <main className={styles.layout}>{props.children}</main>
    </>
  );
};
