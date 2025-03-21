"use client";
import CreatePostModal from "@/components/modals/create-post-modal";
import { useEffect, useState } from "react";

const CreateProject = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <CreatePostModal />
    </div>
  );
};

export default CreateProject;
