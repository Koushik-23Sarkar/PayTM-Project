// backend/index.js
const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
const { authMiddleware } = require("./middleware");


const app = express();
app.use(cors());
app.use(express.json());

app.get("/me",authMiddleware,(req,res)=>{
    if(req.userId){
        res.json({
            message: "Go to Dashboard"
        })
    }
})
app.use("/api/v1", rootRouter);

app.listen(3000);