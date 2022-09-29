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
app.get('/', (req, res) => {
    res.render('template', { title: 'Index Page',
    message: 'Hello there, stranger. Welcome to Express Homework Number 1. Click a button to play!',
    content: `<button onclick="window.location.href='/greeting/'">Greetings</button> <button onclick="window.location.href='/tip/:num1/:num2/'">Tip Calculator</button> <img src="https://c.tenor.com/WuOwfnsLcfYAAAAC/star-wars-obi-wan-kenobi.gif" width=1500 height=650></img>` 
    })
})

//---GREETINGS 
app.get('/greeting', (req, res) => {
    res.render('template', { title: 'Greetings',
    message: 'In order to meet one of the names below you must click on them!',
    content: `<li><a href="/greeting/name/0">Kenobi</a></li> <li><a href="/greeting/name/1">DJ Khaled</a></li> <a href="/">Return To Index</a>` 
    })
})

// Show ---- Read ---- Get
app.get('/greeting/name/:i', (req, res) => {
    const greeting = greetings[req.params.i]
    res.render('template', {
        title: greeting.name,
        message: `${greeting.message}, ${greeting.name}! His rank is: ${greeting.rank}`,
        content: `<a href="/greeting/">Return To Greetings</a>`
    })
})

//---TIP CALCULATOR
app.get('/tip/:num1/:num2', (req, res) => {
    const ans = parseInt(req.params.num2) / parseInt(req.params.num1)
    const billTotal = parseInt(req.params.num1) + parseInt(req.params.num2)
    res.render('template', {
        title: `Tip Calculator`,
        message: `Calculate your tip!
        <h3>Instructions: When hitting the route (/tip/:num1/:num2), the page should display how much your tip will be based on the total amount of the bill and the tip percentage. If the bill is $100 then your tip should be at least 20% depending on how good or bad the service was. First num is the bill and second num is % you want to leave.</h3>`,
        content: `Original bill was $${req.params.num1}. Your tip is ${ans}%. The bill total is $${billTotal}
        <div><img src="https://media.makeameme.org/created/wheres-my-tip-5b66f7.jpg"></img></div>
        <div><a href="/">Return To Index</a></div>`
    })

    // res.status(200).json({msg: `The answer is $${ans}`})
})


//---MAGIC 8 BALL




//Errors :(
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