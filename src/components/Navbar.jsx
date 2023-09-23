// width: 1452px;
// height: 56px;
// flex-shrink: 0;

import Link from "next/link";

export function Navbar() {
    return (
        <div className="content bg-white w-screen h-12 flex">
        <ul>
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
            {/* <li className="text-violet-800 mb-2 ">
                <Link href="/contact">
                    Contact
                </Link>
            </li> */}
      </ul>

        </div>
    )
}