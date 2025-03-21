import AddCredentialSection from "@/components/add-credential-section";
import CenterContainer from "@/components/center-container";
import FeedSection from "@/components/feed-section";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <CenterContainer>
      <div className="flex flex-col mx-2 h-full">
        <AddCredentialSection />
        <Separator />
        <FeedSection />
      </div>
    </CenterContainer>
  );
}
