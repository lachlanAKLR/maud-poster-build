import React from "react";

interface ContentItem {
  _id: string;
  subtitle: string;
}

interface SubTitleProps {
  content: ContentItem[];
}

const SubTitle: React.FC<SubTitleProps> = ({ content }) => {
  return (
    <>
      {content.map((data) => (
        <div
          className="fixed top-[10px] left-[55px] text-xs text-white z-40"
          key={data._id}
        >
          <p>{data.subtitle}</p>
        </div>
      ))}
    </>
  );
};

export default SubTitle;
