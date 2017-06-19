package main

import (
	"bytes"
	"html/template"
	"log"
	"net/http"

	"github.com/acoshift/header"
	"github.com/tdewolff/minify"
	"github.com/tdewolff/minify/css"
	"github.com/tdewolff/minify/html"
	"github.com/tdewolff/minify/js"
)

var tpIndex = template.Must(template.ParseFiles("template/index.tmpl"))

func main() {
	m := minify.New()
	m.AddFunc("text/html", html.Minify)
	m.AddFunc("text/css", css.Minify)
	m.AddFunc("text/javascript", js.Minify)

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.Redirect(w, r, "/", http.StatusFound)
			return
		}
		w.Header().Set(header.ContentType, "text/html; charset=utf-8")
		var buf bytes.Buffer
		err := tpIndex.Execute(&buf, nil)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		m.Minify("text/html", w, &buf)
	})
	http.HandleFunc("/favicon.ico", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set(header.CacheControl, "public, max-age=86400")
		http.ServeFile(w, r, "static/favicon.png")
	})

	log.Println("start server at :8080")
	http.ListenAndServe(":8080", nil)
}
