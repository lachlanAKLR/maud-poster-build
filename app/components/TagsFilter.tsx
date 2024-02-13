"use client";

import React, { useState } from "react";
import { Tag } from "@/types";

interface TagsFilterProps {
  tags: Tag[];
  onSelectTag: (selectedTagSlug: string | null) => void;
}

const TagsFilter: React.FC<TagsFilterProps> = ({ tags, onSelectTag }) => {
  const [selectedTagSlug, setSelectedTagSlug] = useState<string | null>(null);

  const handleTagClick = (slug: string) => {
    setSelectedTagSlug(slug);
    onSelectTag(slug);
  };

  return (
    <div className="fixed hidden md:block top-[6px] left-1/2 transform -translate-x-1/2 py-1 px-3 text-xs w-fit">
      Filter →
      {tags.map((tag) => (
        <button
          key={tag._id}
          onClick={() => handleTagClick(tag.slug.current)}
          className={` ml-1 hover:text-maud-red ${
            selectedTagSlug === tag.slug.current ? "text-maud-red ml-1" : ""
          }`}
        >
          {tag.title},
        </button>
      ))}
      <button
        onClick={() => {
          setSelectedTagSlug(null);
          onSelectTag(null);
        }}
        className="ml-1 hover:text-maud-red"
      >
        Clear
      </button>
    </div>
  );
};

export default TagsFilter;
