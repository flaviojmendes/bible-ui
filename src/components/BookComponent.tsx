import { Book, Chapter, Verse } from "../model/BookModel";
import React, { useEffect } from "react";
import axios from "axios";

interface Props {
  book?: Book;
  handleChapterChange: (chapter: number) => void;
  handleTextSelection: (chapter: number, text: string) => void;
}

export default function BookView(props: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [chapter, setChapter] = React.useState<Chapter>({} as Chapter);
  const [tabIndex, setTabIndex] = React.useState<number>(0);
  const [randomVerse, setRandomVerse] = React.useState<Verse | undefined>(
    undefined
  );

  useEffect(() => {
    searchChapter(props.book || ({} as Book));
    setTabIndex(0);
  }, [props.book]);

  useEffect(() => {
    if (!props.book) {
      getRandomVerse();
    }
  }, []);

  function searchChapter(book: Book, chapterIndex: number = 1) {
    if (book && book.abbrev) {
      setLoading(true);
      axios
        .get(`http://localhost:8000/bible/${book.abbrev}/${chapterIndex}`)
        .then(function (response) {
          setChapter(response.data);
          setLoading(false);
        });
    }
  }

  function handleTabChange(index: number) {
    searchChapter(props.book || ({} as Book), index + 1);
    props.handleChapterChange(index + 1);
    setTabIndex(index);
  }

  function getRandomVerse() {
    setLoading(true);
    axios
      .get(`http://localhost:8000/bible/random-verse`)
      .then(function (response) {
        setRandomVerse(response.data);
        setLoading(false);
      });
  }

  function handleMouseUp() {
    if (window.getSelection() && window.getSelection()!.toString().length > 5) {
      props.handleTextSelection(tabIndex + 1, window.getSelection()!.toString());
    }
  }

  return (
    <>
      <div className="grid-cols-1 h-full">
        <h1 className="text-xl text-center font-['Literata']">
          {props.book?.name}
        </h1>
        <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto">
          {[...Array(parseInt(props.book?.chapters || "0"))].map((_, index) => (
            <div
              onClick={() => handleTabChange(index)}
              className={`rounded-xl text-center font-semibold cursor-pointer w-10 px-2 m-2 ${
                index === tabIndex
                  ? "bg-primary-text text-primary"
                  : "bg-primary"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>

        {!loading && props.book && (
          <div className="px-6">
            {chapter?.verses?.map((verse, index) =>
              (() => {
                return (
                  <p
                    className="my-5 text-justify font-['Literata']"
                    key={`p${index}`}
                    onMouseUp={handleMouseUp}
                  >
                    <sup>{index + 1}</sup> {verse}
                  </p>
                );
              })()
            )}
          </div>
        )}
        {loading &&
          [...Array(5)].map((e, i) => (
            <>
              <div className="flex flex-row mx-2 mt-10 gap-4 animate-pulse">
                <div className="w-full h-5 bg-primary-text rounded-xl"></div>
              </div>
              <div className="flex flex-row m-2 gap-4 animate-pulse">
                <div className="w-full h-5 bg-primary-text rounded-xl"></div>
              </div>
              <div className="flex flex-row m-2 gap-4 animate-pulse">
                <div className="w-1/2 h-5 bg-primary-text rounded-xl"></div>
              </div>
            </>
          ))}

        {!props.book && (
          <>
            <div className="mx-auto mt-28 w-fit">
              <p className="text-justify font-['Literata'] mx-20">
                {randomVerse?.text}
              </p>
              <p className="text-right font-['Literata'] mx-20">
                {randomVerse?.book}
                {"  "}
                {randomVerse?.chapter}
                {":"}
                {randomVerse?.verse}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
