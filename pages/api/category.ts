import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../lib/sanity.client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log(req.body);
    const { title, description } = req.body;
    try {
      await client.create({
        _type: "category",
        title,
        description,
      });
      res.status(201).json({ message: "POST ROUTE" });
    } catch (error) {
      res.status(501).json({ message: "POST ROUTE ERROR", error });
    } finally {
    }
  }
};

export default handler;
