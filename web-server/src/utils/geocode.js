const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1IjoicGFybXlzeXN0ZW1zNHB0IiwiYSI6ImNrbDcxaGRxMDAyc3kycG12YXB3MjR0Zm0ifQ.YD5Oy2V55P3eYoxhqt0-Eg&limit=1'
    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            console.log(error)
            callback('Unable to connect to location services')
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search')
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name

            })

        }
    })
}

module.exports = geocode