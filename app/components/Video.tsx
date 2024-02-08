interface VideoProps {
  videoUrl: string;
}

const Video: React.FC<VideoProps> = ({ videoUrl }) => {
  return (
    <div className="relative w-full h-fit">
      <video
        className="inset-0 w-full h-fit bg-maud-grey"
        autoPlay
        playsInline
        muted
        loop
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
