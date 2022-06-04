import { useState, useEffect } from "react";

import axios from "axios";

export const GetServicioByIdServicio = (token = "", idServicio = "") => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `https://dev.gescae.online/api/servicio/${idServicio}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { response, error, loading };
};
