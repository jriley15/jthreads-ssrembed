export const fetcher = async (url) => {
  let { data } = await fetch(url, {
    credentials: "include",
  }).then((r) => r.json());

  return data;
};

export const post = async (url, body) => {
  return (
    await fetch(url, {
      credentials: "include",
      body: body,
      method: "POST",
    }).then((r) => r.json())
  ).data;
};
