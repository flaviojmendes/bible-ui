import React, { useEffect } from "react";
import "./App.css";
import axios, { AxiosResponse } from "axios";
import { Book } from "./model/BookModel";
import { Search } from "./model/SearchModel";

import Videos from "./components/VideosComponent";
import BookView from "./components/BookComponent";
import ChaptersTree from "./components/ChaptersTree";

function App() {
  const [book, setBook] = React.useState<Book>();
  const [videos, setVideos] = React.useState<any[]>([]);
  const [currentChapter, setCurrentChapter] = React.useState<number>(0);
  const [isLoading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get("http://localhost:8000/book/1")
      .then((response: AxiosResponse) => {
        setBook(response.data);
      });
  }, []);

  useEffect(() => {
    const search: Search = { search_term: book?.title || "" };
    searchVideos(search);
  }, [book]);

  function searchVideos(search: Search) {
    if (book) {
      setLoading(true);
      axios
        .post("http://localhost:8000/search", search)
        .then(function (response) {
          setVideos(response.data.result);
          setLoading(false);
        });
    }
  }

  function handleTabChange(index: number) {

    setCurrentChapter(index);

    const search: Search = {
      search_term: `${book?.title} ${book?.chapters[index].title || ""}`,
    };
    searchVideos(search);
  }

  return (
    <div className="container w-100 mx-auto pt-10">
      <div className="flex flex-row">
        <div className="basis-1/4"><ChaptersTree book={book} handleTabChange={handleTabChange}/></div>
        <div className="basis-2/4">
          <BookView book={book} currentChapter={currentChapter}/>
        </div>
        <div className="basis-1/4">
          <Videos videos={videos} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
