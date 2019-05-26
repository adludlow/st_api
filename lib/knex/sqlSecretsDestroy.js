const fs = require('fs')
const { traverseDir } = require('./sqlSecretsPrepare')

const migrationsPath = 'migrations/'

const destroy = () => {
  traverseDir(migrationsPath, removeExpandedSqlFile)
}

const removeExpandedSqlFile = (templateFile) => {
  if (templateFile.endsWith('sql.template')) {
    const file = templateFile.slice(0, -9)
    if (fs.existsSync(file)) {
      fs.unlinkSync(file)
    }
  }
}

destroy()
