const path = require("path");
const cors = require("cors");
const express = require("express");
const pool = require("./config/db");

const dotenv = require("dotenv").config();

const { errorHandling } = require("./middleware/errorHandling");
const { jwtCheck } = require("./middleware/authMiddleware");

const claimsRouter = require("./routes/claimsRoutes");

const PORT = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/claims", claimsRouter); //jwtCheck needs to go here,
app.use(errorHandling);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
