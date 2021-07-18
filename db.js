const mongodb = require('mongodb')

let connectionString = 'mongodb+srv://mudasser:mudasser@123@cluster0.s61ft.mongodb.net/ComplexApp?retryWrites=true&w=majority'

mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  module.exports = client.db()
  const app = require('./app')
  app.listen(3000)
})