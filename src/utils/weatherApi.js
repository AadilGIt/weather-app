const request = require('request');

const forecast = (longi,lati,callback) => {

    const url = 'http://api.weatherapi.com/v1/current.json?key=fa257e1cef544f2295574200202110&q=' + lati + ',' + longi;
   // console.log(url);

request({ url, json: true }, (error, { body}) => {
    if (error) {
        callback('Unable to connect to weather service!',undefined)
    } else if (body.error) {
        callback('Unable to find location',undefined)
    } else {
        callback(undefined,body.location.name + ' It is currently ' + body.current.temp_c + ' degress out there! at ' + body.location.localtime + ' O,CLock',body.current.temp_c );   
    }
})

}

module.exports = forecast