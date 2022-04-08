import { Book } from "../model/BookModel";
import React from "react";

interface Props {
  book?: Book;
  handleTabChange: (tabIndex: number) => void;
}

export default function ChaptersTree(props: Props) {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  function handleTabClick(tabIndex: number) {
    setSelectedIndex(tabIndex);
    props.handleTabChange(tabIndex);
  }

  return (
    <>
      <h2 className="text-xl text-center mt-20 mb-5">Capítulos</h2>

      <div className="grid-cols-1">
        {props.book?.chapters.map((chapter, index) => (
          <div
            className={`cursor-pointer w-1/2 my-1 rounded-3xl p-2 font-sans font-semibold ${
              selectedIndex === index ? "bg-primary" : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            {chapter.title}
          </div>
        ))}
      </div>
    </>
  );
}
