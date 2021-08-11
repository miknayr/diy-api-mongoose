const express = require('express')
// require the database
const db = require('./models')
// connect to it
db.connect()
// config our express app

const app = express()
const PORT = 3001

const rowdy = require('rowdy-logger')
const rowdyResults = rowdy.begin(app)
const cors = require('cors')


// request body middleware
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// test index route / -- return a server message
app.get('/', (req, res) => {
  res.json({ msg: '🛠🛠🛠hello! its DIY Time 🛠🛠🛠'})
})

// // GET /blog -- READ all posts from the db
// app.get('/blog', async (req, res) => {
//   try {
//     const posts = await db.Blog.find({})
//     console.log('🐈 +++ ' + posts)

//     res.json({posts})
//     // res.send({posts})
//   } catch(err) {
//     console.log(err)
//   }
// })

// GET /blog -- READ all posts from the db
app.get('/blog', (req, res) => {
    db.Blog.find({})
    .then(blogData => res.send(blogData))
})

// GET /blog/:id -- READ one specific post from the db
app.get('/blog/:id', (req, res) => {
  db.Blog.findById(req.params.id)
    .then(result => {
      res.json(result)
      res.redirect(`/blog/${req.params.id}`) /// <--- sopmething needs to change here  due to err_http_headers_send, need to figure out which one should be which.
    })
    .catch(err => console.log(err))
})

// POST /blog -- CREATE one post redirect to /blog
app.post('/newpost', (req, res) => {
  console.log("this is res.data: " + res.data)
  console.log('*** got a /newpost request: ', req.body, req.params, req.query)
  db.Blog.create({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content
  })
  .then (() => {
    console.log('*** newpost created maybe, redirecting')
    res.redirect('http://localhost:3000/blog')
  })
  .catch (err=> console.log(err))

})

// PUT /blog/:id -- UPDATE one post and redirect to /blog

app.put('/edit/:id', (req, res) => {
  // console.log(req)
  console.log('*** got a /edit request: ', req.body, req.params, req.query)
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

  // DELETE /blog/:id -- DESTROY one blog post, and redirect to /blog
  app.delete('/blog/:id', async (req, res) => {
    try {
        await db.Blog.findByIdAndDelete(req.params.id)

        res.redirect('/blog')
    } catch (err) {
        console.log(err)
    }
  })


app.listen(PORT, () => {
  rowdyResults.print()
  console.log(`welcome to port ${PORT}! 🌊`)
})
