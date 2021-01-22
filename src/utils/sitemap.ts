import { toXML } from 'jstoxml'

const sitemap = (urls: SiteMapURL[], header: string, host?: string) => toXML({
  _name: 'urlset',
  _attrs: {
    xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
    'xmlns:video': "http://www.google.com/schemas/sitemap-video/1.1",
    'xmlns:image': "http://www.google.com/schemas/sitemap-image/1.1"
  },
  _content: [urls.map(url => {
    if (!host) return { url }
    if (!host.endsWith('/')) host = host + '/'
    if (!host.startsWith('http')) host = 'https://' + host

    const { loc, ...restUrl } = url
    return { url: { loc: host + loc, ...restUrl } }
  })]
}, { header, indent: ' ' })

export default sitemap
