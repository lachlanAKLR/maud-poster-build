import { PortableText } from "@portabletext/react";
import { herbik } from "@/app/fonts";
import styled from "styled-components";
import { diatype } from "@/app/fonts";

const TextContainer = styled.div`
  & *:first-of-type {
    text-indent: 0;
  }

  & *:not(:first-of-type) {
    text-indent: 64px;
  }

  grid-column: 3 / span 4;

  @media screen and (max-width: 768px) {
    & *:not(:first-of-type) {
      text-indent: 32px;
    }
  }
`;

const components = {
  block: {
    // @ts-ignore
    blockquote: ({ children }) => (
      <blockquote
        className={`${herbik.className} text-center text-lg md:text-xl col-start-2 col-span-6 m-auto`}
      >
        {children}
      </blockquote>
    ),
    // @ts-ignore
    h5: ({ children }) => (
      <p
        className={`${diatype.className} text-center text-xs md:text-sm pt-6 md:pt-10 col-start-2 col-span-6 m-auto`}
      >
        {children}
      </p>
    ),
    // @ts-ignore
    normal: ({ children }) => (
      <TextContainer>
        <p className={`${diatype.className} text-xs md:text-sm `}>{children}</p>
      </TextContainer>
    ),
    // @ts-ignore
    h6: ({ children }) => (
      <p
        className={`${diatype.className} text-center text-xs col-start-2 col-span-6 m-auto`}
      >
        {children}
      </p>
    ),
  },
};

export default function Quote({ block }: { block: any }) {
  return (
    <div className="block md:grid grid-cols-8 py-36 md:py-72 px-3 md:px-20 gap-x-20">
      {block ? (
        // @ts-ignore
        <PortableText value={block.text} components={components} />
      ) : null}
    </div>
  );
}
