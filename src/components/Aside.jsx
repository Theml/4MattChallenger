"use client"
import Image from "next/image";
import Logo from '../Img/image001.png'
import IMG1 from '../Img/🦆 icon _Home_.png'
import IMG2 from '../Img/Vector.png'
import IMG3 from '../Img/definicoes.png'
import IMG4 from '../Img/do-utilizador.png'
export default function Aside() {
  return (
    <aside className='flex w-60 flex-col'>
      <Image className='ml-14 w-24 h-16 mt-6' src={Logo} alt="4Matt_logo"/>

      <div className=" h-36 m-6 p-4 flex flex-col items-center justify-between w-auto">
         {/* esse butão tem que ser um componente a parte onde ele tem um butão impudido para expandir  */}
          <button className='m-2 flex text-textNewGray hover:text-darkNewViolet hover:bg-newGray rounded-xl w-full' href='/'>
            <Image className="mr-6" src={IMG1} alt=""/>
            Home
          </button>
          <button className='m-2 flex text-textNewGray hover:text-darkNewViolet hover:bg-newGray rounded-xl w-full' href='/User'>
            <Image  className="mr-6 w-4" src={IMG4} alt=""/>
            Perfil
          </button>
          <button className='m-2 flex text-textNewGray hover:text-darkNewViolet hover:bg-newGray rounded-xl w-full' href='/Data'>
            <Image  className="mr-6 " src={IMG2} alt=""/>
            Dados
          </button>
          <button className='m-2 flex text-textNewGray hover:text-darkNewViolet hover:bg-newGray rounded-xl w-full' href='/Settings'>
            <Image  className="mr-6 w-4" src={IMG3} alt=""/>
            Settings
          </button>
      </div>
        
    </aside>
  )
}
