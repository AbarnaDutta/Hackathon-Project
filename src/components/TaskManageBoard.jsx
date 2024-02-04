import React, { useContext } from 'react';
import { DndContext, DragOverlay } from "@dnd-kit/core";
import ColumnContainer from "./ColumnContainer";
import { SortableContext } from "@dnd-kit/sortable";
import PlusIcon from "../icons/PlusIcon";
import { createPortal } from "react-dom";
import TaskContext from '../context/TaskContext';
import TaskCard from "./TaskCard";
import TaskManageSideBar from './TaskManageSideBar';

function TaskManageBoard() {

  const { createNewColumn, columnsId, columns, activeColumn, activeTask, sensors, onDragStart, onDragEnd, onDragOver, selectedBoard } = useContext(TaskContext);

  const filteredColumns = selectedBoard.id ? columns.filter(column => String(column.boardId) === String(selectedBoard.id)) : [];

  return (
    <div className="m-auto bg-mainBackgroundColor flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden pr-[40px]">

      <TaskManageSideBar />
      {
        (
          <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>

            <div className="m-auto flex gap-4">
              <div className="flex gap-4">
                <SortableContext items={columnsId}>
                  {
                    filteredColumns.map((column) => (
                      <ColumnContainer key={column.id} column={column} columnId={column.id} />
                    ))
                  }
                </SortableContext>
              </div>

              <button onClick={() => createNewColumn()} className="h-[60px] w-[350px] self-center min-w-[350px] cursor-pointer rounded-lg bg-columnBackgroundColor text-white border-2 border-columnBackgroundColor p-4 hover:ring-rose-500 hover:ring-2 flex gap-2">
                <PlusIcon />
                Add Column
              </button>
            </div>

            {
              createPortal(
                <DragOverlay>
                  {activeColumn && (<ColumnContainer column={activeColumn} columnId={activeColumn.id} />)}
                  {activeTask && (<TaskCard task={activeTask} />)}
                </DragOverlay>,
                document.body
              )
            }
          </DndContext>
        )
      }


    </div>
  );
}


export default TaskManageBoard;
