import React, { useRef } from "react";
import styles from "./Newsletter.module.scss";
export const Newsletter = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRef.current || emailRef.current.value === "") {
      console.log("please input email");
      return;
    }
    const emailValue = emailRef.current.value;
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: emailValue }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className={styles["newsletter"]}>
      <h2>Sing up to stay updated!</h2>
      <form onSubmit={submitFormHandler}>
        <input type="email" placeholder="Your email" ref={emailRef} />
        <button>Register</button>
      </form>
    </div>
  );
};
