import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import styles from "./EventItem.module.scss";
import DateIcon from "./../icons/date-icon";
import AddressIcon from "./../icons/address-icon";
import { ArrowRightIcon } from "../icons/arrow-right-icon";
import Image from "next/image";
interface IEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}
export const EventItem = ({ event }: { event: IEvent }) => {
  const { title, image, date, location, id } = event;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formatedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;
  return (
    <li className={styles.item}>
      <Image
        src={`/${image}`}
        alt="decorative image related to title"
        width={250}
        height={160}
      />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />

            <time>{humanReadableDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formatedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>
            <>
              Explore Event <ArrowRightIcon />
            </>
          </Button>
        </div>
      </div>
    </li>
  );
};
