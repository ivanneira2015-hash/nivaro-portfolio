"use client";
import { useState } from "react";
export default function Contact(){
 const [msg,setMsg]=useState("");
 const send=async()=>{
  await fetch("/api/contact",{method:"POST",body:JSON.stringify({msg})});
  alert("enviado");
 };
 return (
  <div style={{padding:40}}>
   <h2>Reservas</h2>
   <input onChange={e=>setMsg(e.target.value)} placeholder="mensaje"/>
   <button onClick={send}>Enviar</button>
  </div>
 )
}