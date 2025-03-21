import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 border-b">
        <div className="text-2xl font-bold">Rak</div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link href="/auth">
            <Button>Sign in</Button>
          </Link>
        </div>
      </nav>

      {/* Hero section */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 p-6 md:p-12">
        <div className="max-w-xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Showcase Your Certificates on IPFS
          </h1>
          <p className="text-xl text-muted-foreground">
            Securely store and share your achievements using decentralized
            storage. Your certificates, permanently accessible and verifiable.
          </p>
          <div className="flex gap-4">
            <Link href="/auth">
              <Button size="lg">Get Started</Button>
            </Link>
            {/* <Link href="/view">
              <Button size="lg" variant="outline">
                View Certificates
              </Button>
            </Link> */}
          </div>
        </div>
        <div className="relative w-full max-w-md aspect-square">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg transform rotate-3"></div>
          <div className="absolute inset-0 border-2 border-primary rounded-lg"></div>
          <div className="absolute inset-4 bg-muted rounded-lg flex items-center justify-center">
            <span className="text-4xl font-bold">Verified ✓</span>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-muted/50 p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Rak?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3">Decentralized Storage</h3>
              <p className="text-muted-foreground">
                Your certificates are stored on IPFS, ensuring they're permanent
                and censorship-resistant.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3">Easy Sharing</h3>
              <p className="text-muted-foreground">
                Share your achievements with a simple link that anyone can
                verify.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3">Built for Privacy</h3>
              <p className="text-muted-foreground">
                You control who sees your credentials and how they're shared.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rak. All rights reserved.
          </div>
          <div className="flex gap-6">
            {/* <Link
              href="/view"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              View Certificates
            </Link> */}
            <Link
              href="/auth"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
