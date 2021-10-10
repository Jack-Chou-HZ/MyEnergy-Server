// Filename:
//   index.js
// Date:
//   Sep, 2021
// Author:
//   Jack Chou (@jack_sparrow_hz)
// Description:
//   This is the entry of the nodejs-sqlite playground

const App = require('express')
const server = new App()
const sqlite3 = require('sqlite3').verbose()

server.get('/defaultquestions', (req, res) => {
  if (res.statusCode === 200) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    let questions = []
    const db = new sqlite3.Database('./src/assets/myenergy.db',
      (err) => {
        if (err) { return console.error(err.message) }
        const sql = 'select * from questions'
        db.all(sql, {}, (err, rows) => {
          // process rows here
          questions = rows
        })
        console.log(questions)
        res.write(JSON.stringify(questions))
        db.close()
        res.end()
      }
    )
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ err: 'route not found' }))
    res.end()
  }
})
server.listen(3000)

// http.get('/defaultquestions', (res) => {
//   const { statusCode } = res
//   const contentType = res.headers['content-type']

//   // get data from database
//   const sql = `select * from questions`
//   let results = {}
//   db.all(sql, {},(err, rows ) => {
//     // process rows here
//     results = rows
//     console.log('rows: ')
//     console.log(rows)
//   });

//  db.close((err) => (console.log(err)))

//   let error
//   // Any 2xx status code signals a successful response but
//   // here we're only checking for 200.
//   if (statusCode !== 200) {
//     error = new Error(`Request Failed. Status Code: ${statusCode}`)
//   } else if (!/^application\/json/.test(contentType)) {
//     error = new Error(`Invalid content-type. Expected application/json but received ${contentType}`)
//   }

//   if (error) {
//     console.error(error.message)
//     // Consume response data to free up memory
//     res.resume()
//     return
//   }

//   res.setEncoding('utf8')
//   let rawData = results

//   res.on('data', (chunk) => { rawData += chunk })
//   res.on('end', () => {
//     try {
//       const parsedData = JSON.parse(rawData)
//       console.log(parsedData)
//     } catch (e) {
//       console.error(e.message)
//     }
//   })
// }).on('error', (e) => {
//   console.error(`Got error: ${e.message}`)
// })

// Create a local server to receive data from
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' })
//   const {url, p}
//   res.end(JSON.stringify({
//     data: 'Hello World!'
//   }))

// })

// server.listen(3000)

/*
server.listen('GET', 'http://localhost/defaultquestions', function () {
  console.log(`I'm listening`)
})
*/
