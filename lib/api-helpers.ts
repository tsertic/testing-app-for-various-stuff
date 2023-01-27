import { IEvent, IEventFb } from "./../types";
export const getAllData = async () => {
  const response = await fetch(
    "https://tinder-clone-e0499.firebaseio.com/events.json"
  );
  const data: IEventFb = await response.json();
  const transformedData: IEvent[] = [];
  for (const key in data) {
    transformedData.push(data[key]);
  }

  return transformedData;
};

export const getIsFeaturedData = async () => {
  const data = await getAllData();
  return data.filter((event) => event.isFeatured);
};

export const getEventById = async (id: string) => {
  const data = await getAllData();
  return data.find((event) => event.id === id);
};
export const getEventsPaths = async (pathsType = "all") => {
  let data: IEvent[] = [];
  if (pathsType === "featured") data = await getIsFeaturedData();
  if (pathsType === "all") data = await getAllData();
  const ids = data.map((event) => event.id);
  const paths = ids.map((id) => ({ params: { eventid: id } }));
  return paths;
};

export const getDateFilteredEvents = async (date: {
  year: number;
  month: number;
}) => {
  const { year, month } = date;
  const events = await getAllData();
  const filteredData = events.filter((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return filteredData;
};
