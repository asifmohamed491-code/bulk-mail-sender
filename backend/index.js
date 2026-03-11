const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to DB")
    })
    .catch(() => {
        console.log("Failed to connect DB")
    })

// Collection
const credential = mongoose.model("credential", {}, "bulkmail")

// API route
app.post("/sendmail", async (req, res) => {

    try {

        const msg = req.body.msg
        const emailList = req.body.emailList

        if (!msg || !emailList) {
            return res.status(400).send(false)
        }

        const data = await credential.find()

        if (!data.length) {
            console.log("No credentials found in DB")
            return res.send(false)
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: data[0].user,
                pass: data[0].pass
            }
        });
        for (let i = 0; i < emailList.length; i++) {

            await transporter.sendMail({
                from: data[0].user,
                to: emailList[i],
                subject: "A message from Bulk Mail App",
                text: msg
            })

            console.log("Email sent to:", emailList[i])
        }

        res.send(true)

    } catch (error) {

        console.log("Error:", error)
        res.send(false)

    }

})

// Server start
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server Started on port", PORT)
})