import { FC } from "react";
import { HelmetData } from "react-helmet";
import check from '../assets/check.png'

interface HtmlProps {
  children: string,
  scripts: string[],
  helmet: HelmetData
  state?: {
    name: string
  },
}

export const Html: FC<HtmlProps> = ({ children, scripts, state, helmet }) => (
  <html lang="en">
    <head>
      <link rel="stylesheet" href="styles.css" type='text/css' />
      {helmet.title.toComponent()}
      {helmet.meta.toComponent()}
    </head>
    <body>

      <div id="root" dangerouslySetInnerHTML={{ __html: children }} />

      {/* Support client data */}
      {state &&
        <script dangerouslySetInnerHTML={{ __html: `window.APP_STATE=${JSON.stringify(state)}` }} />
      }

      {/* Render client */}
      {scripts.map((item, i) => <script src={item} key={i} />)}

      {/* Register SW */}
      <script dangerouslySetInnerHTML={{
        __html: `
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
              .then(() => console.log('SW Registered'))
              .catch(() => console.error('SW not supported'))
          })
        }
        `
      }} />

    </body>
  </html>
)

