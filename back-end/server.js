const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config();

const app = express()

const UserRouters = require("./Routes/routes")

app.use(express.json())

app.use(cors())

mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => {
    console.log("Database is connected")
})

app.use("/", UserRouters)

app.listen(5000, () => {
    console.log(`SERVER RUNNING! 5000`)
})