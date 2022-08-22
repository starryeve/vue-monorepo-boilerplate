#!/usr/bin/env node
const { program } = require('commander')
const figlet = require('figlet')

program
  .command('create [name]')
  .description('create a new mono repo project')
  .action((name) => {
    require('./create')(name)
  })

program.on('--help', () => {
  console.log(
    `\r\n${figlet.textSync('VMS!', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    })}`
  )
})

program.parse(process.argv)
