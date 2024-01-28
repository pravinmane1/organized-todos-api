import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const connect = async () => {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    logger.info("connect to db");
  } catch (err) {
    logger.error("error connecting the db ", err);
    process.exit(1);
  }
};

export default connect;
