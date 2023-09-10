const express = require("express");

const app = express();
const PORT = process.env.PORT || 3500;
//content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// built-in middleware for json
app.use(express.json());

app.get("/", (req, res, next) => {
  const { slack_name, track } = req.query;
  const date = new Date();
  console.log(slack_name, track);
  return res.json({
    slack_name,
    current_day: date.getDay(),
    utc_time: date.getUTCMinutes(),
    track,
    github_file_url: "",
    github_repo_url: "",
    status_code: 200,
  });
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
