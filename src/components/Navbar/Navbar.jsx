import Link from "next/link";

export function Navbar() {
    return (
        <div className="navbar">
        <ul className="flex justify-between"> 
            <li className="text-violet-800 mb-2">
                <Link href="/">
                    Home
                </Link>
            </li>
            <li className="text-violet-800 mb-2 ">
                <Link href="/about">
                    About
                </Link>
            </li>
            <li className="text-violet-800 mb-2 ">
                <Link href="/contact">
                    Contact
                </Link>
            </li>
      </ul>

        </div>
    )
}