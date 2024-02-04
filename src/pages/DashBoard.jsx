import React, {useState} from 'react'
import LoggedInNavBar from '../components/LoggedInNavBar'
import { Link } from 'react-router-dom';
import VideoConferencing from './VideoConferencing';
import './DashBoard.css'

const NavBar = ({ toggleSidebar }) => {
    return (
        <nav className="navbar">
            <div className="logo">TeamSync</div>
            <button onClick={toggleSidebar}>Toggle Sidebar</button>
        </nav>
    );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <button onClick={toggleSidebar}>Close Sidebar</button>
        </aside>
    );
};

export default function DashBoard() {

    // return (
    //     <div>
    //         <LoggedInNavBar />
    //         <div className='flex flex-col justify-center items-center h-screen'>
    //             <Link to={'/taskManager'}>
    //                 <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
    //                     Task Manage
    //                 </button>
    //             </Link>

    //             <Link to={'/videoConferencing'}>
    //                 <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-[1rem]'>
    //                     Start a new Meet
    //                 </button>
    //             </Link>
    //         </div>
    //     </div>
    // )

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='container bg-mainBackgroundColor'>
            {/* <NavBar toggleSidebar={toggleSidebar} /> */}
            <LoggedInNavBar />
            {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
            <div className='flex flex-col justify-center items-center h-screen'>
                <Link to={'/taskManager'}>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        Task Manage
                    </button>
                </Link>

                <Link to={'/videoConferencing'}>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-[1rem]'>
                        Start a new Meet
                    </button>
                </Link>
            </div>
        </div>
    );
}
