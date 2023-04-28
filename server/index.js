import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
// import router
import clientRoutes from "./routes/clients.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";


// data imports
import User from "./models/User.js";
import {dataUser} from "./data/index.js";


// configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cors());


// Route configuration
app.use("/clients",clientRoutes)
app.use("/general",generalRoutes)
app.use("/management",managementRoutes)
app.use("/sales",salesRoutes)

// mongoose setup
const PORT = process.env.PORT || 9000
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);

        // only add data one time
        // User.insertMany(dataUser)
    });
}).catch((err)=>{
    console.log(`${err} did not connect`);
})
