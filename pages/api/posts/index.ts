// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { DataType } from "../../../lib/types";
import getData from "../../../lib/getData";

// const
const ITEMS_PER_PAGE = 3;

// api endpoint
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataType>
) {
  const blog = getData();

  let page = req.query.page ? Number(req.query.page) : 1;
  if (!page || page < 1) page = 1;

  // run

  page--;
  const posts = blog.posts.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  // return
  res.status(200).json({
    posts,
    categories: blog.categories,
  });
}
