import { Book } from "../model/BookModel";
import React from "react";

interface Props {
  book?: Book;
  currentChapter: number;
}

export default function BookView(props: Props) {
  return (
    <>
      <div className="">
        <h1 className="text-xl text-center font-['Literata']">
          {props.book?.title}
        </h1>
        <div className="px-10">
          <h3 className="text-lg font-semibold  font-['Literata']">
            {props.book?.chapters[props.currentChapter].title}
          </h3>
          {props.book?.chapters[props.currentChapter].paragraphs.map(
            (paragraph, index) =>
              (() => {
                return (
                  <p
                    className="my-2 text-justify font-['Literata']"
                    key={`p${index}`}
                  >
                    {paragraph.text}
                  </p>
                );
              })()
          )}
        </div>
      </div>
    </>
  );
}
