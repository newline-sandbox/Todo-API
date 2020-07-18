const Pool = require('pg').Pool
const pool = new Pool({
  user: 'myname',
  host: 'localhost',
  database: 'todo_api',
  password: 'mypassword',
  port: 5432
})

const getTodos = (request, response) => {
  pool.query('SELECT * FROM todos ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json(results.rows)
  })
}

const getTodoById = (request, response) => {
  const todoId = request.params.id
  pool.query('SELECT * FROM todos WHERE id = $1', [todoId], (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json(results.rows)
  })
}

const createTodo = (request, response) => {
  const todo = {}
  todo.todo_text = request.body.todo_text
  todo.status = 'pending'
  pool.query('INSERT INTO todos (todo_text, status) VALUES ($1, $2)', [todo.todo_text, todo.status], (error, result) => {
    if (error) {
      throw error
    }
    console.log(result)
    console.log(result.rows)
    response.status(201).json({ Result: 'Todo Created', todo: todo })
  })
}

const updateTodo = (request, response) => {
  const id = parseInt(request.params.id)
  const todo_text = request.body.todo_text
  const status = request.body.status

  let query_text = ''
  let query_values = []

  if (todo_text !== undefined) {
    if (status !== undefined) {
      query_text = 'UPDATE todos SET todo_text = $1, status = $2 WHERE id = $3'
      query_values = [todo_text, status, id]
    } else {
      query_text = 'UPDATE todos SET todo_text = $1 WHERE id = $2'
      query_values = [todo_text, id]
    }
  } else {
    if (status !== undefined) {
      query_text = 'UPDATE todos SET status = $1 WHERE id = $2'
      query_values = [status, id]
    }
  }

  pool.query(query_text, query_values, (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json({ Result: 'Todo updated', todoId: id })
  })
}

const deleteTodo = (request, response) => {
  const id = request.params.id

  pool.query('DELETE FROM todos WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json({ Result: 'Todo deleted', user: { id: id } })
  })
}

// export functions
module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
}
