"use client";

import { X } from "lucide-react";

import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: any) => void;
  value: File | null;
  children: React.ReactNode;
}
const FileUpload = ({ onChange, value, children }: FileUploadProps) => {
  if (value) {
    const imageUrl = URL.createObjectURL(value);
    return (
      <AspectRatio ratio={16 / 9}>
        <Image fill src={imageUrl} alt="Upload" className="rounded-md" />
        <button
          onClick={() => {
            onChange(null);
          }}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </AspectRatio>
    );
  }
  return (
    <div>
      <AspectRatio ratio={12 / 4}>
        <div className="w-full h-full rounded-2xl border-dashed border-4 flex items-center justify-center text-gray-500 font-bold">
          {children}
        </div>
      </AspectRatio>
    </div>
  );
};

export default FileUpload;
