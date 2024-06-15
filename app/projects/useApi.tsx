import { useEffect, useState } from "react";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState<any>();

  const getBooksApi = async (): Promise<any> => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=javascript",
        {
          method: "GET",
        }
      );

      const result = await response.json();
      console.log(result.items);
      setError("");
      setLoading(false);
      setResponse(result);
      return result;
    } catch {
      setError("Error occured");
    }
  };

  useEffect(() => {
    getBooksApi();
  }, []);
  return [loading, error, response];
};
