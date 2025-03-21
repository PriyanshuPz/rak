import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { ModeToggle } from "./ui/theme-toggle";
import { PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const AddCredentialSection = async () => {
  const session = await auth();

  return (
    <div className="sticky top-0 z-10 backdrop-blur-sm bg-background/80 border-b border-border/20 py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
          >
            Rak
          </Link>

          <span className="hidden md:inline-block h-5 w-px bg-border"></span>

          <span className="hidden md:block text-sm text-muted-foreground">
            Your Certificates
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/new"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "gap-2 bg-background hover:bg-muted/80 shadow-sm"
            )}
          >
            <PlusCircle className="h-4 w-4 text-primary" />
            <span>Create</span>
          </Link>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9 p-0"
              >
                <Avatar className="h-9 w-9 border-2 border-background">
                  <AvatarImage src={session?.user?.image ?? ""} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {session?.user?.name?.at(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{session?.user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {session?.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings" className="w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive hover:text-destructive focus:text-destructive">
                <Link href="/auth/logout" className="w-full">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default AddCredentialSection;
