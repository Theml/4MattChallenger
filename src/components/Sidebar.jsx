// width: 244px;
// height: 1028px;
// flex-shrink: 0;
import Image from 'next/image'
import Logo from './img/image001.png'

export function Sidebar () {
    return(
        <div className="content w-60 h-screen bg-white flex">
            <Image className='w-24 h-16 ' src={Logo} alt="4Matt_logo.png" />

            <div className='flex justify-center flex-wrap items-center flex-col w-full h-14'>

                <h2 className="text-slate-900">Sidebar</h2>

            </div>
            
        </div>
    )
}