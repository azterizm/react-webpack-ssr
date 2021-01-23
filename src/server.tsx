import express from 'express'
import path from 'path'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './components/App'
import { Html } from './components/Html'
import sitemap from './utils/sitemap'
import robots from 'express-robots-txt'
import { Helmet } from 'react-helmet'

const app = express()
const port = process.env.PORT ?? 5000

app.use(express.static(path.join(__dirname)))

app.use(robots({ UserAgent: '*', Disallow: '/profile', Sitemap: 'https://react-webpack-ssr.herokuapp.com/sitemap.xml/' }))

app.get('/sitemap.xml', (_, res) => {
  res.header('Content-Type', 'application/xml')

  const header = `<?xml version="1.0" encoding="UTF-8"?>`

  const result = sitemap(
    [
      {
        loc: '',
        lastmod: new Date().toISOString(),
        'video:video': {
          'video:title': 'Sample',
          'video:description': 'A sample video for test purposes'
        },
        'image:image': {
          'image:title': 'Sample'
        }
      },
      { loc: 'todos', lastmod: new Date().toISOString() },
      { loc: 'counter', lastmod: new Date('2020-02-01 5:00 PM').toISOString() }
    ], header, 'react-webpack-ssr.herokuapp.com'
  )

  console.log(result)
  res.send(result)
})

app.get('*', (req, res) => {
  const state = { name: 'Bro!' }
  const appMarkup: string = renderToString(
    <StaticRouter location={req.url}>
      <App state={state} />
    </StaticRouter>
  )

  const helmet = Helmet.renderStatic()

  const html: string = renderToStaticMarkup(
    <Html children={appMarkup} scripts={['main.js']} state={state} helmet={helmet} />
  )

  res.send(`<!DOCTYPE html> ${html}`)
})

app.listen(port, () => console.log('server runnin at', port))
