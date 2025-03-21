"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { useFlags } from "flagsmith/react";
import {
  Award,
  FilePlus2,
  Loader2,
  X,
  Image as ImageIcon,
  FileCheck,
  UploadCloud,
} from "lucide-react";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { useFileUpload } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
  image: z.custom(
    (value) => {
      // Check if File is available (browser environment)
      if (typeof File !== "undefined" && value instanceof File) {
        return true; // Valid File instance
      } else {
        return false; // Not a valid File instance
      }
    },
    {
      message: "Please select an image file",
    }
  ),
});

const CreatePostModal = () => {
  const router = useRouter();
  const { toast } = useToast();
  const flags = useFlags(["upload_file_size"]);
  const upload_file_size = flags.upload_file_size;
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const {
    filePreview,
    handleFileChange,
    handleDrop,
    handleDragOver,
    clearFile,
    error,
  } = useFileUpload((file) => form.setValue("image", file), {
    maxSize: (upload_file_size?.value as number) || 5,
    acceptedTypes: ["image/jpeg", "image/png"],
  });
  const steps = [
    "Upload certificate image",
    "Add certificate details",
    "Mint to blockchain",
  ];

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      setStepIndex(2);

      if (values.image == null) {
        form.setError("image", {
          message: "Please select an image file",
        });
        setStepIndex(0);
        return;
      }

      const formdata = new FormData();
      formdata.append("title", values.title);
      formdata.append("file", values.image);

      const saveRes = await fetch("/api/mint", {
        method: "POST",
        body: formdata,
      });

      const savedData = await saveRes.json();

      // Ensure progress reaches 100% before showing completion
      setUploadProgress(100);

      if (saveRes.status !== 200) throw new Error(savedData.message);

      toast({
        title: `Certificate Minted Successfully`,
        description:
          "Your certificate has been added to the IPFS. It will take a moment to fully sync.",
      });

      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Minting Failed",
        description: error.message,
        variant: "destructive",
      });
      setStepIndex(1); // Go back to the form step
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2 relative">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <FilePlus2 className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle className="text-xl">Mint New Certificate</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Create a new certificate and add it to your blockchain collection
          </DialogDescription>
        </DialogHeader>

        {/* Step progress indicator */}
        <div className="px-6">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${
                        idx <= stepIndex
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted text-muted-foreground border-muted-foreground/30"
                      }`}
                  >
                    {idx < stepIndex ? (
                      <FileCheck className="h-4 w-4" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>
                  <span
                    className={`text-xs mt-1 transition-colors duration-300
                    ${
                      idx <= stepIndex
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step}
                  </span>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-1 transition-colors duration-500
                      ${idx < stepIndex ? "bg-primary" : "bg-muted"}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <Separator className="mt-2" />

        <div className="px-6 py-4">
          {stepIndex === 2 ? (
            <div className="animate-fade-in flex flex-col items-center justify-center py-6">
              <div className="relative mb-6">
                <svg className="w-24 h-24 transition-all">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="#e5e5e5"
                    strokeWidth="8"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${uploadProgress * 2.51} ${
                      251 - uploadProgress * 2.51
                    }`}
                    transform="rotate(-90 48 48)"
                    style={{ transition: "stroke-dasharray 0.3s ease" }}
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  {uploadProgress < 100 ? (
                    <>
                      <p className="text-xl font-bold">
                        {Math.round(uploadProgress)}%
                      </p>
                      <p className="text-xs text-muted-foreground">Minting</p>
                    </>
                  ) : (
                    <Award className="h-10 w-10 text-primary animate-pulse" />
                  )}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {uploadProgress < 100
                  ? "Minting in progress..."
                  : "Certificate Minted!"}
              </h3>

              <p className="text-muted-foreground text-center max-w-xs mb-4">
                {uploadProgress < 100
                  ? "We're adding your certificate to the blockchain. This may take a moment."
                  : "Your certificate has been successfully added to the blockchain and will appear in your feed."}
              </p>

              {uploadProgress === 100 && (
                <div
                  className="animate-slide-up-fade-in"
                  style={{ animationDelay: "200ms" }}
                >
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      onClick={() => router.back()}
                      disabled={loading}
                    >
                      Back to Feed
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {stepIndex === 0 && (
                  <div className="animate-fade-in">
                    <FormField
                      disabled={loading}
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Certificate Image
                          </FormLabel>
                          <Card
                            className={cn(
                              "border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors",
                              error && "border-destructive"
                            )}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                          >
                            <FormControl>
                              <>
                                {filePreview ? (
                                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md">
                                    <img
                                      src={filePreview}
                                      alt="Certificate preview"
                                      className="object-contain w-full h-full"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                                      <Button
                                        variant="secondary"
                                        size="sm"
                                        className="gap-2"
                                        onClick={() => {
                                          clearFile();
                                          field.onChange(undefined);
                                        }}
                                      >
                                        <ImageIcon className="h-4 w-4" />
                                        Change Image
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="p-8 flex flex-col items-center justify-center">
                                    <div className="bg-muted rounded-full p-4 mb-4">
                                      <UploadCloud className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <p className="font-medium mb-1">
                                      Drop your certificate here or click to
                                      browse
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      Support for JPG, PNG and Image files
                                    </p>
                                    <div className="relative mt-4">
                                      <Input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                        multiple={false}
                                        onChange={handleFileChange}
                                      />
                                      <Button
                                        variant="outline"
                                        className="mt-4 gap-2"
                                        type="button"
                                      >
                                        <ImageIcon className="h-4 w-4" />
                                        Select Image
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </>
                            </FormControl>
                            <FormDescription className="text-center text-xs px-4 py-2 border-t">
                              {upload_file_size
                                ? `Max file size: ${upload_file_size.value}MB`
                                : "Max file size: 5MB"}
                            </FormDescription>
                            {error && (
                              <FormMessage className="text-center">
                                {error}
                              </FormMessage>
                            )}
                          </Card>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {stepIndex === 1 && (
                  <div className="animate-slide-right space-y-6">
                    {filePreview && (
                      <div className="flex justify-center mb-4">
                        <div className="relative w-44 aspect-[4/3] overflow-hidden rounded-md shadow-md">
                          <img
                            src={filePreview}
                            alt="Certificate preview"
                            className="object-contain w-full h-full"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-0 right-0 bg-black/40 hover:bg-black/60 rounded-full p-1 m-1"
                            onClick={() => {
                              clearFile();
                              form.setValue("image", undefined as any);
                              setStepIndex(0);
                            }}
                          >
                            <X className="h-3 w-3 text-white" />
                          </Button>
                        </div>
                      </div>
                    )}

                    <FormField
                      disabled={loading}
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Certificate Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter certificate title"
                              className="text-base py-6"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This will be displayed as the title of your
                            certificate
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Additional fields could be added here if needed */}
                  </div>
                )}

                <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 pt-2">
                  {stepIndex === 0 && (
                    <Button
                      type="button"
                      className="w-full sm:w-auto"
                      onClick={() => filePreview && setStepIndex(1)}
                      disabled={!filePreview || loading}
                    >
                      Continue
                    </Button>
                  )}

                  {stepIndex === 1 && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStepIndex(0)}
                        disabled={loading}
                        className="w-full sm:w-auto"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={loading || !form.formState.isValid}
                        className="w-full sm:w-auto gap-2"
                      >
                        {loading && (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                        {loading ? "Minting..." : "Mint Certificate"}
                      </Button>
                    </>
                  )}
                </DialogFooter>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
