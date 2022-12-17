import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, useCallback, ChangeEvent } from "react";
import Item from "../../components/Item";
import { DataType } from "../../lib/types";
import getDataByQuery from "../../lib/getDataByQuery";
import type { NextApiRequest } from "next";
import Link from "next/link";

// types
interface HomeProps {
  data: DataType;
}

// const

const TXT_TITLE = "From the blog";
const TXT_SUBTITLE =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

// main component
export default function Home({ data: dataProp }: HomeProps) {
  const [filterCategory, setFilterCategory] = useState("-1"); // -1 for all categories
  const [filterTitle, setFilterTitle] = useState("");
  const [page, setPage] = useState(1); // page number from 1
  const firstRender = useRef(true);
  const router = useRouter();

  const onGetData = useCallback(async () => {
    router.push(`/ssr/${filterCategory}/${filterTitle}?page=${page}`);
  }, [filterCategory, filterTitle, page]);

  // effects
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    onGetData();
  }, [filterCategory, filterTitle, page, onGetData]);

  // events

  const onNextPage = () => {
    setPage(page + 1);
  };
  const onPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
    setPage(1);
  };
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterTitle(e.target.value);
    setPage(1);
  };

  // render
  return (
    <div>
      <Head>
        <title>Test App</title>
        <meta name="description" content="Test app" />
      </Head>

      <main className="p-[20px]">
        {/* additional navigation */}
        <Link href="/">Index</Link> | <b>Index SSR</b>
        <nav className="text-center py-[7px] bg-white">
          <select onChange={onCategoryChange}>
            <option value={-1}>All categories</option>
            {dataProp?.categories.map((category) => (
              <option value={category.id} key={`key-${category.id}`}>
                {category.name}
              </option>
            ))}
          </select>{" "}
          <input placeholder="title" onChange={onTitleChange}></input>{" "}
          <button onClick={onPrevPage}>Prev</button>
          {` - ${page} - `}
          <button onClick={onNextPage}>Next</button>
        </nav>
        {/* END additional navigation */}
        <div className="text-center mb-[20px] p-[50px]">
          <h1>{TXT_TITLE}</h1>
          <p className="text-center">{TXT_SUBTITLE}</p>
        </div>
        <div className="flex justify-center gap-[30px] flex-wrap">
          {dataProp?.posts.map((post, idx) => {
            return (
              <Item
                category={post.categories
                  .map((categoryId) => {
                    return (
                      dataProp.categories.find(
                        (category) => category.id === categoryId
                      )?.name ?? ""
                    );
                  })
                  .join(" ")}
                title={post.title}
                readTime={5}
                date="Today"
                imageUrl={post.imageUrl}
                author="Author Name"
                authorImageUrl=""
                key={`key-${idx}`}
                slug={post.slug}
              >
                {post.excerpt}
              </Item>
            );
          })}
        </div>
      </main>
    </div>
  );
}

// ssr
export async function getServerSideProps({
  query,
}: {
  query: NextApiRequest["query"];
}) {
  const data = getDataByQuery(query);
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}
