"use client";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FiGithub } from "react-icons/fi";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFlags } from "flagsmith/react";

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const flags = useFlags(["github_auth"]);
  const github_login = flags.github_auth;

  const searchParams = useSearchParams();
  const callback = searchParams.get("callbackUrl");

  async function onGoogleLogin() {
    try {
      setIsLoading(true);
      const res = await signIn("google", {
        redirect: false,
      });
      if (res?.error) throw new Error(res.error);
      if (res?.ok) {
        toast({
          title: `Success: Authenticated`,
          description: "Continue to home",
        });
        if (callback) {
          router.push(callback);
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: `Error: Authentication Failed`,
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }
  async function onGithubLogin() {
    try {
      setIsLoading(true);
      const res = await signIn("github", {
        redirect: false,
      });
      if (res?.error) throw new Error(res.error);
      if (res?.ok) {
        toast({
          title: `Success: Authenticated`,
          description: "Continue to home",
        });
        if (callback) {
          router.push(callback);
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: `Error: Authentication Failed`,
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center ">
      <div className="p-2 flex flex-col space-y-2">
        <Button
          variant="outline"
          type="button"
          onClick={onGoogleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FcGoogle className="mr-2 h-4 w-4" />
          )}
          Continue with Google
        </Button>
        {github_login.enabled && (
          <Button
            variant="outline"
            type="button"
            onClick={onGithubLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FiGithub className="mr-2 h-4 w-4" />
            )}
            Continue with Github
          </Button>
        )}
      </div>
      <div className="w-32">
        <div className="relative ">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Stay Alert !
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
