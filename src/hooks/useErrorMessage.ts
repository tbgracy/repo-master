import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function useErrorMessage() {
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [errorMessage]);

  return setErrorMessage;
}
