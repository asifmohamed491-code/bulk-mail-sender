const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer")
const mongoose = require("mongoose")
require("dotenv").config()
require("dns").setDefaultResultOrder("ipv4first")

const app = express()

app.use(express.json())
app.use(cors())

/* -------- MongoDB Connection -------- */

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to DB"))
    .catch(() => console.log("DB Connection Failed"))

const credential = mongoose.model("credential", {}, "bulkmail")


/* -------- Test Route -------- */

app.get("/", (req, res) => {
    res.send("Bulk Mail Backend Running")
})


/* -------- Send Mail Route -------- */

app.post("/sendmail", async (req, res) => {

    try {

        const { msg, emailList } = req.body

        if (!msg || !emailList || emailList.length === 0) {
            return res.status(400).send(false)
        }

        const data = await credential.find()

        if (!data.length) {
            return res.send(false)
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: data[0].user,
                pass: data[0].pass
            }
        })
        for (let email of emailList) {

            await transporter.sendMail({
                from: data[0].user,
                to: email,
                subject: "Bulk Mail App",
                text: msg
            })

            console.log("Email sent to:", email)
        }

        res.send(true)

    }
    catch (err) {

        console.log(err)
        res.send(false)

    }

})


/* -------- Server -------- */

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server Started on port", PORT)
})