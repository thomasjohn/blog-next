import Head from "next/head";
import Link from "next/link";
import ItemFull from "../../components/ItemFull";
import getData from "../../lib/getData";
import { CategoryType, PostType } from "../../lib/types";

// types
interface PostProps {
  post: PostType;
  categories: CategoryType[];
}

// main component
export default function Post(props: PostProps) {
  // run

  const post = props.post;
  const categories = props.categories;

  // render
  return (
    <div>
      <Head>
        <title>Test App / Post</title>
        <meta name="description" content="Test app post" />
      </Head>

      <main className="p-[20px]">
        {/* additional navigation */}
        <nav className="text-center py-[7px] mb-[20px] bg-white">
          <Link href="/">Index</Link> | <Link href="/ssr">Index SSR</Link>
        </nav>
        {/* END additional navigation */}

        <div className="flex justify-center flex-wrap">
          <ItemFull
            category={post.categories
              .map((categoryId) => {
                return (
                  categories.find((category) => category.id === categoryId)
                    ?.name ?? ""
                );
              })
              .join(" ")}
            title={post.title}
            readTime={5}
            date="Today"
            imageUrl={post.imageUrl}
            author="Author Name"
            authorImageUrl=""
          >
            {post.excerpt}
          </ItemFull>
        </div>
      </main>
    </div>
  );
}

// called at build time

export async function getStaticPaths() {
  const blog = getData();
  const paths = blog.posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const blog = getData();
  const post = blog.posts.find((post) => post.slug === params.slug);
  const categories = blog.categories;

  return {
    props: {
      post,
      categories,
    },
  };
}
