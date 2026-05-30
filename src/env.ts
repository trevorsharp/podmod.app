const UI_FOLDER_PATH = "./static";
const PORT = Number(process.env.PORT ?? 3000);
const LOG_REQUESTS = process.env.LOG_REQUESTS === "true";

export default {
  LOG_REQUESTS,
  PORT,
  UI_FOLDER_PATH,
};
