export interface IEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export interface IEventFb {
  [key: string]: IEvent;
}

export interface IComment {
  email: string;
  name: string;
  comment: string;
  postId: string;
  commentId: string;
}
export interface INewsletter {
  email: string;
}
