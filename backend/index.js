const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer");
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL).then(function () {
    console.log("Connect to DB")
}).catch(function () {
    console.log("Failed to connect")
})


const credential = mongoose.model("credential", {}, "bulkmail")


app.post("/sendmail", function (req, res) {

    var msg = req.body.msg
    var emailList = req.body.emailList

    credential.find().then(function (data) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: data[0].toJSON().user,
                pass: data[0].toJSON().pass,
            },
        });
        new Promise(async function (resolve, reject) {


            try {
                for (var i = 0; i < emailList.length; i++) {

                    await transporter.sendMail({
                        from: "asifmohamed491@gmail.com",
                        to: emailList[i],
                        subject: "A message from Bulk Mail App",
                        text: msg
                    }

                    )
                    console.log("Email sent to:" + emailList[i])

                }
                resolve("success")
            }
            catch (error) {
                res.send(false)
                reject("Fail")
            }

            
        }).then(function (succeed) {
            console.log(succeed)
            res.send(true)
        }).catch(function (failed) {
            console.log(failed)
            res.send(false)
        })

    }).catch(function (error) {

        console.log(error)
    })


})


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Server Started...")
})