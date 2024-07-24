require("dotenv").config()
const cors = require('cors')
const express = require("express")
const app = express()
app.use(express.json())
app.use(cors({
    origin: '*'
}))
app.use("/login", require("./api/login/login.router"))
app.use("/dropdown", require("./api/dropdown/dropdown.router"))
app.use("/faculty", require("./api/faculty/faculty.router"))
app.use("/student", require("./api/student/student.router"))

app.listen(process.env.PORT, () => {
    console.log("server is running on PORT", process.env.PORT)
})