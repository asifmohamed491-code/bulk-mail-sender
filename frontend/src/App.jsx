import { useState } from 'react'
import axios from 'axios'
import * as XLSX from "xlsx"
import './App.css'

function App() {

  const [msg, setmsg] = useState("")
  const [status, setstatus] = useState(false)
  const [emailList,setemailList] = useState([])

  function handlemsg(evt) {
    setmsg(evt.target.value)
  }

  function handlefile(event) {

    const file = event.target.files[0]

    const reader = new FileReader()

    reader.onload = function (event) {

      const data = event.target.result

      const workbook = XLSX.read(data,{type:"binary"})

      const sheetName = workbook.SheetNames[0]

      const worksheet = workbook.Sheets[sheetName]

      const emailList = XLSX.utils.sheet_to_json(worksheet,{header:'A'})

      const totalemail = emailList
        .map(item => item.A)
        .filter(email => email && email.includes("@"))

      setemailList(totalemail)

    }

    reader.readAsBinaryString(file)

  }

  function send() {

    if(!msg){
      alert("Enter message")
      return
    }

    if(emailList.length === 0){
      alert("Upload email file")
      return
    }

    setstatus(true)

    axios.post(
      "https://bulk-mail-sender-1-u9hg.onrender.com/sendmail",
      { msg: msg , emailList: emailList }
    )
    .then(function (data) {

      console.log(data.data)

      if (data.data === true) {
        alert("Email Sent Successfully")
      }
      else {
        alert("Failed")
      }

      setstatus(false)

    })
    .catch(function(err){

      console.log(err)

      alert("Server Error")

      setstatus(false)

    })

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex flex-col">

      {/* Header */}
      <div className='bg-slate-950 text-center px-4 py-5'>
        <div className='gap-3'>
          <h1 className='bulkmail-logo text-2xl sm:text-3xl md:text-4xl '>
            BulkMail
          </h1>
        </div>
      </div>

      {/* Subheading */}
      <div className='text-indigo-200 text-center px-4 py-3 bg-slate-900 text-sm sm:text-base'>
        We can help your business with sending multiple emails at once
      </div>

      {/* Main Section */}
      <div className='flex flex-col items-center justify-center flex-grow px-4 py-8 sm:py-12'>

        <div className='w-full max-w-3xl bg-slate-900/60 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-10 border border-indigo-800'>

          <h2 className='text-indigo-300 font-medium mb-5 text-center text-lg sm:text-xl'>
            Compose Message
          </h2>

          <textarea
            onChange={handlemsg}
            value={msg}
            className='w-full h-32 sm:h-36 py-3 px-4 rounded-lg bg-slate-800 text-white
            border border-indigo-700
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            hover:border-indigo-400
            transition-all duration-300 text-sm sm:text-base'
            placeholder='Enter the email text ....'>
          </textarea>

          <div className="mt-6">
            <input
              onChange={handlefile}
              type="file"
              className="w-full border-2 border-dashed border-indigo-700 rounded-lg p-4 sm:p-6 bg-slate-800 text-indigo-200"
            />
          </div>

          <p className='text-indigo-300 mt-5 text-sm sm:text-base'>
            Total Emails in the file: {emailList.length}
          </p>

          <button
            onClick={send}
            disabled={status}
            className='mt-6 w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-lg font-medium text-white
            shadow-lg hover:shadow-indigo-700/40 transition-all duration-300
            disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base'>

            {status ? "Sending..." : "Send Emails"}

          </button>

        </div>

      </div>

    </div>
  )
}

export default App