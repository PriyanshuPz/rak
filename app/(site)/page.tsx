import { auth } from "@/auth";
import AddCredentialSection from "@/components/add-credential-section";
import CenterContainer from "@/components/center-container";
import FeedSection from "@/components/feed-section";
import LandingPage from "@/components/landing-page";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return <LandingPage />;
  }

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
