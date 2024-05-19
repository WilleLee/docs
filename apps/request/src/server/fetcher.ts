export async function fetcher<T>(
  input: URL | RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  const data = response.json();
  return data;
}
