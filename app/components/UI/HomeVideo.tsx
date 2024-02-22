import Video from "./Video";

interface HomeItem {
  videoUrl: string;
  subtitle: string;
}

interface HomeProps {
  content: HomeItem[];
}

export default function HomeVideo({ content }: HomeProps) {
  const videoUrl = content[0].videoUrl;

  return (
    <div className="h-dvh md:h-screen w-full fixed z-0">
      <Video videoUrl={videoUrl} poster={""} />
    </div>
  );
}
