import { cn } from "@/lib/utils";
import React from "react";

interface CenterContainerProp extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const CenterContainer = ({
  children,
  className,
  fullWidth = false,
  ...props
}: CenterContainerProp) => {
  return (
    <div
      className={cn(
        "min-h-screen w-full flex items-center flex-col py-4",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "w-full max-w-3xl px-4 sm:px-6 mx-auto",
          // !fullWidth && "lg:max-w-2xl",
          "bg-background/50 backdrop-blur-sm border-x border-border/20 shadow-sm rounded-xl"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default CenterContainer;
