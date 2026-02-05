import {useState} from 'react';
import axios from 'axios';
import './App.css';

function App(){
 const[f,setF]=useState({name:'',regNo:'',mark1:'',mark2:'',mark3:''});
 const[r,setR]=useState(null);
 const[e,setE]=useState('');
 const submit=async(e)=>{
  e.preventDefault(); setE(''); setR(null);
  try{
   const res=await axios.post('http://localhost:3000/students',f);
   setR(res.data);
  }catch(err){ setE("Error"); }
 };
 const isPass=r&&r.mark1>=50&&r.mark2>=50&&r.mark3>=50;
 return(
  <div className="c">
   <h1>Student Database</h1>
   <form onSubmit={submit}>
    {['name','regNo','mark1','mark2','mark3'].map(k=>(
     <input key={k} placeholder={k} value={f[k]}
      onChange={e=>setF({...f,[k]:e.target.value})} required/>
    ))}
    <button>Submit</button>
   </form>
   {e&&<p className="err">{e}</p>}
   {r&&<div className="res">
     <p>{r.name} ({r.regNo})</p>
     <p>Total:{r.total} Avg:{r.average}</p>
     <p className={isPass?"pass":"fail"}>{isPass?"Passed":"Failed"}</p>
   </div>}
  </div>
 );
}
export default App;