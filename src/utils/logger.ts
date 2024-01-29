import logger from "pino";

const log = logger({
  transport: {
    target: "pino-pretty",
    options: {
      levelFirst: true,
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "hostname,pid",
    },
  },
  base: {
    pid: false,
  },
//   timestamp: () => `,"time":"${dayjs().format()}`,
});

export default log;
