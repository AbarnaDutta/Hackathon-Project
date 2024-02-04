import React, { useMemo, useState, useEffect } from "react";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { defaultColumns, defaultTasks } from "../data";
import axios from 'axios';
import TaskContext from "./TaskContext";
import { arrayMove } from "@dnd-kit/sortable";
import App from "../App";
import { Boards } from "../data";

const createBoardAPI = 'http://localhost:5000/api/v1/createNewBoard';
const createNewColumnAPI = 'http://localhost:5000/api/v1/createNewColumn';
const createNewTaskAPI = 'http://localhost:5000/api/v1/createNewTask';
const getAllColumnsAPI = 'http://localhost:5000/api/v1/getAllColumns';
const getAllTasksAPI = 'http://localhost:5000/api/v1/getAllTasks';
const updateColumnAPI = 'http://localhost:5000/api/v1/updateColumn';
const updateTaskAPI = 'http://localhost:5000/api/v1/updateTask';
const updateBoardAPI = 'http://localhost:5000/api/v1/updateBoard';
const deleteBoardAPI = 'http://localhost:5000/api/v1/deleteBoard';
const deleteColumnAPI = 'http://localhost:5000/api/v1/deleteColumn';
const deleteTaskAPI = 'http://localhost:5000/api/v1/deleteTask';

function TaskContextProvider() {

  const [columns, setColumns] = useState(defaultColumns); // State for columns array 
  const [tasks, setTasks] = useState(defaultTasks); // State for tasks array
  const [boards, setBoards] = useState(Boards);
  const [selectedBoard, setSelectedBoard] = useState(boards[0]);

  console.log('Selected Board: ', selectedBoard);

  function createNewBoard() {
    const newBoard = {
      id: boards.length + 1,
      title: `Board ${boards.length + 1}`,
    }
    setBoards([...boards, newBoard]);
  }

  function updateBoard(id, title) {
    const updatedBoard = boards.map((board) => {
      if (board.id !== id) return board;
      return { ...board, title };
    });
    setBoards(updatedBoard);
  }

  function deleteBoard(id) {
    setColumns(columns.filter((column) => column.boardId !== id));
    console.log("Columns after board deletion", columns);
    setTasks(tasks.filter((task) => task.boardId!== id));
    console.log("Tasks after board deletion", tasks);
    setBoards(boards.filter((board) => board.id !== id));
    console.log("Boards after board deletion", boards);
  }


  // useEffect(() => {
  //   axios.post(`${getAllColumnsAPI}`, {
  //     "organisation": "ABC"
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //       setColumns(response.data.data); // Update columns state directly
  //       console.log("Columns", response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // alert("Error in fetching all the columns");
  //     });

  //   axios.post(`${getAllTasksAPI}`, {
  //     "organisation": "ABC"
  //   })
  //     .then((response) => {
  //       console.log(response.data.data);
  //       setTasks(response.data.data); // Update tasks state directly
  //       console.log("Tasks", response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // alert("Error in fetching all the tasks");
  //     });
  // }, []);


  // Get The column id from the column array
  const columnsId = useMemo(() => columns.map((column) => column.id), [columns]);

  const [activeColumn, setActiveColumn] = useState(null); // State for active column
  const [activeTask, setActiveTask] = useState(null); // State for active task

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  );

  function generateId() {
    return Math.floor(Math.random() * 10001).toString(); /* Generate a random number between 0 and 10000 */
  }

  function createNewColumn() {
    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
      boardId: selectedBoard.id
    };

    setColumns([...columns, columnToAdd]);

    // axios.post(`${createNewColumnAPI}`, {
    //   "id": columnToAdd.id,
    //   "title": columnToAdd.title,
    //   "boardId": selectedBoard.id,
    //   "organisation": "ABC"
    // })
    // .then((response) => {
    //   console.log(response.data);
    //   setColumns([...columns, columnToAdd]);
    //   console.log("Columns", columns);
    // })
    // .catch((error) => {
    //   console.log(error);
    //   // alert("Error in creating a new column");
    // });
  }

  function updateColumn(id, title) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumns(newColumns);
  }

  function deleteColumn(id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const filteredTasks = tasks.filter((task) => task.columnId !== id);
    setTasks(filteredTasks);

    axios.post (`${deleteColumnAPI}`, {
      "id": id,
      "organisation": "ABC"
    })
  }

  function createNewTask(columnId) {
    const taskToAdd = {
      id: generateId(),
      columnId: columnId,
      boardId: selectedBoard.id,
      content: `Task ${tasks.length + 1}`
    };

    setTasks([...tasks, taskToAdd]); // Update tasks state directly

    // axios.post(`${createNewTaskAPI}`, {
    //   "id": taskToAdd.id,
    //   "columnId": taskToAdd.columnId,
    //   "boardId": selectedBoard.id,
    //   "content": taskToAdd.content,
    //   "organisation": "ABC"
    // })
    // .then((response) => {
    //   console.log(response.data);
    //   setTasks([...tasks, taskToAdd]); // Update tasks state directly
    //   console.log("Tasks", tasks);
    // })
    // .catch((error) => {
    //   console.log(error);
    //   // alert("Error in creating a new task");
    // })

  }

  function updateTask(id, content) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  }

  function deleteTask(id) {
    // const deletedTaskColumnId = tasks.map((task) => {
    //   if (task.id === id) return task.columnId;
    // })
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);

    // axios.post(`${deleteTaskAPI}`, {
    //   "id": id,
    //   "organisation": "ABC"
    // })
  }

  function onDragStart(event) {// DragStartEvent
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {// DragEndEvent
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {// DragOverEvent
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  const parameters = {
    columns,
    setColumns,
    tasks,
    setTasks,
    columnsId,
    createNewColumn,
    updateColumn,
    deleteColumn,
    createNewTask,
    updateTask,
    deleteTask,
    activeColumn,
    setActiveColumn,
    activeTask,
    setActiveTask,
    boards,
    setBoards,
    createNewBoard,
    updateBoard,
    deleteBoard,
    selectedBoard,
    setSelectedBoard,
    sensors,
    onDragStart,
    onDragEnd,
    onDragOver
  }

  return (
    <TaskContext.Provider value={parameters}>
      <App />
    </TaskContext.Provider>
  )
}

export default TaskContextProvider;  