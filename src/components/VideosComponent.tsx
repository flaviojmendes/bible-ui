interface Props {
  videos: any[];
  isLoading: boolean;
}
export default function Videos(props: Props) {
  return (
    <>
      <div className=" ">
        <h2 className="text-xl text-center mb-5 font-['Literata']">
          Vídeos Relacionados
        </h2>
        <div className="flex flex-nowrap overflow-auto touch-auto md:flex-wrap m-0">
          {!props.isLoading &&
            props.videos?.map((video, index) => {
              return (
                <div className="flex flex-row mx-2 my-2 gap-4" key={index}>
                  <div className="w-52 md:w-2/5">
                    <a href={`https://youtube.com/watch?v=${video.id}`}>
                      <img
                        className="h-100 rounded-md"
                        src={video.thumbnails[0].url}
                        alt="video thumbnail"
                      />
                    </a>
                  </div>
                  <div className="w-3/5">
                    <a
                      href={`https://youtube.com/watch?v=${video.id}`}
                      target="_blank"
                    >
                      <span className="text-md">{video.title}</span>
                    </a>
                  </div>
                </div>
              );
            })}

          {props.isLoading &&
            [...Array(5)].map((e, i) => (
              <div className="flex flex-row md:w-full m-2 gap-4 animate-pulse">
                <div className="w-52 md:w-2/5 h-20 rounded-md bg-primary-text"></div>
                <div className="w-3/5">
                  <div className="w-full h-5 bg-primary-text rounded-xl my-1"></div>
                  <div className="w-full h-5 bg-primary-text rounded-xl"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
