import express from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./src/routes/AuthRoutes.js";
import { mongoURI } from "./src/config/config.js";
import  cookieParser from "cookie-parser";
import TaskRoutes from "./src/routes/TaskRoutes.js"

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ credentials: true, origin: "http://localhost:3000" , "Access-Control-Allow-Headers":"http://localhost:3000"  }));

app.use(cookieParser());  //used to get cookies from user http request.
app.use(bodyParser.json());
//bodyParser.json():
//Purpose: This middleware is used to parse incoming request bodies in JSON format.
//How it works: When a client sends a request with a JSON payload (common in API requests),
// this middleware parses the JSON data and makes it available in the req.body object for further processing in your application.
app.use(express.static("public"));
//Purpose: This middleware is responsible for serving static files, such as HTML, CSS, images, etc.,
//from a specified directory. In this case, it serves files from the 'public' directory.

//How it works: When a request is made for a static file (e.g., an image or a CSS file),
// Express looks in the specified directory and sends the file back to the client
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//Purpose: This middleware is used to parse incoming request bodies in URL-encoded form data.
//How it works: When a client submits a form with the application/x-www-form-urlencoded content type (common in HTML forms),
// this middleware parses the form data and makes it available in the req.body object.
//The extended: true option allows for parsing complex objects and arrays in the URL-encoded data.

connect(mongoURI);

app.use("/auth", authRoutes);
app.use("/task", TaskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
