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
  "id": "1",
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
  "id": "1",
  "title": "Column 1",
  "boardId": "Board 1",
  "organisation": "ABC"
}
```
