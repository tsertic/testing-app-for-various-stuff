import { readFile, writeFile } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { INewsletter } from "../../../types";

interface NextApiRequestExtended extends NextApiRequest {
  body: {
    email: string;
  };
}

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  const body = req.body;
  console.log(body);
  if (req.method === "POST") {
    const { email } = body;
    const dbPath = path.join(process.cwd(), "data", "newsletterList.json");
    const data = await readFile(dbPath);
    const jsonData: INewsletter[] = JSON.parse(data.toString());
    const checkForDuplicates = jsonData.find(
      (email) => email.email === body.email
    );
    console.log(checkForDuplicates);
    if (checkForDuplicates !== undefined) {
      res.status(201).json({ message: "Email alredy in db" });
      return;
    }
    jsonData.push({ email: body.email });
    await writeFile(dbPath, JSON.stringify(jsonData));
    res.status(201).json({ message: "success", email: email });
  }
};

export default handler;
