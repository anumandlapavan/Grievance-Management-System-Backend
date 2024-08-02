const express = require("express");
const app = express();

const Authroutes=require('./routes/AuthRoutes');
const Categoryroutes=require("./routes/CategoryRoutes");
const Complaintroutes=require("./routes/ComplaintRoutes");
const Studentroutes=require("./routes/StudentRoutes");
const Userroutes=require("./routes/UserRoutes");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT || 8888;

database.connect();
app.use(express.json());

//middlewares
app.use(express.json());
app.use(cookieParser());




app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)

//routes
app.use("/api/v1/auth",Authroutes);
app.use("/api/v1/category",Categoryroutes);
app.use("/api/v1/complaints",Complaintroutes);
app.use("/api/v1/students",Studentroutes);
app.use("/api/v1/users",Userroutes);

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})
