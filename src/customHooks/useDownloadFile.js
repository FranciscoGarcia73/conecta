import axios from "axios";
import { useState, useEffect } from "react";

export const useDownloadFile = (url) => {
  const [downloadUrl, setDownloadUrl] = useState(null);
  const config = {
    url,
    method: "GET",
    responseType: "blob",
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.request(config);
        const url = URL.createObjectURL(new Blob([data]));
        setDownloadUrl(url);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return downloadUrl;
};
