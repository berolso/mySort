import axios from "axios";

export async function axiosPost(sheetsUrl) {
  const config = {
    method: "POST",
    url: "/api",
    headers: {
      Authorization: { "Content-Type": "application/json" },
    },
    data: { sheetsUrl },
  };
  try {
    const res = await axios(config);
    return res.data;
  } catch (e) {
    return e;
  }
}

export async function fetchPost(url) {
  const config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: url }),
    // body: JSON.stringify(url),
  };

  const res = await fetch("/api", config);
  const body = await res.json();
  return body.message;
  // fetch('/api',config)
  //   .then((res) => res.json())
  //   .then((data) => setData(data.message));
}
