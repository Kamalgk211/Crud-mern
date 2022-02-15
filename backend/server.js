const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")
const userRouters = require("./routes/userRoutes")
const noteRoutes = require("./routes/noteRoutes")
const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js")

const app = express()
app.use(cors())
dotenv.config()

connectDB()
app.use(express.json())

app.get("/", (req, res) => {
  res.send("My apis running ")
})

//app.get("/api/notes", (req, res) => {
//  res.json(notes)
//})

//app.get("/api/notes/:id", (req, res) => {
//const note = notes.find((n) => n._id === req.params.id)
//res.send(note)
//})
//
//mongoose
//.connect(process.env.MONGO_URI, {
//useNewUrlParser: true,
//useUnifiedTopology: true,
//})
//.then(console.log("Connected DB"))
//.catch((err) => console.log(err))

app.use("/api/users", userRouters)
app.use("/api/notes", noteRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running on  ${PORT}`))
