// Filename:
//   index.js
// Date:
//   Sep, 2021
// Author:
//   Jack Chou (@jack_sparrow_hz)
// Description:
//   This is the entry of the nodejs-sqlite playground

const http = require('http')
const db = require('./services')

http.get('defaultquestions', (res) => {
  const { statusCode } = res
  const contentType = res.headers['content-type']


  // get data from database
  const sql = `select * from questions`
  let results = {}
  db.all(sql, {},(err, rows ) => {
    // process rows here
    results = rows
    console.log('rows: ')
    console.log(rows)
  });

 db.close((err) => (console.log(err)))

  let error
  // Any 2xx status code signals a successful response but
  // here we're only checking for 200.
  if (statusCode !== 200) {
    error = new Error(`Request Failed. Status Code: ${statusCode}`)
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error(`Invalid content-type. Expected application/json but received ${contentType}`)
  }

  if (error) {
    console.error(error.message)
    // Consume response data to free up memory
    res.resume()
    return
  }

  res.setEncoding('utf8')


  let rawData = results

  res.on('data', (chunk) => { rawData += chunk })
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData)
      console.log(parsedData)
    } catch (e) {
      console.error(e.message)
    }
  })
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`)
})

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  console.log(res)
  res.end(JSON.stringify({
    data: 'Hello World!'
  }))

})

server.listen(3000)

/*
server.listen('GET', 'http://localhost/defaultquestions', function () {
  console.log(`I'm listening`)
})
*/
