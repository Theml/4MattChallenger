"use client"
import Aside from "@/components/Aside";
import DashboardContainer from "@/components/Dashboards/DashboardContainer";
import { useState } from "react";

export default function Home() {
  
  const [toggle, setToggle] = useState(true)

  return (
    
    <main className='flex flex-1 max-h-screen w-full h-full'>

      {toggle && <Aside/>}
      
      <DashboardContainer/>
      
    </main>
  )
}
