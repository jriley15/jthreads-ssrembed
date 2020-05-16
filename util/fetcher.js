export const fetcher = async (url) => {
  let { data } = await fetch(url, {
    credentials: "include",
  }).then((r) => r.json());

  return data;
};

export const post = (url, body) =>
  fetch(url, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    method: "POST",
  }).then((r) => r.json());
