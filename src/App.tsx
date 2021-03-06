import React, { useEffect } from "react";
import "./App.css";
import axios, { AxiosResponse } from "axios";
import { Book, Chapter, Testament, Testaments } from "./model/BookModel";
import { Search } from "./model/SearchModel";

import Videos from "./components/VideosComponent";
import BookView from "./components/BookComponent";
import ChaptersTree from "./components/ChaptersTree";
import Navbar from "./components/Navbar";

function App() {
  const [testaments, setTestaments] = React.useState<Testaments>();
  const [selectedTestament, setSelectedTestament] = React.useState<Testament>();
  const [videos, setVideos] = React.useState<any[]>([]);
  const [currentBook, setCurrentBook] = React.useState<Book | undefined>(
    undefined
  );
  const [isLoading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get(`https://bibliavideo.com:8000/bible`)
      .then((response: AxiosResponse) => {
        setTestaments(response.data);
      });
  }, []);

  useEffect(() => {
    const search: Search = { search_term: "Biblia" };
    searchVideos(search);
  }, [testaments]);

  function searchVideos(search: Search) {
    if (testaments) {
      setLoading(true);
      axios
        .post(`https://bibliavideo.com:8000/search`, search)
        .then(function (response) {
          setVideos(response.data.result);
          setLoading(false);
        });
    }
  }

  function handleTabChange(index: number, book: Book, chapter: number = 1) {
    setCurrentBook(book);

    const search: Search = {
      search_term: `Bíblia ${book.name} Capítulo ${chapter}`,
    };
    searchVideos(search);
  }

  function handleChapterChange(chapter: number = 1) {
    const search: Search = {
      search_term: `Bíblia ${currentBook!.name} Capítulo ${chapter}`,
    };
    searchVideos(search);
  }

  function handleTextSelection(chapter: number, text: string) {
    const search: Search = {
      search_term: `Bíblia ${currentBook!.name} Capítulo ${chapter} ${text}`,
    };
    searchVideos(search);
  }

  function handleTestamentChange(testament: Testament) {
    setSelectedTestament(testament);
    const search: Search = {
      search_term: `Bíblia ${testament.name}`,
    };
    searchVideos(search);
  }

  return (
    <>
      <Navbar testaments={testaments} handleTestamentChange={handleTestamentChange} />

      <div className="container w-screen max-w-full mt-14 md:mt-10 mx-auto pt-10 px-0 md:px-10">
        <div className="flex flex-row max-w-full">
          <div className="md:w-2/12 w-1/4">
            <ChaptersTree
              testament={selectedTestament}
              handleTabChange={handleTabChange}
            />
          </div>
          <div className="md:w-7/12 w-3/4 max-w-[75%] sm:max-w-none">
            <BookView
              book={currentBook}
              handleChapterChange={handleChapterChange}
              handleTextSelection={handleTextSelection}
            />
          </div>
          <div className="w-full md:w-3/12 fixed md:relative md:block h-1/5 bottom-0 left-0 m-0 bg-background">
            <Videos videos={videos} isLoading={isLoading} />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default App;
