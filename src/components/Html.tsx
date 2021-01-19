import { FC } from "react";

interface HtmlProps {
  children: string,
  scripts: string[],
  state?: {
    name: string
  }
}

export const Html: FC<HtmlProps> = ({ children, scripts, state }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>SSR App</title>
      <link rel="stylesheet" href="styles.css" type='text/css' />
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

