import { Book, Testament, Testaments } from "../model/BookModel";
import React from "react";

interface Props {
  testaments?: Testaments;
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
        <h2 className="text-xl text-center mt-0 mb-5 font-['Literata']">Livros</h2>

        <div className="grid-cols-1">
          <h3 className="text-center text-lg font-['Literata']">{props.testaments?.["vt"]["name"]}</h3>
          {props.testaments?.["vt"]["books"].map(
            (book: Book, index: number) => (
              <div
                className={`cursor-pointer my-1 rounded-3xl p-2 font-sans font-semibold ${
                  selectedIndex === index ? "bg-primary" : ""
                }`}
                onClick={() => handleTabClick(index, book)}
              >
                {book.name}
              </div>
            )
          )}
        </div>
        <h3 className="text-center text-lg font-['Literata']">{props.testaments?.["nt"]["name"]}</h3>
        {props.testaments?.["nt"]["books"].map((book: Book, index: number) => (
          <div
            className={`cursor-pointer my-1 rounded-3xl p-2 font-sans font-semibold ${
              selectedIndex === index + props.testaments!["vt"]["books"].length
                ? "bg-primary"
                : ""
            }`}
            onClick={() =>
              handleTabClick(
                index + props.testaments!["vt"]["books"].length,
                book
              )
            }
          >
            {book.name}
          </div>
        ))}
      </div>
    </>
  );
}
