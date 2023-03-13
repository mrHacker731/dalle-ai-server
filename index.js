const express = require('express');
const cors = require('cors');
const connectDB = require('./mongodb/connectDB');
const postRouter = require("./routes/postRoute");
const dalleRouter = require("./routes/dalleRoute");
require("dotenv").config();

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cors());

//routes
app.use('/api/v1/post',postRouter);
app.use('/api/v1/dalle',dalleRouter);

app.get('/',(req,res)=>{
    res.send('Hello World');
});
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT} `);
})