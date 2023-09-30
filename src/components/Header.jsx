import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-14 ">
      <ul className="flex justify-center items-center">
        <li className="nav-link mt-2 mx-6 hover:text-newViolet focus:text-newViolet active:text-newViolet">
          <Link href='/'>
            Home
          </Link>
        </li>
        <li className="nav-link mt-2 mx-6 hover:text-newViolet focus:text-newViolet active:text-newViolet">
          <Link href='/ApplicationSpend'>
            Application spend
          </Link>
        </li>
        <li className="nav-link mt-2 mx-6 hover:text-newViolet focus:text-newViolet active:text-newViolet">
          <Link href='/Transation'>
            Transation
          </Link>
        </li>
        
        <li className="nav-link mt-2 mx-6 hover:text-newViolet focus:text-newViolet active:text-newViolet">
          <Link href='/Licences'>
            Licenses
          </Link>
        </li>
      </ul>       
    </header>
  )
}