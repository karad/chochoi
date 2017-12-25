
# chochoi

Starter kit for programming Node commands with Clojure.

"chochoi" means 'easy, fast' in Japanese.

## Requirements

- cljs.jar
- nodejs

## Usage

### step 1

download `cljs.jar` from https://github.com/clojure/clojurescript/releases/latest
set CLJS_PATH.

ex.

```
export CLJS_PATH="/Users/XXXXX/.cljs/cljs.jar"
```

### step 2

install chochoi

```
$ npm install -g chochoi
```

### step 2

generate a your node command project

ex. make `hello` command

```
$ chochoi new hello

⚡ init chochoi project...

-------------------------------
- create : ./hello
- create : ./hello/src/hello
- create : hello/src/hello/core.cljs
- create : hello/src/hello/command.cljs
- create : hello/.gitignore
- create : hello/build.clj
- create : hello/build.js
- create : hello/config.js
- create : hello/package.json
- create : hello/README.md
-------------------------------

👍 completed.
```

### step 3

build command, and run!

```
$ cd hello
$ chochoi build

⚡ build chochoi project...

completed linked command.

completed clojurescript build.
up to date in 0.055s
/Users/XXXXX/.nvm/versions/node/v8.7.0/bin/hello -> /Users/XXXXX/.nvm/versions/node/v8.7.0/lib/node_modules/hello/out/main.js
/Users/XXXXX/.nvm/versions/node/v8.7.0/lib/node_modules/hello -> /Users/XXXXX/study/chochoi/hello

👍 completed.
```

### step 4

```
$ hello kaz
Hello world! kaz
```

You can edit `src/hello/command.cljs `

```
(ns hello.command
  (:require [cljs.nodejs :as nodejs]))

(defn command [args]
  (println "Hello world!" (str (first args))))
```


## Change log

### 0.0.6 (2017-12-25)

- added 'merry' command. enjoy it!

### 0.0.4 (2017-12-24)

- start project.

## License

Copyright ©  Kazuhiro Hara (Greative LLC http://greative.jp/)
{:mail kazuhiroh@gmail.com
 :twitter https://twitter.com/kara_d}

Distributed under the MIT License http://opensource.org/licenses/MIT .

## Thanks

- [@kara_d](https://github.com/karad/)


