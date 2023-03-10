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
}

export default function ItemFull({
  category,
  title,
  imageUrl,
  date,
  readTime,
  author,
  authorImageUrl,
  children,
}: ItemProps) {
  return (
    <div className="drop-shadow-xl bg-white w-[80%] rounded">
      <div className="bg-[#222] h-[450px] overflow-hidden rounded-t relative">
        <Image
          className="object-cover rounded-t"
          src={imageUrl}
          fill
          alt="post image"
        />
      </div>
      <div className="h-[300px] p-[15px] overflow-scroll">
        <div className="pb-[5px] text-[#00aaff] text-sm">{category}</div>
        <div className="pb-[5px]">
          <h4>{title}</h4>
        </div>
        <p className="text-sm">{children}</p>
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
  );
}
