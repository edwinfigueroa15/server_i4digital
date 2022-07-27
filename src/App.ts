import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { config } from 'dotenv'
config({ path: "./.env" })
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

class App {
    private app: Application
    private host: string
    private port: string
    private apiPaths = {
        swagger: '/swagger'
    }
    
    constructor() {
        this.app = express()
        this.host = process.env.HOST || 'http://localhost'
        this.port = process.env.PORT || '4000'

        // METODOS INICIALES
        this.middlewares()
        this.routes()
    }

    listen() {
        this.app.listen(this.port, () => console.log(`SERVER RUNNING ON: ${this.host}:${this.port}/`))
    }

    middlewares(){
        // CORS
        this.app.use(cors())

        // LECTURA DE JSON Y BODY
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        // MORGAN
        this.app.use(morgan('dev'))
    }

    routes() {
        this.app.use(this.apiPaths.swagger, swaggerUi.serve, swaggerUi.setup(swaggerDocument));  
    }
}

export default App