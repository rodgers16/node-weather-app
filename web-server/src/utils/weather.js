const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c37aa5b1febca0c84c6af51cdc1087f8&query=' + long + ',' + lat + '&units=f'
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        console.log(body)
        if (error) {
            callback('unable to connect to weather services' + body.error, undefined)
        } else if (body.error) {
            callback('unable to find location' + body.error.code, undefined)
        } else {
            callback(undefined, {
                desc: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feel: body.current.feelslike,
                location: body.location.name

            })
        }

    })


}

module.exports = forecast