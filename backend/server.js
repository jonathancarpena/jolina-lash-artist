import dotenv from "dotenv"

// Express
import express, { json, urlencoded } from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"

// Database
import connectDB from './config/db.js'

// Routes
import adminRoutes from './routes/adminRoutes.js'
import availabilityRoutes from './routes/availabilityRoutes.js'
import bookingRoutes from './routes/bookingRoute.js'
import serviceRoutes from './routes/serviceRoute.js'
import imageRoutes from './routes/imageRoute.js'

dotenv.config()

// Conncet to MongoDB
connectDB();

// Express Server
const app = express()

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

// For JSON Data
app.use(cookieParser())
app.use(json())
app.use(urlencoded({
    extended: false
}))



// Routes: (extension, routes)
app.use("/api/admin", adminRoutes)
app.use("/api/availability", availabilityRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/services", serviceRoutes)
app.use('/image', imageRoutes)


// Uncomment For Development
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname.split("server")[0], "client", "build")))
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname.split("server")[0], "client", "build", "index.html"))
//     })
// }

// Port server is running on
const PORT = process.env.PORT || 5000
app.listen(PORT,
    () => console.log(`Server running on port ${PORT}`)
)