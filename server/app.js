require('dotenv').config();
const express=require('express');
const app=express();
const PORT=process.env.PORT || 5000;
const mongoose=require('mongoose');
const MONGOURI=process.env.MONGOURI;
const cors = require('cors');
const bodyParser = require('body-parser');


require("./models/user");

var path = require('path')
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var serveStatic = require('serve-static')


app.use(serveStatic(path.join(__dirname, 'dist')))
mongoose.connect(MONGOURI,{
    useNewUrlParser : true,
    useUnifiedTopology:true

});
mongoose.connection.on('connected',()=>{
console.log("connected to mongo")
})
mongoose.connection.on('error',(error)=>{
console.log("error while connecting to mongo",error)
})

app.use(require('./routes/auth'));



if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(process.env.PORT || 5000, function(){
    console.log("express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });



