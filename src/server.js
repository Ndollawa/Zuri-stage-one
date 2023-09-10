const express = require("express");
const {
  format,
  isValid,
  isWithinInterval,
  addMinutes,
  subMinutes,
} = require("date-fns");

const app = express();

//content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// built-in middleware for json
app.use(express.json());

const PORT = process.env.PORT || 3500;
app.get("/", (req, res, next) => {
  const { slack_name, track } = req.query;
  const date = new Date();
  console.log(slack_name, track);
  return res.json({
    message: `Hello, I am Ndubuisi Ollawa and  this is my Zuri internship stage one task.`,
  });
});

app.get("/api", (req, res, next) => {
  const { slack_name, track } = req.query;

  // Get the current day of the week in full format (e.g., Monday).
  const currentDay = format(new Date(), "EEEE");

  // Get the current UTC time in ISO 8601 format.
  const utcTime = format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx");

  // Validate UTC time within a +/-2 minute window.
  const currentTime = new Date(utcTime);
  const twoMinutesAgo = subMinutes(new Date(), 2);
  const twoMinutesFromNow = addMinutes(new Date(), 2);
  const isTimeValid =
    isValid(currentTime) &&
    isWithinInterval(currentTime, {
      start: twoMinutesAgo,
      end: twoMinutesFromNow,
    });

  if (!slack_name || !track || !isTimeValid) {
    return res
      .status(400)
      .json({ error: "Invalid parameters or time window exceeded" });
  }

  const response = {
    slack_name,
    current_day: currentDay,
    utc_time: utcTime,
    track,
    github_file_url:
      "https://github.com/Ndollawa/Zuri-stage-one/blob/main/src/server.js",
    github_repo_url: "https://github.com/Ndollawa/Zuri-stage-one.git",
    status_code: 200,
  };

  res.json(response);
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
