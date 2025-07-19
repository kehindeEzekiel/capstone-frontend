import { useState, useCallback } from "react";

const useMakeRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const makeRequest = useCallback(
    async ({ route, method = "GET", data = null, onSuccess, onFailure, onFinal }) => {
      setLoading(true);
      setError(null);
      setResponse(null);

      try {
        const config = {
          method,
          url: route,
          data,
        };

        const res = await API(config);
        setResponse(res.data);

        if (onSuccess && typeof onSuccess === "function") {
          onSuccess(res.data);
        }
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message || "Request failed";
        setError(errorMsg);

        if (onFailure && typeof onFailure === "function") {
          onFailure(errorMsg);
        }
      } finally {
        setLoading(false);

        if (onFinal && typeof onFinal === "function") {
          onFinal();
        }
      }
    },
    []
  );

  return { makeRequest, loading, error, response };
};

export default useMakeRequest;