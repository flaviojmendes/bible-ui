import React, { useEffect } from "react";
import "./App.css";
import axios, { AxiosResponse } from "axios";
import { Book } from "./model/BookModel";
import { Search } from "./model/SearchModel";
import {
  Flex,
  Box,
  Container
} from "@chakra-ui/react";
import Videos from "./components/VideosComponent";
import BookView from "./components/BookComponent";

function App() {
  const [book, setBook] = React.useState<Book>();
  const [videos, setVideos] = React.useState<any[]>([]);

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

    axios
      .post("http://localhost:8000/search", search)
      .then(function (response) {
        setVideos(response.data.result);
      });
  }, [book]);

  function searchVideos(index: number) {
    const search: Search = { search_term: `${book?.title} ${book?.chapters[index].title || ""}` };

    axios
      .post("http://localhost:8000/search", search)
      .then(function (response) {
        setVideos(response.data.result);
      });
  }

  return (
    <Container maxW="8xl" mt={10} mx="auto">
      <Flex borderRadius={4} border={2} borderStyle={"solid"} borderColor="#FFBB98">
        <Box w="70%" p={4}>
          <BookView book={book} handleTabChange={searchVideos} />
        </Box>
        <Box w="30%" p={4}>
          <Videos videos={videos}/>
        </Box>
      </Flex>
    </Container>
  );
}

export default App;
