import { IncomingMessage, ServerResponse } from "http";
import * as userRepository from "../db";
import { HTTP_METHODS, STATUS_CODES, BASE_URL } from "../constants";
import { validateUrl } from "../utils";

const handler = async (req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;
  console.debug(`(${method}) URL: ${url}`);
  res.setHeader("Content-Type", "application/json");

  if (!validateUrl(url)) {
    res.statusCode = STATUS_CODES.NOT_FOUND;
    res.end("Invalid URL");
  }

  try {
    switch (method) {
      case HTTP_METHODS.GET:
        const result = await userRepository.findAll();

        res.statusCode = STATUS_CODES.OK;
        res.end(JSON.stringify(result));
        break;

      default:
        break;
    }
  } catch (error) {
    res.statusCode = STATUS_CODES.OK;
    res.end();
  }
};

const router = async (req: IncomingMessage, res: ServerResponse) => {
  return handler(req, res);
};

export { router };
