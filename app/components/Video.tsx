interface VideoProps {
  videoUrl: string;
}

const Video: React.FC<VideoProps> = ({ videoUrl }) => {
  return (
    <video className="home-vid" autoPlay playsInline muted loop>
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
};

export default Video;
