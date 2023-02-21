import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./database/config.database.js"
import { createPost, register } from "./controllers/index.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import { verifyToken } from "./middleware/auth.middleware.js";

/* Configuration */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(morgan("common"))
bodyParser.json({ limit: "30mb", extended:  true})
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "../public/assets")))

/* File Storage */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/assets"))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage})

/* Routes */
app.post( '/auth/register', upload.single( "picturePath" ), register )
app.use( "/auth", authRoutes )
app.use( "/user", userRoutes )

app.post("/posts", verifyToken, upload.single("picture"), createPost)
app.use( "/posts", postRoutes )

/* Mongoose Setup */
connectDB(app);