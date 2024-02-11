import { IncomingMessage, ServerResponse } from "http";
import { parse, validate as validate_uuid } from "uuid";
import * as userRepository from "../db";
import type { User } from "../db";
import { HTTP_METHODS, STATUS_CODES, BASE_URL } from "../constants";
import { parseBody, validateBody, validateUrl } from "../utils";

const handler = async (req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;
  console.debug(`(${method}) URL: ${url}`);
  res.setHeader("Content-Type", "application/json");

  // if (!validateUrl(url)) {
  //   res.statusCode = STATUS_CODES.NOT_FOUND;
  //   res.end("Invalid URL");
  // }

  try {
    switch (method) {
      case HTTP_METHODS.GET:
        getRoute();
        break;
      case HTTP_METHODS.POST:
        postRoute();
        break;
      case HTTP_METHODS.PUT:
        putRoute();
        break;
      case HTTP_METHODS.DELETE:
        deleteRoute();
        break;
      default:
        break;
    }
  } catch (error) {
    res.statusCode = STATUS_CODES.BAD_REQUEST;
    res.end();
  }

  async function getRoute() {
    const id = url.split("/")[3];
    let result;

    if (validate_uuid(id)) {
      result = await userRepository.findOne(id);
    } else {
      result = await userRepository.findAll();
    }

    res.statusCode = STATUS_CODES.OK;
    res.end(JSON.stringify(result));
  }

  async function postRoute() {
    try {
      const body = await parseBody(req);

      if (validateBody(body)) {
        const data = await userRepository.create(body as User);
        res.statusCode = STATUS_CODES.CREATED;
        res.end(JSON.stringify(data));
      } else {
        res.statusCode = STATUS_CODES.BAD_REQUEST;
        res.end("Bad request");
      }
    } catch (error) {
      res.statusCode = STATUS_CODES.BAD_REQUEST;
      res.end("Bad request");
    }
  }

  async function putRoute() {}

  async function deleteRoute() {}
};

const router = async (req: IncomingMessage, res: ServerResponse) => {
  return handler(req, res);
};

export { router };
