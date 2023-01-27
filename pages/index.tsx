import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import { EventList } from "../components/events/EventList";
import { Newsletter } from "../components/events/Newsletter";
import { Banner } from "../components/ProjectBlog/Banner";
import { getIsFeaturedData } from "../lib/api-helpers";
import styles from "../styles/Home.module.css";
import { IEvent, IEventFb } from "../types";
import { previewData } from "next/headers";
import { client } from "../lib/sanity.client";
const Home: React.FC<{ events: IEvent[]; blogs: any }> = (props) => {
  if (!props.events) {
    return <h1>Loading...</h1>;
  }
  console.log(props.blogs, "BLOGS");
  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <Banner />
    </div>
  );
};
export default Home;
/* export const getServerSideProps: GetServerSideProps = async () => {
  const transformedData: IEvent[] = [];
  const response = await fetch(
    "https://tinder-clone-e0499.firebaseio.com/events.json"
  );
  const data: IEventFb = await response.json();
  console.log(data);
  for (const key in data) {
    if (data[key].isFeatured) {
      transformedData.push(data[key]);
    }
  }

  return {
    props: {
      events: transformedData,
    },
  };
}; */
export const getStaticProps: GetStaticProps = async () => {
  const featEvents = await getIsFeaturedData();

  const blogsData = await client.fetch(`
    \*[_type=="post"]{
      ...,
      categories[]->,
      author->
    }
  `);
  console.log(blogsData);
  return {
    props: {
      events: featEvents,
      blogs: blogsData,
    },
    revalidate: 1800,
  };
};
