import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./ui/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const AddCredentialSection = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col m-2 p-2 rounded-xl">
      <div className="items-center flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-8 h-8">
                <AvatarImage src={session?.user?.image ?? ""} />
                <AvatarFallback>{session?.user?.name?.at(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 hover:text-red-700 focus:text-red-700">
                <Link href={"/auth/logout"}>Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center">
          <Link
            className={cn(buttonVariants({ variant: "outline" }))}
            href={"/new"}
          >
            Create
          </Link>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default AddCredentialSection;
