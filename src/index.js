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

server.post('/profile', (req, res) => {
  if (res.statusCode === 200) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    const db = new sqlite3.Database('./src/assets/myenergy.db',
    (err) => {
      if (err) { return console.error(err.message) }
      // Get user info from req
      // For the moment, assume the user is: Guest (whose id is -1)
      const query = `select * from Profile where id in (select profileId from User where id=-1)`
        db.all(query, {}, (err, rows) => {
          if (err) {throw new Error('Error: failed to get user profile!')}
          res.write(JSON.stringify(rows))
          db.close()
          res.end()
        })
      }
    )
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ Error: '/profile not found!' }))
    res.end()
  }
})

server.get('/defaultquestions', (req, res) => {
  if (res.statusCode === 200) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    let questions = []
    const db = new sqlite3.Database('./src/assets/myenergy.db',
      (err) => {
        if (err) { return console.error(err.message) }
        const sql = 'select * from Question'
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
    res.write(JSON.stringify({ Error: '/defaultquestions not found!' }))
    res.end()
  }
})

server.post('/saveprofile', (req, res) => {
  if (res.statusCode === 200) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    const db = new sqlite3.Database('./src/assets/myenergy.db',
      (err) => {
        if (err) { return console.error(err.message) }
        const answersArray = req.body || []
        const dateStr = new Date(Date.now()).toDateString()        
        console.log(answersArray)
        let params = ''
        for (let i = 0; i < answersArray.length; i++) {
          
        }

        const sql = `insert into answers (questionSeq, answer, date) values ` + params
        console.log(`sql: ${sql}`)
        db.run(sql, {}, (err, rows) => {
          if (err) {
            throw new Error(`sql error: failed to rune: ${sql}`)
          }          
          db.close()
          res.end()
        })
      }
    )
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ Error: '/saveprofile request failed' }))
    res.end()
  }
})

server.listen(3000)
