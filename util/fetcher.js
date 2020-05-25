export const fetcher = async (url) => {
  let { data } = await get(url);
  return data;
};

export const get = (url) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    credentials: "include",
  }).then((r) => r.json());

export const post = (url, body) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    method: "POST",
  }).then((r) => r.json());

export const remove = (url, body) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    credentials: "include",
    method: "DELETE",
  }).then((r) => r.json());
