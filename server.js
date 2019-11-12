import express from 'express'
const app = express()
import middlewareConfig from  './config/middleware';
import apiRoutes from  './modules';

middlewareConfig(app)

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

apiRoutes(app);

app.listen(5000, () => console.log('Express app listening on port 5000!'))