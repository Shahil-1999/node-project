const express = require('express')
const app = express()
const router = require('./router/app.routes')
require('dotenv').config()

const port = 3000 || process.env.PORT

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/api', router)


app.listen(port, (error) => {
    if (error) {
        throw error
    } else {64
        console.log(`Server Connected on ${port}`);
        
    }

})