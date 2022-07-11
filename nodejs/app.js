const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");

const {
  getTechnologyDataFromDB,
  updateLikeCountInDB,
  updateDislikeCountInDB,
  createNewTechnologyInDB,
  updateTechnologyInDB,
  getId,
  deleteTechnologyFromDB,
  storeUserInDB,
  logInUser,
  authenticateToken,
  refreshToken,
} = require("./controller.js");

dotenv.config({ path: "./config.env" });

const app = express();
app.use(cors());
app.use(express.json());

// const connection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   port: process.env.DB_PORT,
// });

// connection.connect((err) => {
//   if (err) {
//     console.log(err.message);
//     return;
//   }
//   console.log("db" + connection.state);
// });

app.listen(process.env.PORT, () => {
  console.log("server running");
});

// app.get("/api/v1/insert", (req, res) => {
//   const query = "Insert into images(name,img,likeCount,dislikeCount) values ?";
//   const data = [
//     ["user 1", "./images/tiger.jpg", 0, 0],
//     ["user 2", "./images/tiger2.jpg", 0, 0],
//     ["user 3", "./images/tiger3.jpg", 0, 0],
//     ["user 4", "./images/tiger4.jpg", 0, 0],
//     ["user 5", "./images/tiger5.jpg", 0, 0],
//     ["user 6", "./images/tiger6.jpg", 2, 0],
//   ];

//   connection.query(query, [data], (err, result) => {
//     if (err) {
//       res.json({ err: err });
//     } else {
//       res.json({ result: result });
//     }
//   });
// });

app.get(
  "/api/v1/getTechnologyData",
  authenticateToken,
  getTechnologyDataFromDB
);

app.put("/api/v1/update/likecount", updateLikeCountInDB);

app.put(
  "/api/v1/update/dislikecount",

  updateDislikeCountInDB
);

app.post("/api/v1/create", authenticateToken, createNewTechnologyInDB);

app.put("/api/v1/update", authenticateToken, updateTechnologyInDB);
app.get("/api/v1/getId", authenticateToken, getId);

app.delete("/api/v1/delete/:id", authenticateToken, deleteTechnologyFromDB);

app.post("/api/v1/signup", storeUserInDB);

app.post("/api/v1/login", logInUser);
// app.post("/api/v1/token", refreshToken);
