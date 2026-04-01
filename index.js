import express from "express"
import mongoose from "mongoose"
import dns from "node:dns/promises";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken"
dns.setServers(["1.1.1.1"]);

const mongodbURI = "mongodb+srv://admin:1234@cluster0.wnkxql3.mongodb.net/?appName=Cluster0"

mongoose.connect(mongodbURI).then(
    ()=>{
        console.log("connected to mongodb cluster")
    }
)

let app = express()

app.use(express.json())

app.use(
    (req,res,next)=>{
        const authorizationHeader = req.header("Authorization")
        if(authorizationHeader != null){
            const token = authorizationHeader.replace("Bearer ","")
            
            jwt.verify(token,"secretKey96$2025",
            (error,content)=>{
                if(content == null){
                    console.log("Invalid token")
                    res.json({
                        message : "Invalid token"
                    })
                    
                }else{
                    
                    req.user = content
                    next()
                }

            }
        )
    }else{
        next()
    }  
}
)


app.use("/users",userRouter)
app.use("/products",productRouter)


app.listen(5000,()=>{
        console.log("server is running...")
    }
)