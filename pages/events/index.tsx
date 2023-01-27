import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { EventList } from "../../components/events/EventList";
import { EventsSearch } from "../../components/events/EventsSearch";
import { getAllEvents } from "../../DummyData";
import { getAllData } from "../../lib/api-helpers";
import { IEvent, IEventFb } from "../../types";
const Events: React.FC<{ events: IEvent[] }> = ({ events }) => {
  const router = useRouter();
  const formSearch = (year: string, month: string) => {
    const urlRoute = `/events/${year}/${month}`;

    router.push(urlRoute);
  };
  if (!events) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta name="description" content="All events page" />
      </Head>
      <EventsSearch search={formSearch} />
      <EventList items={events} />
    </div>
  );
};

export default Events;

/* export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(
    "https://tinder-clone-e0499.firebaseio.com/events.json"
  );
  const data: IEventFb = await response.json();
  const filteredData: IEvent[] = [];
  for (const key in data) {
    filteredData.push(data[key]);
  }
  return {
    props: {
      events: filteredData,
    },
  };
};
 */

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllData();

  return {
    props: {
      events: events,
    },
    revalidate: 3600,
  };
};
