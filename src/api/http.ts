
export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

export async function fetchJson<T>(
  url: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new HttpError(
      response.status,
      `${response.status} ${response.statusText} for ${url}`
    );
  }

  return response.json() as Promise<T>;
}
