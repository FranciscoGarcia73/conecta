import { useEffect } from "react";

import axios from "axios";

export const GetRequisitosPendientes = (
  token = "",
  setRequisitosValidar,
  setRequisitosValidarFilter,
  setLoading,
  setError
) => {
  const fetchData = async () => {
    try {
      const result = await axios.get(
        `https://dev.gescae.online/api/evidencia/pendientes-verificar`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequisitosValidarFilter(result.data);
      setRequisitosValidar(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
};
