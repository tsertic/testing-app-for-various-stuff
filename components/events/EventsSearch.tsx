import React, { useRef } from "react";
import { Button } from "../ui/button";
import styles from "./EventsSearch.module.scss";
export const EventsSearch = ({ search }: { search: Function }) => {
  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (yearInputRef.current && monthInputRef.current) {
      const year = yearInputRef.current.value;
      const month = monthInputRef.current.value;
      search(year, month);
    }
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthInputRef}>
            <option value="1">January</option>
            <option value="2">Febuary</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
          </select>
        </div>
      </div>
      <Button>Filter</Button>
    </form>
  );
};
