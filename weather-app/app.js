// const geocode = require('./utils/geocode')
// const forecast = require('./utils/weather')

// const command = process.argv[2]
// if (!command) {
//     console.log('please provide an address!')

// } else {
//     console.log('calculating information...')
//     geocode(command, (error, data) => {
//         if (error) {
//             return console.log(error)
//         }
//         forecast(data.latitude, data.longitude, (error, forecastData) => {
//             if (error) {
//                 return console.log(error)
//             }
//             console.log(data.location)
//             console.log(forecastData)
//         })
//     })
// }


const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')

const command = process.argv[2]
if (!command) {
    console.log('please provide an address!')

} else {
    console.log('calculating information...')
    geocode(command, (error, {
        latitude,
        longitude,
        location
    }) => {
        if (error) {
            return console.log(error)
        }
        forecast(latitude, longitude, (error, {
            desc,
            temp,
            feel
        }) => {
            if (error) {
                return console.log(error)
            }
            console.log(location)
            console.log("The weather is currently " + desc + " the temp is " + temp + " BUT it feels like " + feel)
        })
    })
}