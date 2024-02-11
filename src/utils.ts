import { IncomingMessage } from "http";

export const validateUrl = (url: string) => {
  return url.match(/^\/api\/users\/?$/); // TODO validate uuid as well
};

export const validateBody = (body: any): boolean => {
  return (
    typeof body?.username === "string" &&
    typeof body?.age === "number" &&
    Array.isArray(body?.hobbies) &&
    body.hobbies.every((item: unknown) => typeof item === "string")
  );
};

export const parseBody = async (req: IncomingMessage): Promise<{ [key: string]: unknown }> => {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];

    req
      .on("data", (chunk: Uint8Array) => {
        chunks.push(chunk);
      })
      .on("end", () => {
        const data = Buffer.concat(chunks);
        const stringData = data.toString();
        console.debug("parseBody:", stringData);

        try {
          if (stringData) {
            resolve(JSON.parse(stringData));
          } else {
            resolve({});
          }
        } catch {
          reject("Bad request");
        }
      })
      .on("error", () => {
        reject("Bad request");
      });
  });
};
