const express = require('express')
const app = express()
const port = process.env.PORT || 1337

const met = require('./met.js')

app.get('/students/:id', function (req, res) {
    res.setHeader('Acces-Control-Allow-Origin', '*')
    if (req.params.id != 'A01281933') {
        return res.send({
            error: 'That is not my student ID'
        })
    }

    const studentID = {
        "id": "A01281933",
        "fullname": "Rodrigo Enrique Urbina De la Cruz",
        "nickname": "ShadowsEmperor",
        "age": 21,
        "profession": "ethical hacker / enrolled BCT student / IT Intern"
    }

    return res.send({
        students: studentID
    })
})

app.get('/met', function (req, res) {
    res.setHeader('Acces-Control-Allow-Origin', '*')

    if (!req.query.search) {
        return res.send({
            error: 'This is not an accepted query for this website'
        })
    }

    //console.log(1)
    //console.log(req.query.search)

    met.museum(req.query.search, function (error, response) {
        //console.log(2)
        //console.log(response)
        //console.log(response.objectID)
        if (error) {
            return res.send({
                error: error
            })
        } else {

            met.object(response.objectID, function (error, info) {
                //console.log(5)
                //console.log(info)
                if (error) {
                    return res.send({
                        error: error
                    })
                } else {
                    info.searchTerm = req.query.search

                    return res.send(info)
                }
            })
        }
    })
})

app.get('/', function (req, res) {
    res.send('This is the web exam template')
})

app.get('*', function (req, res) {
    res.send({
        error: 'This route does not exists'
    })
})

app.listen(port, function () {
    console.log('This app is up and running')
})