import { Book, Testament, Testaments } from "../model/BookModel";
import React from "react";

interface Props {
  testament: Testament | undefined;
  handleTabChange: (tabIndex: number, book: Book) => void;
}

export default function ChaptersTree(props: Props) {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  function handleTabClick(tabIndex: number, book: Book) {
    setSelectedIndex(tabIndex);
    props.handleTabChange(tabIndex, book);
  }

  return (
    <>
      <div className="mr-2 text-xs	">
        <div className="grid-cols-1">
          <h3 className="text-center text-lg font-['Literata']">
            {props.testament?.name}
          </h3>
          {props.testament?.books.map((book: Book, index: number) => (
            <div
              className={`cursor-pointer my-1 rounded-3xl p-2 font-sans font-semibold ${
                selectedIndex === index ? "bg-primary" : ""
              }`}
              onClick={() => handleTabClick(index, book)}
            >
              {book.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
