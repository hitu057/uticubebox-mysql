require("dotenv").config()
const cors = require('cors')
const express = require("express")
const dropdownRouter = require("./api/dropdown/dropdown.router")

const app = express()
app.use(express.json())
app.use(cors({
    origin: '*'
}))
// app.use("/login", teamRouter)
// app.use("/student", teamRouter)
app.use("/dropdown", dropdownRouter)

app.listen(process.env.PORT, () => {
    console.log("server is running on PORT", process.env.PORT)
})