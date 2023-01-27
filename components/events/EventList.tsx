import React from "react";
import { EventItem } from "./EventItem";
import styles from "./EventList.module.scss";
interface propItems {
  items: IEvent[];
}
interface IEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}
export const EventList = ({ items }: propItems) => {
  return (
    <ul className={styles.list}>
      {items.map((event) => {
        return <EventItem key={event.id} event={event} />;
      })}
    </ul>
  );
};
