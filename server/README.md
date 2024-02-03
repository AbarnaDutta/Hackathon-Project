# Backend API Testing

1. Create a New Organisation:

```bash
http://localhost:5000/api/v1/createOrganisation
```

```json
{
  "id": "1",
  "name": "ABC"
}
```

2. Create a new Board:

```bash
http://localhost:5000/api/v1/createNewBoard
```

```json
{
  "id": "Board 1",
  "title": "Marketing Plan",
  "organisation": "ABC"
}
```

3. Create a New Column:

```bash
http://localhost:5000/api/v1/createNewColumn
```

```json
{
  "id": "Column 1",
  "title": "Column 1",
  "boardId": "Board 1",
  "organisation": "ABC"
}
```

4. Create a New Task:

```bash
http://localhost:5000/api/v1/createNewTask
```

```json
{
  "id": "Task 1",
  "columnId": "Column 1",
  "boardId": "Board 1",
  "content": "Task 1",
  "organisation": "ABC"
}
```

5. Get All Columns:

```bash
http://localhost:5000/api/v1/getAllColumns
```

```json
{
  "organisation": "ABC"
}
```

6. Get All Tasks:

```bash
http://localhost:5000/api/v1/getAllTasks
```

```json
{
  "organisation": "ABC"
}
```

7. Update a Column:

```bash
http://localhost:5000/api/v1/updateColumn
```

```json
{
  "id": "Column 1",
  "title": "My Column 1"
}
```

8. Update a task:

```bash
http://localhost:5000/api/v1/updateTask
```

```json
{
  "id": "Task 1",
  "content": "My Task 1"
}
```
