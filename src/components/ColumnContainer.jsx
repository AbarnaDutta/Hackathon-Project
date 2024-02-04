import React, { useContext, useState, useMemo } from 'react';
import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon'
import ColumnIcon from '../icons/ColumnIcon'
import TaskContext from '../context/TaskContext';
import TaskCard from './TaskCard';
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";

export default function ColumnContainer(props) {

  const { tasks, deleteColumn, updateColumn, createNewTask } = useContext(TaskContext);
  const { columnId, column } = props;

  const [editMode, setEditMode] = useState(false);

  const tasksUnderColumn = tasks.filter((task) => task.columnId === columnId);

  const tasksIds = useMemo(() => {return tasks.map((task) => task.id);}, [tasks]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: columnId,
    data: {type: "Column", column: column},
    disabled: editMode
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className=" bg-columnBackgroundColor opacity-40 border-2 border-pink-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      </div>
    );
  }

  function handleKeyPress(e) {
    if (e.key !== "Enter") return;
    setEditMode(false);
  }

  return (
    <div ref={setNodeRef} style={style} className="  w-[350px] h-screen rounded-md flex flex-col">
      {/* Column title */}
      <div {...attributes} {...listeners} onClick={() => { setEditMode(true); }} className="bg-mainBackgroundColor text-white text-md h-[60px] cursor-grab rounded-md rounded-b-xl p-3 font-bold border-mainBackgroundColor border-4 flex items-center justify-between">

        <div className="flex gap-2">

          <div className="flex justify-center items-center bg-mainBackgroundColor px-2 py-1 text-sm rounded-full">
            <ColumnIcon />
          </div>

          { !editMode && column.title }
          {
            editMode && (
              <input className="bg-mainBackgroundColor w-[85%] focus:border-rose-500 border rounded outline-none px-2"
                onChange={(e) => updateColumn(column.id, e.target.value)}
                onKeyDown={(e) => { handleKeyPress(e) }}
                onBlur={() => { setEditMode(false); }}
                value={column.title}
                autoFocus
              />
            )
          }
        </div>

        <button onClick={() => { deleteColumn(column.id); }} className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2">
          <TrashIcon />
        </button>

      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {
            tasksUnderColumn.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          }
        </SortableContext>
      </div>

      {/* Column footer */}
      <button onClick={() => {createNewTask(columnId);}} className="flex gap-2 items-center border-2 rounded-md rounded-t-xl p-4 bg-indigo-900 text-white text-lg border-indigo-700 hover:scale-95 duration-200">
        <PlusIcon />
        Add New task
      </button>

    </div>
  );

}
