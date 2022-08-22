/* eslint-disable no-console */
const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')

module.exports = async (name) => {
  if (!name) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const answer = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter your project name:'
      })
      if (answer.name.trim().length === 0) {
        console.error('Invalid project name!')
        continue
      }
      name = answer.name
      break
    }
  }

  const cwd = process.cwd()
  const templatePath = path.resolve(cwd, './template')
  const projectPath = path.resolve(cwd, `../packages/${name}`)

  const isProjectExist = await fs.pathExists(projectPath)

  if (isProjectExist) {
    const { action } = await inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'Target directory already exists, pick an action to resolve:',
      choices: [
        {
          name: 'Overwrite',
          value: 'overwrite'
        },
        {
          name: 'Cancel',
          value: false
        }
      ]
    })

    if (!action) {
      return
    } else if (action === 'overwrite') {
      console.log(`\r\nRemoving...`)
      await fs.remove(projectPath)
    }
  }

  try {
    console.log(`\r\nCreating...`)
    await fs.copy(templatePath, projectPath)
    const json = await fs.readJSON(projectPath + '/package.json')
    json.name = `@vue-monorepo-boilerplate/${name}`
    await fs.writeJSON(projectPath + '/package.json', json, {
      spaces: 2
    })

    console.log(`\r\nCreate success!`)
  } catch (err) {
    console.log(err)
  }
}
