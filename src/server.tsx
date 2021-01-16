import express from 'express'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import path from 'path'
import App from './components/App'
import { Html } from './components/Html'
import configureStore from './state/store'
import { Provider } from 'react-redux'

const app = express()

app.use(express.static(path.join(__dirname)))

app.get('*', (_, res) => {

  const state = { name: 'Bro!' }

  const appMarkup: string = renderToString(
    <App state={state} />
  )

  const html: string = renderToStaticMarkup(
    <Html children={appMarkup} scripts={['main.js']} state={state} />
  )

  res.send(html)

})

app.listen(5000, () => console.log('server runnin at 5000'))
