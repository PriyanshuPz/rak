"use client";
import useFeeds from "@/hooks/use-feed";
import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import { Clipboard, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useToast } from "./ui/use-toast";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { NFT_ENDPOINT } from "@/lib/ipfs";
import { useFlags } from "flagsmith/react";

const FeedSection = () => {
  const { data, error, status } = useFeeds();
  const { toast } = useToast();
  const flags = useFlags(["show_copy_btn"]);
  const show_copy_btn = flags.show_copy_btn.enabled;

  if (error) {
    return (
      <div className="flex items-center justify-center">
        ERROR: {error.message}
      </div>
    );
  }

  if (status == "pending") {
    return (
      <div className="h-[100vh]">
        <div className="p-2">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  function copyCid(cid: string) {
    const txt = `${NFT_ENDPOINT}/${cid}`;
    navigator.clipboard.writeText(txt);
    toast({
      title: "Copied to clipboard",
    });
  }

  return (
    <div className="py-2 h-full space-y-2">
      {data?.length == 0 && (
        <div className="flex items-center justify-center flex-col">
          <div className="flex items-center justify-start flex-col text-start">
            <p className="leading-7 ">
              Let&apos;s mint your certs to see in feeds.
              <Separator />
              <p className="leading-7 text-start">
                Step 1: Click on the &quot;Create&quot; button.
              </p>
              <p className="leading-7 text-start">
                Step 2: Upload your certificate.
              </p>
              <p className="leading-7 text-start">
                Step 3: Mint your certificate.
              </p>
              <p className="leading-7 text-start">
                Step 4: Your certificate will be visible here.
              </p>
            </p>
          </div>
          <Separator className="my-2" />

          <div>
            <p className="text-sm text-muted-foreground m-2">
              The InterPlanetary File System (IPFS) is a set of composable,
              peer-to-peer protocols for addressing, routing, and transferring
              content-addressed data in a decentralized file system. Many
              popular Web3 projects are built on IPFS.
            </p>
            <Separator />
          </div>
        </div>
      )}
      {data?.map((d) => (
        <div key={d.id} className="border-2 rounded-xl p-2 border-dashed">
          <div>
            <AspectRatio ratio={1}>
              <Image
                fill
                className="rounded-lg"
                src={`${NFT_ENDPOINT}/${d.cid}`}
                alt={`${d.title}`}
                onError={(e) => {
                  <>
                    <h1>{e.currentTarget.title}</h1>
                  </>;
                }}
              />
            </AspectRatio>
            <div>
              <p className="text-xl text-muted-foreground p-2">
                {d.title} By {d.id.substring(0, 5)}...
              </p>
            </div>
          </div>
          {show_copy_btn && (
            <div>
              <Button
                onClick={() => copyCid(d.cid)}
                className="w-full"
                variant={"secondary"}
              >
                <Clipboard className="p-1" /> Copy Cid Url
              </Button>
            </div>
          )}
          <div className="flex items-center justify-between p-2">
            View NFT
            <Link
              href={`/view?cid=${d.cid}`}
              className={cn(
                buttonVariants({ variant: "default", size: "icon" })
              )}
            >
              <ExternalLink />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedSection;
