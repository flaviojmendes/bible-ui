import { Center, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Book } from "../model/BookModel";
import React from 'react';

interface Props {
  book?: Book;
  handleTabChange: (tabIndex: number) => void;
}

export default function BookView(props: Props) {
    const [tabIndex, setTabIndex] = React.useState(0)
    
    function handleTabsChange(index: number) {
        setTabIndex(index)
        props.handleTabChange(index);
    }

  return (
    <>
      <Center>
        <Heading fontSize={"lg"}>{props.book?.title}</Heading>
      </Center>
      <Tabs variant='soft-rounded' color="#FBE0C3"  tabIndex={tabIndex} onChange={handleTabsChange}>
        <TabList>
          {props.book?.chapters.map((chapter, index) =>
            (() => {
              return (
                <>
                  <Tab>{chapter.title}</Tab>
                </>
              );
            })()
          )}
        </TabList>

        <TabPanels>
          {props.book?.chapters.map((chapter, index) =>
            (() => {
              return (
                <TabPanel>
                  <div className="ml-10">
                    <h3 className="text-lg font-semibold" key={index}>
                      {chapter.title}
                    </h3>
                    {chapter.paragraphs.map((paragraph, index) =>
                      (() => {
                        return (
                          <p className="ml-2" key={`p${index}`}>
                            {paragraph.text}
                          </p>
                        );
                      })()
                    )}
                  </div>
                </TabPanel>
              );
            })()
          )}
        </TabPanels>
      </Tabs>
    </>
  );
}
