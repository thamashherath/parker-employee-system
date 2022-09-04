const mongoose = require("mongoose");
const logger = require("../Logger");

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDB connected successfully");
    logger.info("Database server connected successfully");
  })
  .catch((e) => {
    console.log({
      message: "something wrong connecting database server",
      error: e,
    });
    logger.error("something wrong connecting database server" + e);
  });

// mongoose
//   .connect("process.env.MONGODB_URL", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("mongoDB connected successfully");
//   })
//   .catch((e) => {
//     console.log(e.message);
//   });

// const {setupWorkWeekDefaultConf} = require('../installer/work_week');
