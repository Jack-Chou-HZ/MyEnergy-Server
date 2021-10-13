// Filename:
//   index.js
// Date:
//   Sep, 2021
// Author:
//   Jack Chou (@jack_sparrow_hz)
// Description:
//   This is the entry of the nodejs-sqlite playground

const App = require('express')
const bodyParser = require('body-parser')
const server = new App()
const sqlite3 = require('sqlite3').verbose()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.get('/defaultquestions', (req, res) => {
  if (res.statusCode === 200) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    let questions = []
    const db = new sqlite3.Database('./src/assets/myenergy.db',
      (err) => {
        if (err) { return console.error(err.message) }
        const sql = 'select * from questions'
        db.all(sql, {}, (err, rows) => {
          if (err) {
            throw new Error('sql error')
          }
          // process rows here
          questions = rows
          console.log('questions: ')
          console.log(questions)
          res.write(JSON.stringify(questions))
          db.close()
          res.end()
        })
      }
    )
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ err: 'route not found' }))
    res.end()
  }
})

server.post('/saveprofile', (req, res) => {
  if (res.statusCode === 200) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    const questions = []
    const db = new sqlite3.Database('./src/assets/myenergy.db',
      (err) => {
        if (err) { return console.error(err.message) }
        const date = new Date('yyyy/MM/dd')
        console.log(req.body)
        /*
        const sql = `insert into answers (questionSeq, answer, date) values
        `
        db.all(sql, {}, (err, rows) => {
          if (err) {
            throw new Error('sql error')
          }
          // process rows here
          questions = rows
          console.log('questions: ')
          console.log(questions)
          res.write(JSON.stringify(questions))
          db.close()
          res.end()

        }) */
      }
    )
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ err: 'route not found' }))
    res.end()
  }
})

server.listen(3000)
