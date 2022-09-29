// Require modules 
const fs = require('fs')
const express = require('express')
const {greetings} = require('./models/greetings')

// Create express app 
const app = express()

// Configure the app (app.set)
/*Start Config */
app.engine('evelyn', (filePath, options, callback) => { // define the view engine called hypatia
    fs.readFile(filePath, (err, content) => {
      if (err) return callback(err)
      // this is an extremely simple view engine we'll be more complex later
      const rendered = content.toString()
        .replace('#title#', `<title>${options.title}</title>`)
        .replace('#message#', `<h1>${options.message}</h1>`)
        .replace('#content#',`<div>${Array.isArray(options.content)? options.content.map(item => `<li>${item}</li>`).join('') : options.content }</div>` )
      return callback(null, rendered)
    })
  })
  app.set('views', './views') // specify the views directory
  app.set('view engine', 'evelyn') // register the evelyn view engine

/* END CONFIG */


// Index 
app.get('/greeting', (req, res) => {
    res.render('template', { title: 'Greetings Index Page',
    message: 'Hello there, stranger. In order to meet one of the names below you must click on them!',
    content: `<li><a href="/greeting/name/0">Kenobi</a></li><li><a href="/greeting/name/1">DJ Khaled</a></li>` 
    })
})


// Show ---- Read ---- Get
app.get('/greeting/name/:i', (req, res) => {
    const greeting = greetings[req.params.i]
    res.render('template', {
        title: greeting.name,
        message: `${greeting.message}, ${greeting.name}! His rank is: ${greeting.rank}`,
        content: `<a href="/greeting/">Return To Index</a>`
    })
})


/*
//trying to get the GIF of "Hello there Kenobi" to work!!! 
app.get('/greeting/name/:0', (req, res) => {
    const greeting = greetings[req.params.i]
    res.render('template', {
        title: greeting.name,
        message: `${greeting.message}, ${greeting.name}! His rank is: ${greeting.rank}`,
        content: `<img src="https://c.tenor.com/Puiv6luwdf0AAAAC/obi-wan-kenobi-hello-there.gif"></img>`
    })
})
*/


// App port 
app.listen(3000, () => {
    console.log('Listening on Port 3000')
})