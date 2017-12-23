var config = require('./config.js')
var exec = require('child_process').exec

exec('java -cp ' + config.cljs_path + ':src clojure.main build.clj',
  function (err, stdout, stderr) {
    console.log(stdout)
    console.log('completed clojurescript build.')
  })

exec('npm link')
console.log('completed linked command.')
