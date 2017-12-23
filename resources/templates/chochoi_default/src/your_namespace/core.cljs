(ns <%= name %>.core
  (:require [cljs.nodejs :as nodejs]
            [<%= name %>.command :as c]))

(nodejs/enable-util-print!)

(defn -main [& args]
  (c/command args))

(set! *main-cli-fn* -main)
