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

  const handleClearSelection = () => {
    setSelectedTagSlug(null);
    onSelectTag(null);
  };

  return (
    <div className="fixed text-center hidden md:block top-[6px] left-1/2 transform -translate-x-1/2 py-1 px-3 text-xs w-fit">
      <span>Filter →</span>
      {selectedTagSlug ? (
        <>
          {tags
            .filter((tag) => tag.slug.current === selectedTagSlug)
            .map((tag, index, filteredTags) => (
              <React.Fragment key={tag._id}>
                {index > 0 && (
                  <span className="group-hover:text-maud-red">,</span>
                )}
                <button
                  onClick={handleClearSelection}
                  className="text-maud-red ml-1"
                >
                  {tag.title} ×
                </button>
              </React.Fragment>
            ))}
        </>
      ) : (
        tags.map((tag, index) => (
          <span className="group inline-block" key={tag._id}>
            <button
              onClick={() => handleTagClick(tag.slug.current)}
              className="group-hover:text-maud-red ml-1"
            >
              {tag.title}
            </button>
            {index < tags.length - 1 && (
              <span className="group-hover:text-maud-red">,</span>
            )}
          </span>
        ))
      )}
    </div>
  );
};

export default TagsFilter;
