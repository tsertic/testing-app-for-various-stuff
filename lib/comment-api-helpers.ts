import fs from "fs/promises";
import path from "path";
import { IComment } from "../types";

export const getAllComments = async () => {
  const urlPath = path.join(process.cwd(), "data", "commentsData.json");
  const data = await fs.readFile(urlPath);
  const jsonData = JSON.parse(data.toString());

  return jsonData;
};
export const getAllCommentsByPostId = async (postId: string) => {
  const data: IComment[] = await getAllComments();
  const filteredComments = data.filter((comment) => comment.postId === postId);
  return filteredComments;
};
