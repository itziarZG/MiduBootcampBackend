// DATABASE
const mongoose = require('mongoose')
// const minimist = require('minimist') // para argv
// const args = minimist(process.argv.slice())
// const DTB_USER = args.a
// // const DTB_PASSW = args.b

const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGODB_URI
// // connection
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(console.log('Database connected'))
  .catch((err) => console.log(err))

// const oneItem = new PhoneItem({
//   name: 'tralalá Mongoose',
//   number: '123456789',
// })

// oneItem
//   .save()
//   .then((res) => {
//     console.log(res)
//     mongoose.connection.close()
//   })
//   .catch((err) => console.log(err))

// // Take a look DTB
// PhoneItem.find({}).then((res) => {
//   // All items in DTB
//   console.log(res)
//   mongoose.connection.close()
// })
