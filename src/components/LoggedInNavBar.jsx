import React, {useState} from 'react'
import { UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom';
import { MdOutlineSegment } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

export default function LoggedInNavBar() {
    let Links = [
        // { name: "Prodcuts", link: "#" },
        // { name: "Features", link: "#" },
        // { name: "Solution", link: "#" },
        // { name: "Pricing", link: "#" },
        // { name: "Support", link: "#" }
    ];
    let [open, setOpen] = useState(false);
    return (
        <div className='shadow-md w-full top-0 left-0'>
            <div className='md:flex items-center justify-between py-4 md:px-10 px-7 bg-indigo-950'>
                <div className='navbar-logo font-bold text-4xl cursor-pointer flex items-center text-white'>
                    TeamCollab
                </div>

                <div onClick={() => setOpen(!open)} className='text-3xl text-white absolute right-8 top-6 cursor-pointer md:hidden'>
                    {open ? <AiOutlineClose /> : <MdOutlineSegment />}
                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-indigo-950 md:z-auto z-10 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
                    {
                        Links.map((link) => (
                            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                                <Link to={link.link} className='text-white hover:text-gray-400 duration-500'>
                                    {link.name}
                                </Link>
                            </li>
                        ))
                    }
                    <button className='duration-500'>
                        <UserButton />
                    </button>

                </ul>
            </div>
        </div>
    )
}
