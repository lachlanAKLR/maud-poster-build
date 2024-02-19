// "use client";

// import React, { useState } from "react";
// import { Tag } from "@/types";

// interface TagsFilterProps {
//   tags: Tag[];
//   onSelectTag: (selectedTagSlug: string | null) => void;
// }

// const TagsFilter: React.FC<TagsFilterProps> = ({ tags, onSelectTag }) => {
//   const [selectedTagSlug, setSelectedTagSlug] = useState<string | null>(null);

//   const handleTagClick = (slug: string) => {
//     setSelectedTagSlug(slug);
//     onSelectTag(slug);
//   };

//   const handleClearSelection = () => {
//     setSelectedTagSlug(null);
//     onSelectTag(null);
//   };

//   return (
//     <div className="fixed text-center hidden md:block top-[6px] left-1/2 transform -translate-x-1/2 py-1 px-3 text-xs w-fit">
//       Filter →
//       {selectedTagSlug ? (
//         <>
//           <button
//             onClick={handleClearSelection}
//             className="ml-1 hover:text-maud-red"
//           >
//             All,
//           </button>
//           {tags
//             .filter((tag) => tag.slug.current === selectedTagSlug)
//             .map((tag) => (
//               <button
//                 key={tag._id}
//                 onClick={handleClearSelection}
//                 className="text-maud-red ml-1"
//               >
//                 {tag.title} x
//               </button>
//             ))}
//         </>
//       ) : (
//         tags.map((tag) => (
//           <button
//             key={tag._id}
//             onClick={() => handleTagClick(tag.slug.current)}
//             className="ml-1 hover:text-maud-red"
//           >
//             {tag.title}
//           </button>
//         ))
//       )}
//     </div>
//   );
// };

// export default TagsFilter;

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
      Filter →
      {selectedTagSlug ? (
        <>
          <button
            onClick={handleClearSelection}
            className="ml-1 hover:text-maud-red"
          >
            All,
          </button>
          {tags
            .filter((tag) => tag.slug.current === selectedTagSlug)
            .map((tag, index, filteredTags) => (
              <React.Fragment key={tag._id}>
                {index > 0 && ", "}
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
          <React.Fragment key={tag._id}>
            <button
              onClick={() => handleTagClick(tag.slug.current)}
              className="ml-1 hover:text-maud-red"
            >
              {tag.title}
            </button>
            {index < tags.length - 1 && ", "}
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default TagsFilter;
