const fs = require('fs')
const path = require('path')
const envsub = require('envsub')

const migrationsPath = 'migrations/'

const substitute = (templateFile, outputFile) => {
  envsub({ templateFile, outputFile }).catch((err) => {
    if (err) throw err
  })
}

const substituteTemplate = (templateFile) => {
  if (templateFile.endsWith('sql.template')) {
    substitute(templateFile, templateFile.slice(0, -9))
  }
}

const traverseDir = (dir, callback) => {
  fs.readdir(dir, (err, files) => {
    if (err) throw err
    for (const f of files) {
      const file = path.resolve(dir, f)
      if (fs.statSync(file).isDirectory()) {
        traverseDir(file, callback)
      } else {
        callback(file)
      }
    }
  })
}

const prepare = () => {
  traverseDir(migrationsPath, substituteTemplate)
}

prepare()

module.exports.traverseDir = traverseDir
