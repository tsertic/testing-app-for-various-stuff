import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";
import { getAllCommentsByPostId } from "../../../lib/comment-api-helpers";
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    name: string;
    postId: string;
    comment: string;
    commentId: string;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const bodyData = req.body;
  console.log(bodyData);
  if (req.method === "POST") {
    const dataPath = path.join(process.cwd(), "data", "commentsData.json");
    const readData = await fs.readFile(dataPath);
    const jsonData = JSON.parse(readData.toString());
    jsonData.push(bodyData);
    await fs.writeFile(dataPath, JSON.stringify(jsonData));

    res.status(201).json({ message: "Success", comment: bodyData });
  }

  if (req.method === "GET") {
    const postId = req.query.commentid;
    console.log(postId);
    if (postId === undefined || typeof postId !== "string") {
      res.status(500).json({ message: "Error" });
    } else {
      const data = await getAllCommentsByPostId(postId);
      res.status(201).json({ message: "success", comments: data });
    }
  }
};

export default handler;
