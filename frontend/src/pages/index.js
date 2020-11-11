import React from "react"
import { Link } from "gatsby"
import Layout from "../layout/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div>
      <h3>Welecome on Landing page </h3>
      <Link to="/">Home</Link>
      <Link to="/catalog">Catalog</Link>
    </div>
  </Layout>
)

export default IndexPage
