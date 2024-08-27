require("dotenv").config()
const cors = require('cors')
const express = require("express")
const app = express()
app.use(express.json())
app.use(cors({
    origin: '*'
}))
app.use('/uploads', express.static('uploads'))
app.use("/login", require("./api/login/login.router"))
app.use("/dropdown", require("./api/dropdown/dropdown.router"))
app.use("/faculty", require("./api/faculty/faculty.router"))
app.use("/student", require("./api/student/student.router"))
app.use("/holiday", require("./api/holiday/holiday.router"))
app.use("/semester", require("./api/semester/semester.router"))
app.use("/attendance", require("./api/attendance/attendance.router"))
app.use("/attendanceTimeTable", require("./api/attendanceTimeTable/attendanceTimeTable.router"))
app.use("/fee", require("./api/fee/fee.router"))
app.use("/logBook", require("./api/logBook/logBook.router"))

app.listen(process.env.PORT, () => {
    console.log("server is running on PORT", process.env.PORT)
})