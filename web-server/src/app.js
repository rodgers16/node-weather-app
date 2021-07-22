const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')


const publicDir = path.join(__dirname, '../public')
app.set('view engine', 'hbs')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views', viewsPath)
// app.set('partials', partialsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

// app.get('/', (req, res) => {
//     res.send({
//         name: 'patrick',
//         age: 29
//     })
// })

//route
app.get('', (req, res) => {
    //render template
    //second argument is an object which contains all the values you want the view to access
    res.render('index', {
        title: 'weather app',
        name: 'Patrick'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'patrick'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'my help page',
        name: 'patrick',
        helpMessage: 'I am here to help you'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!req.query.address) {
        return res.send('error you must provide an address')
    } else {

        console.log('calculating information...')
        geocode(address, (error, {
            latitude,
            longitude,
            location
        } = {}) => {
            if (error) {
                return console.log(error)
            }
            forecast(latitude, longitude, (error, {
                desc,
                temp,
                feel,
                location
            }) => {
                if (error) {
                    return console.log(error)
                }
                res.send({
                    temp: temp,
                    feel: feel,
                    desc: desc,
                    location: location
                })
            })
        })
    }
})

// app.get('/weather', (req, res) => {
//     res.send([{
//         temp: 23,
//         feel: 25,
//         desc: 'cloudy'
//     }, {
//         location: 'pittsburgh',
//         lat: 23,
//         long: 43

//     }])
// })
app.get('/help/*', (req, res) => {

    res.render('error', {
        title: '404 PAGE!',
        message: 'Error Article not found!',
        name: 'patrick'
    })

})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 PAGE!',
        message: 'PAGE not found!',
        name: 'patrick'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})