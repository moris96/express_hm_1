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
    content: `<button onclick="window.location.href='/greeting/'">Greetings</button> <button onclick="window.location.href='/tip/:num1/:num2/'">Tip Calculator</button><button onclick="window.location.href='/magic/'">Magic 8 Ball</button> <img src="https://c.tenor.com/WuOwfnsLcfYAAAAC/star-wars-obi-wan-kenobi.gif" width=1500 height=650></img>` 
    })
})

// Show ---- Read ---- Get
//---GREETINGS 
app.get('/greeting', (req, res) => {
    res.render('template', { title: 'Greetings',
    message: 'In order to meet one of the names below you must click on them!',
    content: `<li><a href="/greeting/name/0">Kenobi</a></li> <li><a href="/greeting/name/1">DJ Khaled</a></li> <a href="/">Return To Index</a>` 
    })
})

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
        <h3>Instructions: When hitting the route (/tip/:num1/:num2), the page should display how much your tip will be based on the total amount of the bill and the tip percentage. For example, if the bill is $100 then your tip should be at least 20% depending on how good or bad the service was. First num is the bill and second num is % you want to leave.</h3>`,
        content: `Original bill was $${req.params.num1}. Your tip is ${ans}%. The bill total is $${billTotal}
        <div><img src="https://media.makeameme.org/created/wheres-my-tip-5b66f7.jpg"></img></div>
        <div><a href="/">Return To Index</a></div>`
    })

    // res.status(200).json({msg: `The answer is $${ans}`})
})


//---MAGIC 8 BALL
const responses = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely","You may rely on it", "As I see it yes", "Most likely", "Outlook good","Yes", "Signs point to yes", "Reply hazy try again", "Ask again later","Better not tell you now", "Cannot predict now", "Concentrate and ask again","Don't count on it", "My reply is no", "My sources say no","Outlook not so good", "Very doubtful"];
let randomResponse = responses[Math.floor(Math.random() * responses.length)];

app.get('/magic', (req, res) => {
    res.render('template', { title: 'Magic 8 Ball',
    message: 'Ever dreamt of becoming rich? Of winning the lottery? Tired of your boring life? Wanted to buy a private jet, a beach house in The Hamptons, NY , Ferraris and Lambos and Buggatis and Paganis? Are you ready to become a millionaire and live the good life? Now is your chance! Find out!',
    content: `<a href="/magic/Will%20I%20Be%20A%20Millionaire">Find out!</a>
    <div><a href="/">Return To Index</a></div>
    <div><img src="https://www.meme-arsenal.com/memes/8df96a7b07e30c579d2be560baa52cd8.jpg" width=1550 height=650></img></div>`
    })
})

app.get('/magic/Will%20I%20Be%20A%20Millionaire', (req, res) => {
    res.render('template', { title: 'Magic 8 Ball',
    message: 'Your Fate:',
    content: `
    <h1>${randomResponse}</h1>
    <div><a href="/magic/Will%20I%20Be%20A%20Millionaire">Another Fate</a></div>
    <div><a href="/magic">Return To Question If You're Not Ready</a></div>
    ` 
    })
})



//Errors :(
/*
//trying to get the GIF of "Hello there Kenobi" to work!!! It would have looked cooler but oh well lol
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