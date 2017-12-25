#!/usr/bin/env node

// import libs
var ejs = require('ejs')
var fs = require('fs')
var mkdirp = require('mkdirp')
var path = require('path')
var config = require('./config')
var util = require('./util/index')
var easterEgg = require('./util/easterEgg')
var exec = require('child_process').exec

// read setting
var permission = config.permission
var destinationPath = config.destinationPath
var encoding = config.encoding

/**
 * copy file from templates
 * @param from
 * @param to
 */
function copyTemplate (from, to) {
  from = path.join(__dirname, '..', 'resources/templates', from)
  to = path.join(destinationPath + to)
  write(to, fs.readFileSync(from, encoding.utf8))
}

/**
 * render file from templates
 * @param from
 * @param to
 * @param data
 */
function copyAndSetValueIntoTemplate (from, to, data) {
  from = path.join(__dirname, '..', 'resources/templates', from)
  to = path.join(destinationPath + to)
  var contents = fs.readFileSync(from, encoding.utf8)
  write(to, ejs.render(contents, data))
}

/**
 * write file
 * @param path
 * @param str
 * @param mode
 */
function write (path, str, mode) {
  fs.writeFileSync(path, str, {mode: mode || permission.o666})
  util.println('- \x1b[36mcreate\x1b[0m : ' + path)
}

/**
 * make dir if exists
 * @param path
 * @param fn
 */
function mkdir (path, fn) {
  if (!fs.existsSync(path)) {
    mkdirp.sync(path, permission.o755)
    util.println('- \x1b[36mcreate\x1b[0m : ' + path)
  }
  fn && fn()
}

/**
 * output file from templates
 * @param templatePath
 * @param outPath
 * @param data
 */
function out (templatePath, outPath, data) {
  var parsedPath = path.parse(outPath)
  mkdir(destinationPath + parsedPath.dir,
    function () {
      if (data) {
        copyAndSetValueIntoTemplate(templatePath, outPath, data)
      } else {
        copyTemplate(templatePath, outPath)
      }
    }
  )
}

/**
 * new command
 * @param cmdName
 * @param cmdValue
 */
function chochoiNew (cmdName, cmdValue) {
  util.br()
  util.println('⚡ \x1b[33minit chochoi project...\x1b[0m')
  util.br()
  util.hr()

  var name = cmdValue || 'chochoi_sample'
  var outPath = '/' + name

  // render files
  mkdir(destinationPath + outPath)
  out('/chochoi_default/src/your_namespace/core.cljs', outPath + '/src/' + name + '/core.cljs', {name: name})
  out('/chochoi_default/src/your_namespace/command.cljs', outPath + '/src/' + name + '/command.cljs', {name: name})
  out('/chochoi_default/gitignore', outPath + '/.gitignore')
  out('/chochoi_default/build.clj', outPath + '/build.clj', {name: name})
  out('/chochoi_default/build.js', outPath + '/build.js')
  out('/chochoi_default/config.js', outPath + '/config.js')
  out('/chochoi_default/package.json', outPath + '/package.json', {name: name})
  out('/chochoi_default/README.md', outPath + '/README.md', {name: name})

  util.hr()
  util.br()
  util.println('👍 \x1b[32mcompleted.\x1b[0m')
}

/**
 * build command
 * @param cmdName
 * @param cmdValue
 */
function chochoiBuild (cmdName, cmdValue) {
  if (!fs.existsSync('build.js')) {
    util.br()
    util.println('⚠️  \x1b[31mcould not find build.js ...\x1b[0m')
    util.br()
    return
  }
  util.br()
  util.println('⚡ \x1b[33mbuild chochoi project...\x1b[0m')
  util.br()
  exec('node build.js && npm link', function (err, stdout, stderr) {
    console.log(stdout)
    util.println('👍 \x1b[32mcompleted.\x1b[0m')
  })
}

/**
 * main
 * @param args
 */
function main (args) {
  var argv = args.slice(2)
  switch (argv[0]) {
    case 'new': chochoiNew(argv[0], argv[1])
      break;
    case 'build': chochoiBuild(argv[0], argv[1])
      break;
    case 'merry': easterEgg.merry(argv[0], argv[1])
      break;
    default: console.log('display chochoi help.')
      break;
  }
}

main(process.argv)