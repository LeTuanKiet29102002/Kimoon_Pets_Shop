const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const cookieParser = require('cookie-parser');  //Sử dụng module cookie-parser
const cors = require("cors");
const stripeRoute = require("./routes/stripe");
const zalopayRoute = require("./routes/zalopay");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const lostpetsRoute = require("./routes/lostpets");
const feedbackRoute = require("./routes/feedback");

dotenv.config();
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3002'],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());  

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
// app.use("/api/checkout", stripeRoute);
app.use("/api/stripe", stripeRoute);
app.use("/api/zalopay", zalopayRoute);
app.use("/api/products", productRoute);
app.use("/api/lostpets", lostpetsRoute);
app.use("/api/feedback", feedbackRoute);
app.use("/api/order", orderRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("BACKEND server is running at:", process.env.PORT);
})