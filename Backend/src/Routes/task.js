const express=require("express")
const taskRouter=express.Router();
const Task=require("../models/task");

taskRouter.post("/createtask", async(req, res)=>{
  try{
    const {title, description, status}=req.body;
    const task= await Task.findOne({title});
    if(task){
      return res.status(400).json({
        message: "Task already exists",
      });
    }
    const creatingtask=new Task({title, description, status,});
    await creatingtask.save();
    res.status(201).json({message: "successfully created a task", data : creatingtask,});
  }catch(error){
    res.status(500).json({message: "Internal server error", error: error.message,})
  }
})
taskRouter.get("/gettasks", async(req, res)=>{
  try{
    const tasks=await Task.find();
    res.status(200).json({message: "Getting all tasks", data: tasks});
  }catch(error){
    res.status(500).json({message: "Internal server error", error: error.message,});
  }
})

taskRouter.get("/gettask/:id", async(req, res)=>{
  try{
    const {id}=req.params;
    const task=await Task.findById(id);
    res.status(200).json({message: "Finding task by status", data: task});
  }catch(error){
    res.status(500).json({message: "Internal server error", error: error.message})
  }
})
taskRouter.patch("/updatetask/:id", async(req, res)=>{
  try{
    const {id}=req.params;
    const {title, description, status}=req.body;
    const task=await Task.findById(id);
    if(!task){
      return res.status(404).json({message: "No such task available", title: title});
    }
    const updatetask=await Task.findByIdAndUpdate(id, {title, description, status});
     const task1=await Task.findById(id);
    res.status(200).json({message: "Updated task", data: task1});
  }catch(error){
    res.status(500).json({message: "Internal server error", err: error.message})
  }
})
taskRouter.delete("/deletetask/:id", async(req, res)=>{
  try{
    const { id }=req.params;
    
  await Task.findByIdAndDelete(id);
  res.status(200).json({message: "deleted task", id : id})
  }catch(error){
    console.log("unable to delete task", error.message);
    res.status(500).json({message: "unable to delete task", err: error.message});
  }
  
})
module.exports=taskRouter;