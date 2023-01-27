import { NextApiRequest, NextApiResponse } from "next";

const preview = (req: NextApiRequest, res: NextApiResponse) => {
  res.clearPreviewData();
  res.writeHead(307, { location: "/" });
  res.end();
};

export default preview;
