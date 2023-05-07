import React, { useEffect } from "react";

/**
 * Hook für die API
 * Erstmal nur Get Requests
 * @param {string} url Adresse der API
 *  @param {string} method Methode (GET, POST, PUT, DELETE)
 * @returns Komponente
 */
export const useAPI = (url, method) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const request = new Request(url, {
        method,
      });
      const response = await fetch(request);

      const data = (await response.json()).data;

      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return { loading, data };
};
