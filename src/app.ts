import { createServer } from "http";
import { router } from "./router";

const server = createServer(router);

export { server };
