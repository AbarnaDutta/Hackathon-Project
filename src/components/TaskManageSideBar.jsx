import { useState, useContext } from "react";
import ControlImg from "../assets/control.png";
import logo from "../assets/logo.png";
import PlusIcon from "../icons/PlusIcon";
import Board from "./Board";
import TaskContext from "../context/TaskContext";

const TaskManageSideBar = () => {
    const [open, setOpen] = useState(true);
    
    const {boards, setBoards, createNewBoard} = useContext(TaskContext);


    return (
        <div className="mr-[5rem]">
            <div className={`bg-indigo-950 ${open ? "w-72" : "w-20 "} h-screen p-5  pt-8 relative duration-300`}>

                <img src={ControlImg} onClick={() => setOpen(!open)} className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`} />

                <div className="flex gap-x-4 items-center">
                    <img src={logo} className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
                    <h1 className={`sidebar-logo-name text-white origin-left font-medium text-3xl duration-200 ${!open && "scale-0"}`}>
                        TeamSync
                    </h1>
                </div>

                <div className={`pt-[2rem] overflow-y-auto sm:ml-[-3rem]`} style={{ maxHeight: "calc(100% - 6rem)" }}>
                    <ul className="flex flex-col">
                        {boards.map((board, index) => (
                            <li key={index} className="overflow-x-hidden flex cursor-pointer mb-[1.5rem] text-lg items-center overflow-y-scroll gap-x-4">

                                <Board board={board} boards={boards} setBoards={setBoards} open={open} />

                            </li>
                        ))}
                    </ul>
                </div>

                <div className={`origin-left ${!open && "scale-0"}`}>
                    <button onClick={() => createNewBoard()} className="w-full flex items-center gap-2 p-[1rem] bg-indigo-600 my-[1rem] rounded-2xl text-white py-2 hover:bg-indigo-800 duration-500 sm:ml-[-0.8rem]">
                        <PlusIcon />
                        Create New Board
                    </button>
                </div>
            </div>
        </div>
    );
};
export default TaskManageSideBar;