import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface APIErrorResponse {
  message: string;
}

export default function useAxiosHandler<T = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendRequest = async <R = T>(
    url: string,
    method: string,
    body?: object
  ): Promise<R | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios<R>({
        method,
        url: `${import.meta.env.VITE_API_URL}${url}`,
        data: body,
      });

      setData(response.data as unknown as T);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<APIErrorResponse>;
      console.error(err);
      const errorMessage =
        axiosError.response?.data?.message || "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, sendRequest };
}
