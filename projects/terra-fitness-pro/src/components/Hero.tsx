"use client";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
export default function Hero(){
 return (
  <section style={{height:"100vh",background:"black",color:"white"}}>
   <Canvas>
    <mesh>
     <boxGeometry />
     <meshStandardMaterial />
    </mesh>
   </Canvas>
   <motion.h1 initial={{opacity:0}} animate={{opacity:1}} style={{position:"absolute",top:"40%",left:"50%",transform:"translate(-50%,-50%)"}}>
    TERRA FITNESS PRO
   </motion.h1>
  </section>
 )
}