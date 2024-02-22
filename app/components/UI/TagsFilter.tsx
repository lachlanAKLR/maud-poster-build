"use client";

import React, { useState, useEffect } from "react";
import { Tag } from "@/types";

interface TagsFilterProps {
  tags: Tag[];
  onSelectTag: (selectedTagSlug: string | null) => void;
  isHome: boolean;
}

const TagsFilter: React.FC<TagsFilterProps> = ({
  tags,
  onSelectTag,
  isHome,
}) => {
  const [selectedTagSlug, setSelectedTagSlug] = useState<string | null>(null);
  const [isFixed, setIsFixed] = useState(false);

  const handleTagClick = (slug: string) => {
    setSelectedTagSlug(slug);
    onSelectTag(slug);
  };

  const handleClearSelection = () => {
    setSelectedTagSlug(null);
    onSelectTag(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeFixed = window.scrollY >= window.innerHeight - 6;
      setIsFixed(shouldBeFixed);
    };

    if (isHome) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHome]);

  return (
    <div
      className={`${
        isHome
          ? `text-xs text-center w-full md:left-1/2 md:transform md:-translate-x-1/2 md:py-1 md:px-3 z-[100] ${
              isFixed ? "fixed top-[6px]" : "absolute top-[6px]"
            }`
          : "relative md:fixed text-center md:top-[6px] w-full md:left-1/2 md:transform md:-translate-x-1/2 pt-20 md:py-1 md:px-3 text-xs md:w-fit" // Use these classes when isHome is false
      }`}
    >
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
