import React, { useContext, useState } from 'react'
import { TbLayoutDashboard } from "react-icons/tb"
import TaskContext from '../context/TaskContext';
import TrashIcon from "../icons/TrashIcon";

export default function Board(props) {

    const { board, open } = props;

    const { updateBoard, deleteBoard, selectedBoard, setSelectedBoard } = useContext(TaskContext);

    const [EditMode, setEditMode] = useState(false);
    const [mouseIsOver, setMouseIsOver] = useState(false);

    function handleKeyPress(e) {
        if (e.key !== "Enter") return;
        setEditMode(false);
    }

    function handleBoardClick(board) {
        setSelectedBoard({ ...selectedBoard, id: board.id, title: board.title });
        setEditMode(true);
    };

    return (
        <div>
            <button className={`${!open && "hidden"} duration-200 bg-indigo-600 w-[16rem] text-white py-5 flex justify-start items-center gap-2 pl-[1rem] rounded-r-3xl md:ml-8 hover:bg-indigo-800`}
                onMouseEnter={() => { setMouseIsOver(true); }}
                onMouseLeave={() => { setMouseIsOver(false); }}
                onClick={() => handleBoardClick(board)} >

                <TbLayoutDashboard size={'2rem'} />
                {!EditMode && board.title}
                {
                    EditMode && (
                        <input className="bg-indigo-600 w-[77%] focus:border-rose-500 border rounded outline-none px-2"
                            onChange={(e) => updateBoard(board.id, e.target.value)}
                            onKeyDown={(e) => { handleKeyPress(e) }}
                            onBlur={() => { setEditMode(false); }}
                            value={board.title}
                            autoFocus
                        />
                    )
                }
                {
                    !EditMode && mouseIsOver && (
                        <span onClick={() => deleteBoard(board.id)} className="stroke-white absolute bg-transparent opacity-65 right-12 hover:opacity-100">
                            <TrashIcon />
                        </span>
                    )
                }
            </button>
        </div>
    )
}
