const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db_routes')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.get('/', (request, response) => {
  response.json({
    info: 'Node.js, Express, and PostgreSQL Todos API',
    available_routes: [
      { request_type: 'GET', path: '/todos' },
      { request_type: 'GET', path: '/todos/:id' },
      { request_type: 'POST', path: '/todos' },
      { request_type: 'PUT', path: '/todos/:id' },
      { request_type: 'DELETE', path: '/todos/:id' }
    ]
  })
})

// database controllers
app.get('/todos', db.getTodos)
app.get('/todos/:id', db.getTodoById)
app.post('/todos', db.createTodo)
app.put('/todos/:id', db.updateTodo)
app.delete('/todos/:id', db.deleteTodo)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
