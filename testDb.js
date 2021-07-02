const db = require('./models')

db.connect()

const blogCRUD = async () => {
  try{
// // CREATE
    const newPost = await new db.Blog({
      author: 'ryan',
      title: 'The First Post',
      content: 'nothing special about being #1'

    })

    await newPost.save()

    console.log('Posting: ', newPost)
// // READ

//     const foundDrink = await db.Drink.findOne({
//       name: 'Chocolate Milk'
//     })

//     console.log('Found Drink: ', foundDrink)
// // UPDATE
//     foundDrink.name = 'Choco Milk'
//     await foundDrink.save()

//     console.log('updated drink: ', foundDrink)

// // DESTROY
//       const deletedDrink = await db.Drink.deleteOne({
//         name: 'Choco Milk'
//       })

//       console.log('deleted drink: ', deletedDrink)

      } catch (err) {
        console.log(err)
      }
}

blogCRUD()