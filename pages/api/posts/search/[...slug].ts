// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { DataType } from "../../../../lib/types";
import getDataByQuery from "../../../../lib/getDataByQuery";

// api endpoint
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataType>
) {
  // return
  res.status(200).json(getDataByQuery(req.query));
}
