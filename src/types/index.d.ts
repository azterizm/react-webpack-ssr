declare module 'jstoxml'
declare module 'express-robots-txt'
declare module 'connect-fs2'

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

interface Flash {
  success?: string[],
  error?: string[]
}

interface AppState {
  name: string,
  user: User,
  flash: {
    [x: string]: string[]
  }
}
