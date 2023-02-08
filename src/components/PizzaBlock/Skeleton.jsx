import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="120" r="120" />
    <rect x="0" y="261" rx="5" ry="5" width="280" height="33" />
    <rect x="0" y="309" rx="8" ry="8" width="280" height="84" />
    <rect x="130" y="408" rx="25" ry="25" width="150" height="50" />
    <rect x="0" y="420" rx="5" ry="5" width="100" height="30" />
  </ContentLoader>
)

export default Skeleton