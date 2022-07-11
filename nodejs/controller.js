const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const jwt = require("jsonwebtoken");
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("db" + connection.state);
});

exports.getTechnologyDataFromDB = (req, res) => {
  const query = "Select * from images";

  connection.query(query, (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json({ data: result });
    }
  });
};

exports.updateLikeCountInDB = (req, res) => {
  const { id, likeCount } = req.body;

  const query = `update images set likeCount=${likeCount + 1} where id=${id}`;

  connection.query(query, (err, result) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  });
};

exports.updateDislikeCountInDB = (req, res) => {
  const { id, dislikeCount } = req.body;

  const query = `update images set dislikeCount=${
    dislikeCount + 1
  } where id=${id}`;

  connection.query(query, (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json({ success: true });
    }
  });
};

exports.createNewTechnologyInDB = (req, res) => {
  const { name, img, likeCount, dislikeCount } = req.body;

  console.log(req.body);

  const query =
    "Insert into images (name,img,likeCount,dislikeCount)values(?,?,?,?)";

  connection.query(
    query,
    [name, img, likeCount, dislikeCount],
    (err, result) => {
      if (err) {
        res.json({ success: false, message: err.message });
      } else {
        res.json({ success: true });
      }
    }
  );
};

exports.updateTechnologyInDB = (req, res) => {
  const { id, name, img } = req.body;

  console.log(req.body);

  const query = `update  images set name = ? , img=?  where id=?`;

  connection.query(query, [name, img, id], (err, result) => {
    if (err) {
      res.json({ success: false, message: err.message });
    } else {
      res.json({ success: true });
    }
  });
};

exports.getId = (req, res) => {
  const query = "select id from images order by id desc limit 1";
  connection.query(query, (err, result) => {
    if (err) {
      res.json({ success: false, message: err.message });
    } else {
      console.log(result);

      res.json({ success: true, result: result[0].id });
    }
  });
};

exports.deleteTechnologyFromDB = (req, res) => {
  const query = "Delete from images where id=?";
  connection.query(query, [req.params.id], (err, result) => {
    if (err) {
      res.json({ success: false, message: err.message });
    } else {
      console.log(result);

      res.json({ success: true });
    }
  });
};

exports.storeUserInDB = (req, res) => {
  const { name, email, password } = req.body;
  const query = "insert into users(username,email,password)values(?,?,?)";
  connection.query(query, [name, email, password], (err, result) => {
    if (err) {
      res.json({ success: false, message: err.message });
    } else {
      res.json({ success: true, message: "user successfully registered" });
    }
  });
};

exports.logInUser = (req, res) => {
  const { email, password } = req.body;
  const query = `select * from users where email=? AND password=?`;
  connection.query(query, [email, password], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    } else if (result.length === 0) {
      return res.json({
        success: false,
        message: "no user exists with that email and password",
      });
    } else {
      const { accessToken, refreshToken } = generateAccessTokenAndRefreshToken(
        result[0]
      );

      const updateQuery =
        "update users set refresh_token=? where email=? AND password=?";

      connection.query(
        updateQuery,
        [refreshToken, email, password],
        (err, result) => {
          if (err) {
            return res.json({ success: false, message: err.message });
          }
        }
      );

      return res.json({
        success: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
      //res.json({ success: true, message: "succesfully logged In" });
    }
  });
};

const generateAccessTokenAndRefreshToken = (user) => {
  const accessToken = jwt.sign(
    { username: user.username, email: user.email, password: user.password },
    process.env.ACCESS_TOKEN_SECRET
  );
  const refreshToken = jwt.sign(
    { username: user.username, email: user.email, password: user.password },
    process.env.REFRESH_TOKEN_SECRET
  );
  return { accessToken, refreshToken };
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.json({statusCode:403,message: "forbidden user" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.json({statusCode:403,message: "forbidden user" });
    }

    req.user = user;
    next();
  });
};

// exports.refreshToken = (req, res) => {
//   const refreshToken = req.body.token;
//   if (refreshToken == null) {
//     return res.sendStatus(401);
//   }

//   const query = "select * from users where refresh_token=?";
//   connection.query(query, [refreshToken], (err, result) => {
//     if (err) {
//       return res.json({ success: false, message: err.message });
//     } else if (result.length === 0) {
//       return res.json({
//         success: false,
//         message: "refresh token is not present",
//       });
//     }
//   });

//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       return res.sendStatus(403);
//     }

//     console.log(user);
//     const accessToken = jwt.sign(
//       {
//         username: user.username,
//         email: user.email,
//         password: user.password,
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       {
//         expiresIn: "15s",
//       }
//     );

//     return res.json({ accessToken: accessToken });
//   });
// };
