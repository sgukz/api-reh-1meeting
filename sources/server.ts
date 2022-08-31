import app from "./app"
require("dotenv").config();
const port = parseInt(process.env.PORT)
const host = process.env.HOST

const server = new app()
    .Start(port)
    .then(port => console.log(`Server in running on http://${host}:${port}/swagger`))
    .catch(error => {
        console.log(`Error message: ${error}`)
        process.exit(1)
    })

export default server