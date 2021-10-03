// Filename:
//   services.js
// Date:
//   Sep, 2021
// Author:
//   Jack Chou (@jack_sparrow_hz)
// Description:
//   Functions to interact with sqlite database file

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./src/assets/myenergy.db',
  (err) => {
    if (err) {
      return console.error(err.message)
    }
    console.log('Connected to the energy database.')
  }
)

module.exports = db

/*
db.serialize(() => {
  db.each('SELECT id, quote, author FROM quotes', (err, row) => {
    if (err) {
      console.error(err.message)
    }

    console.log(row.id + '\t' + row)
  })
})



db.close((err) => {
  if (err) {
    console.error(err.message)
  }

  console.log('Close the database connection.')
})
*/
