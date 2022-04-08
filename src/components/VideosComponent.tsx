interface Props {
  videos: any[];
  isLoading: boolean;
}
export default function Videos(props: Props) {
  return (
    <>
      <h2 className="text-xl text-center mt-20 mb-5">Vídeos Relacionados</h2>
      {!props.isLoading && props.videos?.map((video, index) => {
        return (
          <div className="flex flex-row m-2 gap-4" key={index}>
            <div className="w-2/5">
              <img
                className="w-100 rounded-md"
                src={video.thumbnails[0].url}
                alt="video thumbnail"
              />
            </div>
            <div className="w-3/5">
              <a href={`https://youtube.com`} target="_blank">
                <span className="text-md">{video.title}</span>
              </a>
            </div>
          </div>
        );
      })}

      {props.isLoading && [...Array(5)].map((e, i) => <div className="flex flex-row m-2 gap-4 animate-pulse">
        <div className="w-2/5 h-20 rounded-md bg-primary-text"></div>
        <div className="w-3/5">
          <div className="w-full h-5 bg-primary-text rounded-xl my-1"></div>
          <div className="w-full h-5 bg-primary-text rounded-xl"></div>
        </div>
      </div>)}
    </>
  );
}
