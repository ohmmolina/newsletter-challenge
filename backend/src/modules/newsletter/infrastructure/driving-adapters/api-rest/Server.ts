import express from 'express'
import * as http from 'http'
import routes from './routes'

export class Server {
  private readonly _port: string
  private readonly _app: express.Express
  private _server: http.Server

  constructor(port: string) {
    this._port = port
    this._app = express()
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: true }))
    this._app.use(routes)
  }

  async listen(): Promise<void> {
    return await new Promise((resolve) => {
      this._server = this._app.listen(this._port, () => {
        console.log(`Server running on port ${this._port}`)
        resolve()
      })
    })
  }

  async stop(): Promise<void> {
    return await new Promise((resolve, reject) => {
      if (this._server !== null) {
        this._server.close((err) => {
          if (err !== null) return reject(err)
          resolve()
        })
      }
      return resolve()
    })
  }
}
