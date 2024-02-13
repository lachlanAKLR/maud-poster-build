interface VideoProps {
  videoUrl: string;
}

const Video: React.FC<{ videoUrl: string; poster: string }> = ({
  videoUrl,
  poster,
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <video
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
        style={{ transform: "translate(-50%, -50%)" }}
        src={videoUrl}
        autoPlay
        playsInline
        muted
        loop
        controls={false}
        poster={poster}
      />
    </div>
  );
};

export default Video;
