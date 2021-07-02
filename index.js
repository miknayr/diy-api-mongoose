const express = require('express')
// require the database
const db = require('./models')
// connect to it
db.connect()
// config our express app

const app = express()
const PORT = 3000

const rowdy = require('rowdy-logger')
const rowdyResults = rowdy.begin(app)



// request body middleware
app.use(express.urlencoded({ extended: false }))

// test index route / -- return a server message
app.get('/', (req, res) => {
  res.json({ msg: '🛠🛠🛠hello! its DIY Time 🛠🛠🛠'})
})

// GET /blog -- READ all posts from the db
app.get('/blog', async (req, res) => {
  try {
    const posts = await db.Blog.find({})
    res.json({posts})
  } catch(err) {
    console.log(err)
  }
})

// POST /blog -- CREATE one post redirect to /blog
app.post('/blog', (req, res) => {
  db.Blog.create({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content
  })
  .then (() => {
    res.redirect('/blog')
  })
  .catch (err=> console.log(err))

})

// PUT /blog/:id -- UPDATE one post and redirect to /blog

app.put('/blog/:id', (req, res) => {
  db.Blog.findById(req.params.id)
  .then(foundPost => {
    foundPost.author = req.body.author
    foundPost.title = req.body.title
    foundPost.content = req.body.content

    foundPost.save()
    .then(() => {
      res.redirect('/blog')
    })
    .catch ((err) => console.log(err))
  })
  .catch ((err) => console.log(err))
})


// DELETE /blog/:id -- DESTROY one drink and redirect to /drinks

  app.delete('/blog/:id', (req, res) => {
    db.Blog.findByIdAndDelete(req.params.id)
    .then(deletedItem => {
      console.log(deletedItem)
      res.redirect('/blog')
    }).catch((err)=> console.log(err))
  })



app.listen(PORT, () => {
  rowdyResults.print()
  console.log(`welcome to port ${PORT}! 🌊`)
})
