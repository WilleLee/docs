import nProgress from "nprogress";

function delay(time: number = 500) {
  return new Promise((res) => setTimeout(res, time));
}

async function fetcher<T>(input: RequestInfo, init?: RequestInit) {
  nProgress.start();
  try {
    await delay(300);
    const res = await fetch(input, init);
    const data = (await res.json()) as T;
    if (!res.ok) throw new Error(`Failed to fetch data (CODE : ${res.status})`);
    return data;
  } catch (err) {
    throw new Error("Failed to fetch data");
  } finally {
    nProgress.done();
  }
}

export default fetcher;
