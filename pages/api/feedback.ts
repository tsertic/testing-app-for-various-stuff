import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../lib/sanity.client";

const feedbackHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, feedback } = req.body;
    try {
      await client.create({
        _type: "feedback",
        email,
        poruka: feedback,
      });
      res.status(201).json({ message: "Feedback submited" });
    } catch (error) {
      res.status(501).json({ message: "Something went wrong", error });
    }
  }
};

export default feedbackHandler;
