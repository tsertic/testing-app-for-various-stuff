import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { EventList } from "../../components/events/EventList";
import { getDateFilteredEvents } from "../../lib/api-helpers";
import { IEvent, IEventFb } from "../../types";
const FilteredEventsPage: React.FC<{ events: IEvent[]; status: string }> = ({
  events,
  status,
}) => {
  const [eventsData, setEventsData] = useState<IEvent[]>();
  const router = useRouter();
  const year = router.query.slug ? router.query.slug[0] : undefined;
  const month = router.query.slug ? router.query.slug[1] : undefined;
  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`Filtered events for ${year}\\${month}`}
      />
    </Head>
  );
  useEffect(() => {
    if (!year || !month) {
      return;
    }
    const fetchData = async () => {
      const data = await getDateFilteredEvents({ year: +year, month: +month });
      setEventsData(data);
    };

    fetchData();
  }, []);
  console.log(events, eventsData, "Tko se prvi rendera");
  if (!events && !eventsData)
    return (
      <>
        {pageHeadData}
        <p>Loading...</p>;
      </>
    );

  if (status === "invalid") {
    return <p>Invalid filter parametars , please try again</p>;
  }
  if (events.length < 1 || !events) {
    return <p>No Events found</p>;
  }

  return (
    <div>
      {pageHeadData}
      <EventList items={events} />
    </div>
  );
};

export default FilteredEventsPage;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const slug = params && params.slug;
  if (!slug) {
    return {
      props: {
        status: "invalid",
        events: [],
      },
    };
  }
  const month = +slug[1];
  const year = +slug[0];
  if (
    slug.length > 2 ||
    month < 1 ||
    month > 12 ||
    year < 2015 ||
    year > 2030 ||
    isNaN(month) ||
    isNaN(year)
  ) {
    return {
      props: {
        status: "invalid",
        events: [],
      },
    };
  }
  const filteredEvents = await getDateFilteredEvents({ year, month });
  console.log(filteredEvents);
  return {
    props: {
      events: filteredEvents,
      status: "ok",
    },
  };
};
