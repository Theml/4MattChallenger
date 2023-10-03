"use client"
import Image from "next/image";
import Logo from '../Img/image001.png'
import IMG1 from '../Img/🦆 icon _Home_.png'
import IMG2 from '../Img/Vector.png'
import IMG3 from '../Img/definicoes.png'
import IMG4 from '../Img/do-utilizador.png'
import insta from '../Img/image003.jpg'
import linkedin from '../Img/image002.jpg'
import face from '../Img/image004.jpg'

import { useState } from "react";

export default function Aside() {

  const [toggle, setToggle] = useState(true)

  const toggleAside = () =>{
    setToggle(!toggle)
  }

  return (

      <aside className={` flex w-60 flex-col items-center ${toggle ? 'block' : 'hidden'} `} >

        <Image className='w-24 h-16 mb-6' src={Logo} alt="4Matt_logo"/>

        <button className="w-6 h-4 ml-48 bg-hiddenButtonColor rounded-md hover:bg-darkNewViolet" onClick={toggleAside}/>

        <div className=" mt-1 items-center w-56 h-px bg-textNewGray"/>

        <div className="w-11/12 h-36 ml-6 mt-6 flex flex-col items-center justify-between ">

            <button className='m-2 flex text-textNewGray hover:text-darkNewViolet hover:bg-newGray rounded-lg w-full hover:w-10/12' onClick={ () => window.location.href = '/'}>
              <Image className="mr-6" src={IMG1} alt=""/>
              Home
            </button>
            
            <button className='m-2 flex text-textNewGray hover:text-darkNewViolet hover:bg-newGray rounded-lg w-full hover:w-10/12' onClick={ () => window.location.href = '/User'}>
              <Image  className="mr-6 w-4" src={IMG4} alt=""/>
              Perfil
            </button>

            <button className='m-2 flex text-textNewGray hover:text-darkNewViolet hover:bg-newGray rounded-lg w-full hover:w-10/12' onClick={ () => window.location.href = '/Dados'}>
              <Image  className="mr-6 " src={IMG2} alt=""/>
              Dados
            </button>

            <button className='m-2 flex text-textNewGray hover:text-darkNewViolet hover:bg-newGray rounded-lg w-full hover:w-10/12' onClick={ () => window.location.href = '/Settings'}>
              <Image  className="mr-6 w-4" src={IMG3} alt=""/>
              Settings
            </button>

        </div>

        <ul className="flex items-end mt-auto">
              <a className="m-1" href='https://www.instagram.com/4matt_tecnologia/'>
                  <Image src={insta} alt="" />
                </a>

                <a className="m-1" href='https://www.facebook.com/4mattecnologia'>
                  <Image src={face} alt="" />
                </a>

                <a className="m-1" href='https://www.linkedin.com/company/4matttecnologia/'>
                  <Image src={linkedin} alt="" />
                </a>

          </ul>

        
      </aside>
  )
}
