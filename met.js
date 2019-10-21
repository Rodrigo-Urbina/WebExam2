const request = require('request')

const museum = function (q, callback) {
    const url = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + q

    request({ url: url, json: true }, function (error, response) {
        if (error) {
            callback('Service Unavailable', undefined)
        } else if (response.body == 'false') {
            callback(response.body.Error, undefined)
        } else {
            const data = response.body

            if (data.total == 0) {
                callback('Object Not Found', undefined)
            } else {
                const info = {
                    objectID: data.objectIDs[0]
                }

                callback(undefined, info)
            }
        }
    })
}

const object = function (objectID, callback) {
    //console.log(3)
    //console.log(objectID)
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectID
    //console.log(url)

    request({ url, json: true }, function (error, response) {
        if (error) {
            callback('Service unavailable', undefined)
        }
        else if (response.body == 'false') {
            callback(response.body.Error, undefined)
        }
        else {
            const data = response.body
            //console.log(4)
            //console.log(response.body)
            //console.log(4.5)
            //console.log(data)
            const info = {
                searchTerm: "",
                artist: data.constituents ? data.constituents[0].name : "",
                title: data.title,
                year: data.objectEndDate,
                technique: data.medium,
                metUrl: data.objectURL
            }

            //console.log(info)
            callback(undefined, info)
        }
    })
}

module.exports = {
    museum: museum,
    object: object
}