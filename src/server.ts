import express from 'express'

const app = express()

app.get('/', (request, response) => {
    return response.json( { siteName: "TODO List" } )
})

app.listen(3333)