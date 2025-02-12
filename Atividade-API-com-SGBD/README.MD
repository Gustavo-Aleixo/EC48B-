
## Rodar a aplicação

```
npm start
```



## Extensão VSCode

Instale a extensão **SQLite Viewer** para visualizar o arquivo `database.sqlite` diretamente no VSCode.

---




## 1. Criar Tarefa

### POST `/tasks`

```json
{
  "name": "Tarefa 1",
  "description": "Descrição da Tarefa 1"
}
```

```
POST http://localhost:3000/tasks
```



## 2. Obter Tarefas

### GET `/tasks`

```
GET http://localhost:3000/tasks
```



## 3. Deletar Tarefa

### DELETE `/tasks/{id}`

```
DELETE http://localhost:3000/tasks/{id}
```