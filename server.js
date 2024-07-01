import "dotenv/config";


import express from 'express'
const app = express()
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const PORT = process.env.Port || 3000
app.get("/",(req,res)=>{
    return res.send("helo");
});
//routes file
import routes from "./routes/index.js";
app.use(routes);
app.listen(PORT,()=>('server is runing on port ${PORT}'))
