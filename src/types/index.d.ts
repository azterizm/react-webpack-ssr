declare module 'jstoxml'
declare module 'express-robots-txt'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.svg'

interface SiteMapURL {
  loc: string,
  lastmod: string?,
  [x: string]: any
}
