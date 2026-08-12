require("dotenv").config()
const express=require('express')
const cors=require("cors")
const app=express();
app.use(express.json());
const connectDB=require("./config/database");
const TaskRouter=require("./Routes/task")

app.use(cors({"url":"http://localhost:5173/", credentials: true}))
app.use("/api/tasks/", TaskRouter);

app.get('/haritha', (req, res)=>{
  res.send("Hello haritha")
})

connectDB().then(()=>{
  app.listen(5000, ()=>{
    console.log("running backend application")
  });
}).catch((error)=>{
  console.error("Database connection failed", error.message);
});
