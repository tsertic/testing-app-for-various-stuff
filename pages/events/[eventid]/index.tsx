import { useRouter } from "next/router";
import React from "react";
import EventSummary from "./../../../components/event-detail/event-summary";
import EventContent from "./../../../components/event-detail/event-content";
import EventLogistics from "./../../../components/event-detail/event-logistics";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { IEvent } from "../../../types";
import { getEventsPaths, getEventById } from "../../../lib/api-helpers";
import Head from "next/head";
import { Comments } from "../../../components/events/Comments";
const EventId: React.FC<{ event: IEvent }> = ({ event }) => {
  if (!event) return <p>No Event found</p>;
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        address={event.location}
        date={event.date}
        image={event.image}
        imageAlt="alt"
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments postId={event.id} />
    </>
  );
};

export default EventId;

/* export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context);
  const { params } = context;
  const response = await fetch(
    "https://tinder-clone-e0499.firebaseio.com/events.json"
  );
  const data = await response.json();
  let filteredData: IEvent | null = null;
  for (const key in data) {
    if (params && params.eventid === data[key].id) {
      filteredData = data[key];
    }
  }
  console.log(filteredData);
  return {
    props: {
      event: filteredData,
    },
  };
};
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  if (!params || typeof params.eventid !== "string") {
    return {
      props: {
        event: null,
      },
    };
  }
  const eventData = await getEventById(params.eventid);
  return {
    props: {
      event: eventData,
    },
    revalidate: 7200,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getEventsPaths("featured");
  return {
    paths,
    fallback: "blocking",
  };
};
