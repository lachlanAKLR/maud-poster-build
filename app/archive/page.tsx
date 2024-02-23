import { getArchive } from "@/sanity/lib/queries";
import { ProfileType } from "@/types";
import ClickGallery from "../components/UI/ClickGallery";

export default async function Page() {
  const documents: ProfileType[] = await getArchive();

  return (
    <main className="bg-black overflow-hidden">
      <ClickGallery documents={documents} />
    </main>
  );
}
