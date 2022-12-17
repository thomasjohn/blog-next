import Link from "next/link";
import Image from "next/image";

interface ItemProps {
  children: React.ReactNode;
  category: string;
  title: string;
  imageUrl: string;
  author: string;
  authorImageUrl: string;
  date: string;
  readTime: number;
  slug: string;
}

export default function Item({
  category,
  title,
  imageUrl,
  date,
  readTime,
  author,
  authorImageUrl,
  children,
  slug,
}: ItemProps) {
  return (
    <Link href={`/posts/${slug}`}>
      <div className="drop-shadow-xl bg-white w-[250px] grow-0 shrink-0 rounded hover:translate-y-1">
        <div className="h-[188px] bg-[#999] overflow-hidden rounded-t relative">
          <Image
            className="object-cover"
            src={imageUrl}
            fill
            sizes="33vw"
            alt="post image"
          />
        </div>
        <div className="h-[150px] p-[15px] overflow-scroll">
          <div className="pb-[5px] text-[#00aaff]">{category}</div>
          <div className="pb-[5px]">
            <h4>{title}</h4>
          </div>
          <p>{children}</p>
        </div>
        <div className="p-[15px] flex gap-x-[10px]">
          <div className="relative w-[25px] h-[25px] rounded-full bg-[#999] overflow-hidden">
            {authorImageUrl ? (
              <Image src={authorImageUrl} fill alt="author picture" />
            ) : null}
          </div>
          <div className="text-[9px]">
            <b>{author}</b>
            <br />
            {date} - {readTime} min read
          </div>
        </div>
      </div>
    </Link>
  );
}
