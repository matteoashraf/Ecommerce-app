import { Loader } from "lucide-react";
import React from "react";

export default function LoadingPage() {
  return (
    <div className="flex h-100 justify-center items-center">
      <Loader className="animate-spin" size={50} />
    </div>
  );
}
