import { FC } from "react";
import { Helmet } from "react-helmet";

interface MetaTagsProps {
  title: string,
  description: string,
  img?: string
}

const MetaTags: FC<MetaTagsProps> = ({ title, description, img }) => (
  <Helmet>
    <title data-react-helmet="true">{'SSR App - ' + title}</title>
    <meta data-react-helmet="true" charSet="UTF-8" />
    <meta data-react-helmet="true" name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta data-react-helmet="true" name="title" content={title} />
    <meta data-react-helmet="true" name="description" content={description} />
    <meta data-react-helmet="true" property="og:type" content="website" />
    <meta data-react-helmet="true" property="og:url" content="https://react-webpack-ssr.herokuapp.com/" />
    <meta data-react-helmet="true" property="og:title" content={title} />
    <meta data-react-helmet="true" property="og:description" content={description} />
    <meta data-react-helmet="true" property="og:image" content={img} />
    <meta data-react-helmet="true" name="twitter:card" content="summary" />
    <meta data-react-helmet="true" name="twitter:url" content="https://react-webpack-ssr.herokuapp.com/" />
    <meta data-react-helmet="true" name="twitter:site" content="@azterizm" />
    <meta data-react-helmet="true" name="twitter:creator" content="@abdielprime" />
    <meta data-react-helmet="true" name="twitter:title" content={title} />
    <meta data-react-helmet="true" name="twitter:description" content={description} />
    <meta data-react-helmet="true" name="twitter:image" content={img} />
  </Helmet>
)

export default MetaTags
