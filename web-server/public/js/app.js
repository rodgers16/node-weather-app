// const puzz = fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         // console.log(data)
//     })
// })


const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('.p1')
const messageTwo = document.querySelector('.p2')
const messageThree = document.querySelector('.p3')
const messageFour = document.querySelector('.p4')

weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault()
     messageOne.textContent ='Loading...'
    const location = search.value
    if (!location) {
        console.log('you must provide address')
    } else {
        const url = 'http://localhost:3000/weather?address=' + location + ''
        const getWeather = fetch(url).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageFour.textContent = (data.error)
                } else {

                    messageOne.textContent = ('The weather for: ' + data.location)
                    messageTwo.textContent = ('Temperature: ' + data.temp)
                    messageThree.textContent = ('Forecast: ' + data.desc)
                }
            })
        })
    }
})