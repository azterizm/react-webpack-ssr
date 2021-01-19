import express from 'express'
import path from 'path'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './components/App'
import { Html } from './components/Html'

const app = express()

app.use(express.static(path.join(__dirname)))

app.get('/robots.txt', (_, res) => {
  res.send('User-agent: *')
})

app.get('*', (req, res) => {

  const state = { name: 'Bro!' }

  const appMarkup: string = renderToString(
    <StaticRouter location={req.url}>
      <App state={state} />
    </StaticRouter>
  )

  const html: string = renderToStaticMarkup(
    <Html children={appMarkup} scripts={['main.js']} state={state} />
  )

  res.send(html)

})

app.listen(5000, () => console.log('server runnin at 5000'))
