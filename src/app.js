const experss = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('request');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/weatherApi');
const cors = require('cors');


const app =  experss();
app.use(cors())
const port = process.env.PORT || 3000


const Dirpath = path.join(__dirname,'../public');
const partialPath = path.join(__dirname,'../src/partials');
//const Aboutpath = path.join(__dirname,'../public/about.html');
//console.log(Dirpath);

//app.use(experss.static(Aboutpath));
app.use(experss.static(Dirpath));
app.set('view engine','hbs')
hbs.registerPartials(partialPath);
// app.get('',(req,res)=>{
//     res.send('hello express');
// })

// app.get('/help',(req,res) => {
//     res.send('help page');
// })

// app.get('/about',(req,res) => {
//     res.send('<h1>Title Page!</h1>');
// })

app.get('',(req,res) => {
    res.render('index',{
        title:'dynamic title',
        name:'Aadil'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'aboutwa',
        name:'Aadil'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{

        message:'help you!!!',
        title:'helpwa',
        name:'Aadil'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'please enter a address'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if(error){
             return res.send('errorwa aavi gayo');
        }
        forecast(latitude, longitude, (error, fdata,temp) => {
            
            if(error){
                return res.send('errorwa aavi gayo');
            }
            res.send({
                location:location,
                data:fdata,
                temp:temp,
                address:req.query.address
            });
            //res.send(fdata);
          })
    })
    
})

app.get('/product',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:'please search something'
        })
    }
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res) =>{
    res.render('error',{
        error:'help article not found',
        title:'help article',
        name:'Aadil'
    })
})

app.get('*',(req,res) =>{
    res.render('error',{
        error:'my 404 not found',
        title:'error',
        name:'Aadil'
    })
})




app.listen(port,() =>{
    console.log('server started at ' + port);
})