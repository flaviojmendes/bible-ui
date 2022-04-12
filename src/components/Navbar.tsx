import { Book, Testament, Testaments } from "../model/BookModel";
import React from "react";

interface Props {
  testaments?: Testaments;
  handleTestamentChange: (testament: Testament) => void;
}

export default function Navbar(props: Props) {
  const [selectedTestament, setSelectedTestament] = React.useState<Testament>();

  function handleTestamentClick(testament: Testament) {
    setSelectedTestament(testament);
    props.handleTestamentChange(testament);

  }

  return (
    <>
      <div className="fixed w-full h-22 md:h-14 align-middle bg-background z-50 top-0 left-0">
        <div className=" flex flex-nowrap justify-between">
          <div className="font-[Cinzel] text-center text-4xl w-fit mt-0 ml-0 md:mt-2 md:ml-2">
            <a href="/">Bíblia Sagrada</a>
          </div>

          {props.testaments && (<div className="flex flex-wrap">
            <div
              onClick={() => handleTestamentClick(props.testaments!.vt)}
              className="p-1 md:p-3 text-sm md:text-md w-full md:w-fit text-right font-[Cinzel] cursor-pointer"
            >
              {props.testaments?.["vt"].name}
            </div>
            <div
              onClick={() => handleTestamentClick(props.testaments!.nt)}
              className="p-1 md:p-3 text-sm md:text-md w-full md:w-fit text-right font-[Cinzel] cursor-pointer"
            >
              {props.testaments?.["nt"].name}
            </div>
          </div>)}
        </div>
      </div>
    </>
  );
}
