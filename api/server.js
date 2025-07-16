const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { PORT } = require("./constants");
const { Auth } = require("./middleware");

// Local modules
const { homeRouter } = require("./Routes/home");
const { signupRouter } = require("./Routes/signUp");
const { signinRouter } = require("./Routes/signin");
const { logoutRouter } = require("./Routes/logout");
const { resumeTitleRouter } = require("./Routes/resumeTitle");
const { personalRouter } = require("./Routes/personal");
const { educationRouter } = require("./Routes/education");
const { workExpRouter } = require("./Routes/workExp");
const { skillRouter } = require("./Routes/skills");
const { summaryRouter } = require("./Routes/summary");
const { previewRouter } = require("./Routes/preview");
const { PDF_router } = require("./Routes/generatePdf");
const { deleteRouter } = require("./Routes/deleteResume");
const resetPassword = require("./Routes/resetPassword") ;

// Middlewares
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);
app.use(Auth);

// Routes handlers / middlewares
app.use("/", homeRouter);
app.use("/signUp", signupRouter);
app.use("/signin", signinRouter);
app.use("/logout", logoutRouter);
app.use("/resetPassword", resetPassword);
app.use("/resume", resumeTitleRouter);
app.use("/personalDetails", personalRouter);
app.use("/educationDetails", educationRouter);
app.use("/jobHistory", workExpRouter);
app.use("/skills", skillRouter);
app.use("/summary", summaryRouter) ;
app.use('/preview', previewRouter) ;
app.use('/generatePDF', PDF_router) ;
app.use("/deleteResume", deleteRouter);

app.listen(PORT, function () {
  console.log(`Server started on Port ${PORT}`);
});