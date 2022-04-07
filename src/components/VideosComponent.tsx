import {
    Heading,
    Grid,
    GridItem,
    Text,
  } from "@chakra-ui/react";


interface Props {
    videos: any[];
} 
export default function Videos(props: Props) {
  return (
    <>
      <Heading fontSize={"lg"}>Related Videos</Heading>
      {props.videos?.map((video, index) => {
        return (
          <Grid my={2} templateColumns="repeat(5, 1fr)" gap={0}>
            <GridItem colSpan={2}>
              <img
                className="w-full"
                src={video.thumbnails[0].url}
                alt="video thumbnail"
              />
            </GridItem>
            <GridItem colSpan={3}>
              <a
                href={`https://youtube.com/watch?v=${video.id}`}
                target="_blank"
              >
                <Text fontWeight={500} fontSize="md">
                  {video.title}
                </Text>
              </a>
            </GridItem>
          </Grid>
        );
      })}
    </>
  );
}
