(ns <%= name %>.command
  (:require [cljs.nodejs :as nodejs]))

(defn command [args]
  (println "Hello world!" (str (first args))))
