// width: 244px;
// height: 1028px;
// flex-shrink: 0; flex justify-center flex-wrap items-center flex-col w-full h-14
import './styles.css'
import Image from 'next/image'
import Logo from './img/image001.png'

export function Sidebar () {
    return(
        <div className="sidebar">
            <Image className='w-24 h-16 ' src={Logo} alt="4Matt_logo.png" />

            <div className=''>

                <h2 className="text-slate-900">Sidebar</h2>

            </div>
            
        </div>
    )
}