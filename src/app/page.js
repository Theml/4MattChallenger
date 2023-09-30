import Aside from "@/components/Aside";
import DashboardContainer from "@/components/Dashboards/DashboardContainer";

export default function Home() {
  
  return (
    
    <main className='flex flex-1 max-h-screen w-full h-full'>

      <Aside/>
      <DashboardContainer/>
      
    </main>
  )
}
