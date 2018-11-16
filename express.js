var express = require("express");
var app = express();
var router = express.Router();

app.use("/err", function (req, res, next) {
    console.log("asd");
    next(err);
});

app.use("err", function (err, req, res, next) {
    console.log("err");
    console.log(err.stack);
    res.status(404).send("Error!!");
});


// router.use("/user/:id", function (req, res, next) {
//     console.log("use");
//     next();
// });

// router.get("/user/:id", function (req, res, next) {
//     res.send("Hello");
// });




// app.use('/', router);

app.listen(8081)