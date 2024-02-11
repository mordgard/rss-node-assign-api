import { server } from "./app";

const APP_PORT = Number(process.env.PORT || 8000);

server.listen(APP_PORT, () => {
  console.log(`App running on port: ${APP_PORT}`);
});
