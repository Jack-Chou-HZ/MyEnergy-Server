// Filename:
//   index.js
// Date:
//   Sep, 2021
// Author:
//   Jack Chou (@jack_sparrow_hz)
// Description:
//   This is the entry of the nodejs-sqlite playground

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory', (err) => {
  if (err) {
    return console.error(err.message)
  }

  return console.log('database connected!')
})

db.close((err) => {
  if (err) {
    return console.error(err.message)
  }

  return console.log('database connected!')
})
