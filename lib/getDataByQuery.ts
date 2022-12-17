import getData from "./getData";
import type { NextApiRequest } from "next";

// const
const ITEMS_PER_PAGE = 3;

export default function getDataByQuery(query: NextApiRequest["query"]) {
  const blog = getData();

  let filterCategory = query.slug?.[0] ? Number(query.slug[0]) : -1;
  if (!filterCategory) filterCategory = -1;

  const filterSearch = query.slug?.[1] ?? "";

  let page = query.page ? Number(query.page) : 1;
  if (!page || page < 1) page = 1;

  // run

  let filteredPosts = blog.posts;

  // category
  if (filterCategory !== -1)
    filteredPosts = filteredPosts.filter(
      (item) => item.categories.indexOf(filterCategory) > -1
    );

  // title search
  filteredPosts = filteredPosts.filter(
    (item) => item.title.toUpperCase().indexOf(filterSearch.toUpperCase()) > -1
  );

  // page

  page--;
  const posts = filteredPosts.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  // return
  return {
    posts,
    categories: blog.categories,
  };
}
