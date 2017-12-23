(require 'cljs.build.api)

(cljs.build.api/build "src" {
  :output-to "out/main.js"
  :main '<%= name %>.core
  :optimizations :simple
  :target :nodejs
})