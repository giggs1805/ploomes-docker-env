const express = require('express');
const path = require('path')

const app = express();

app.set('view-engine', 'ejs')
app.set('views', path.join(__dirname, './src/views'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/src/assets/'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

require('./src/controllers/tasks')(app);
console.log('W E L C O M E   A B O A R D   C A P T A I N\nCurrent time:\n' + Date())

app.get('/', (req, res) => {
    res.render('index.ejs')
  })

app.listen(3000);