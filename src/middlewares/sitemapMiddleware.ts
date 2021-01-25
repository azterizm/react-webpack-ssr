import { Request, Response } from "express"
import sitemap from "../utils/sitemap"

const siteMapHandler = (_: Request, res: Response) => {
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
}

export default siteMapHandler
