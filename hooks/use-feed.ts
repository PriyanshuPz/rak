"use client";

import { Certificate } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const useFeeds = () => {
  const { data, error, isLoading, status, refetch } = useQuery({
    queryKey: ["feeds"],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/feed`);
        const body = await response.json();
        if (response.status == 200) {
          return body.payload as Certificate[];
        } else {
          throw new Error(body.message);
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  });

  return {
    data,
    error,
    isLoading,
    status,
    refetch,
  };
};

export default useFeeds;
