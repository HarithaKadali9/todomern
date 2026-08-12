import React, {useState, useEffect} from 'react'
import axios from "axios"
const Crud = () => {
    const [title, setTitle]=useState("");
    const [description, setDescription]=useState("");
    const [status, setStatus]=useState("");
    
    const [updateid, setUpdateId]=useState(null)
    const [openadd, setOpenAdd]=useState(false);
    const [list, setList]=useState([]);
    
    

    const gettingTasks=async()=>{
      try{
        const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks/gettasks`);
        setList(response.data.data);
      }catch(error){
        console.error("Error getting tasks", error.message);
      }
    }

    const deleteTask=async(id)=>{
      try{
        const response=await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/deletetask/${id}`)
        setList((prevList)=>prevList.filter((task)=>task._id!==id));
        alert("Deleting task");
        
      }catch(error){
        console.error("Error deleting task", error.message);
      }
    }

    const createTask=async()=>{
      
      try{
        const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks/createtask`, {title, description, status});
        setList((prevList)=>[...prevList, response.data.data]);
        setOpenAdd(!openadd);
      }catch(error){
        console.error("Error creating task", error.message);
      }
    }

    const updateTask=async(id)=>{
      try{
        const response=await axios.patch(`${import.meta.env.VITE_API_URL}/api/tasks/updatetask/${id}`, {title, description, status})
        setList((prevList)=>prevList.map((task)=>task._id==id ? response.data.data : task));
        setUpdateId(null);
      }catch(error){
        console.error("Error updating task", error.message);
      }
    }
    const handleUpdateClick=(task)=>{
      setUpdateId(task._id);
       setTitle(task.title);
  setDescription(task.description);
  setStatus(task.status);
    }

  return (
    <div>
      
      <div className="flex flex-col items-center justify-center p-4">
        
        <button onClick={()=>setOpenAdd(!openadd) }><strong>Add a task: </strong>⬇️</button>
        {openadd && 
        <div className="flex flex-col">
           
            <label>Enter title of task: </label>
            <input id="title" type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <label>Enter description of task: </label>
            <input id="description" type="text" value={description} onChange={(e)=>setDescription(e.target.value)} />
            <label>Enter status of task: </label>
            <input id="status" type="text" value={status} onChange={(e)=>setStatus(e.target.value)} />
            <button onClick={createTask}>Create</button>
        </div>}
        
        <p>Available tasks in list: </p>
        <button onClick={gettingTasks} className=" bg-blue-500 rounded-lg px-2">Get all tasks</button>
        {list.length>0 && list.map((task)=>(
           <div key={task._id} className="p-2 border border-black rounded-lg m-4">
                
              
             {task._id!==updateid ? <div className=" border-black space-x-2" key={task._id}>
                <p><strong>Name: {task.title}</strong></p>
                <p><strong>Decription:</strong> {task.description}</p>
                <p><strong>Status: </strong>{task.status}</p>
                 <button onClick={()=>handleUpdateClick(task)} className="border-black bg-blue-500 rounded-lg px-2">Update</button>
                <button onClick={()=>deleteTask(task._id)} className="border-black bg-blue-500 rounded-lg px-2">Delete</button>
                </div> : 
                <div className="flex flex-col" key={task._id}>
                  <p>update details here</p>
                  <label>Change Title: </label>
                  <input className="border border-black" type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                  <label>Change Description: </label>
                  <input className="border border-black" type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                  <label>Change Status: </label>
                  <input className="border border-black" type="text" value={status} onChange={(e)=>setStatus(e.target.value)}/>
                  <button onClick={()=>updateTask(task._id)} className="border-black bg-blue-500 rounded-lg px-2">Update now</button>
                </div> }
              </div>
        ))}
        
      </div>
      
    </div>
  )
}

export default Crud;
