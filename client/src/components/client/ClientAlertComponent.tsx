"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const ClientFlashComponent = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  return (
    <>
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default ClientFlashComponent;