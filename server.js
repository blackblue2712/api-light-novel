const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require('morgan')
const expressValidator = require("express-validator");
require('events').EventEmitter.prototype._maxListeners = 0;

// Bring route from routes
const indexRoute = require("./routes/index");
const cateRoute = require("./routes/category");
const bookRoute = require("./routes/book");
const chapterRoute = require("./routes/chapter");
const groupRoute = require("./routes/group");
const userRoute = require("./routes/user");

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/light-novel', {useNewUrlParser: true}, () => {
    console.log("Database connected...")
});
mongoose.connection.on("error", (error) => {
    console.log(`Connect occur error: ${error}`);
});


const app = express();

const PORT = process.env.PORT || 8080;


// Middle ware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())
app.use(expressValidator());

app.use("/", indexRoute);
app.use("/category", cateRoute);
app.use("/book", bookRoute);
app.use("/chapter", chapterRoute);
app.use("/group", groupRoute);
app.use("/user", userRoute);


app.use(function (error, req, res, next) {
    if (error.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"error" : error.name + ": " + error.message});
    } else {
        next();
    }
});


app.listen(PORT, () => {
    console.log(`Light-novel app listen on PORT ${PORT}`)
})



