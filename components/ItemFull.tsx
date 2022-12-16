interface ItemProps {
  children: React.ReactNode;
  category: string;
  title: string;
  imageUrl?: string;
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
      <div className="bg-[#999] max-h-[450px] overflow-hidden rounded-t">
        <img src={imageUrl} width="100%" />
      </div>
      <div className="h-[300px] p-[15px] overflow-scroll">
        <div className="pb-[5px] text-[#00aaff]">{category}</div>
        <div className="pb-[5px]">
          <h4>{title}</h4>
        </div>
        <p>{children}</p>
      </div>
      <div className="p-[15px] flex gap-x-[10px]">
        <img
          className="rounded-full bg-[#999] w-[25px] h-[25px]"
          src={authorImageUrl}
        />
        <div className="text-[9px]">
          <b>{author}</b>
          <br />
          {date} - {readTime} min read
        </div>
      </div>
    </div>
  );
}
