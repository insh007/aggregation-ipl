const express = require('express')
const mongoose = require('mongoose')
const route = require('./aggregate')

const app = express()
app.use(express.json())

mongoose.connect('mongodb+srv://read_only:OxxrqgRYA1PFs0tf@cluster0.k52jp.mongodb.net/ipl',{
    useNewUrlParser : true       
},mongoose.set('strictQuery', false))
.then(() => console.log('MongoDB is connected....'))
.catch((err) => console.log(err.message))

app.use('/', route)

app.listen(3000, ()=> console.log('app is running on PORT',3000))


/*-------- Another Way ------------ */

// const express = require('express');
// const mongoose = require('mongoose');
// const { setBallsCollection, fetchData } = require('./aggregate');

// const app = express();
// app.use(express.json());

// const router = express.Router();

// mongoose.connect('mongodb+srv://read_only:OxxrqgRYA1PFs0tf@cluster0.k52jp.mongodb.net/ipl', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     readPreference: 'secondaryPreferred'
// })
// .then(() => {
//     console.log('MongoDB is connected....');

//     const db = mongoose.connection.db;
//     const ballsCollection = db.collection('balls');

//     setBallsCollection(ballsCollection);
// })
// .catch((err) => console.log(err.message));

// router.get('/fetchData', fetchData);

// app.use('/', router);

// app.listen(3000, () => console.log('app is running on PORT', 3000));
