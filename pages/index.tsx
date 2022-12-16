import Head from "next/head";
import { useEffect, useState, ChangeEvent } from "react";
import Item from "../components/Item";
import { DataType } from "../lib/types";
import getData from "../lib/getData";

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
  const [data, setData] = useState(dataProp); // set static rendering data

  const [filterCategory, setFilterCategory] = useState("-1"); // -1 for all categories
  const [filterTitle, setFilterTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // page number from 1
  const [firstRender, setFirstRender] = useState(true);

  // effects
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }

    onGetData();
  }, [filterCategory, filterTitle, page]);

  // events

  const onGetData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `./api/posts/search/${filterCategory}/${filterTitle}?page=${page}`
      );
      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log("onGetData", err);
    }
  };
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
        <nav className="text-center py-[7px] bg-white">
          <select onChange={onCategoryChange}>
            <option value={-1}>All categories</option>
            {data?.categories.map((category) => (
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
        {!loading ? (
          <div className="flex justify-center gap-[30px] flex-wrap">
            {data?.posts.map((post, idx) => {
              return (
                <Item
                  category={post.categories
                    .map((categoryId) => {
                      return (
                        data.categories.find(
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
        ) : null}
      </main>
    </div>
  );
}

// called at build time
export async function getStaticProps() {
  const blog = getData();

  return {
    props: {
      data: { posts: blog.posts.slice(0, 3), categories: blog.categories },
    },
  };
}
