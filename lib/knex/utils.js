const fs = require('fs')

const loadFile = (filename) => (knex) => {
  if (!fs.existsSync(filename)) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    fs.readFile(filename, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  }).then(file => knex.raw(file))
}

module.exports.migrate = (basename) => ({
  up: loadFile(`${basename}.up.sql`),
  down: loadFile(`${basename}.down.sql`)
})

module.exports.seed = (basename) => ({
  seed: loadFile(`${basename}.sql`)
})
