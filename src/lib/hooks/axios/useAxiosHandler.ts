import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function useAxiosHandler<T>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendRequest = async (
    url: string,
    method: string,
    body?: any
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method,
        url: `${import.meta.env.VITE_API_URL}${url}`,
        data: body,
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      console.log(err);
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
