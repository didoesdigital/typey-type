function fetchResource<T>(url: string): Promise<T> {
  return fetch(url, {
    method: "GET",
    credentials: "same-origin",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP status: ${response.status}`);
      }

      return response.json() as Promise<T>;
    })
    .catch((error) => {
      console.error(`Error fetching resource from ${url}:`, error);
      throw error;
    });
}

export default fetchResource;
