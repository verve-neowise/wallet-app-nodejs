import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', routes)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port + "/api/v1");
})