import "@code-hike/mdx/dist/index.css"
import Head from "next/head"
import "../global.css"
import "../custom-ch.css"

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Not Stripe Docs | Code Hike Demo</title>
      </Head>
      <nav>
        <div>Not Stripe Docs</div>
      </nav>
      <div className="warning">
        <strong>
          This is a clone of{" "}
          <a href="https://stripe.com/docs/checkout/quickstart">Stripe Docs</a>.
        </strong>{" "}
        <br />
        Made using <a href="https://codehike.org">Code Hike</a>. Code <a href="https://github.com/code-hike/not-stripe">available on GitHub</a>.
      </div>
      <article>
        <div>
          <Component {...pageProps} />
        </div>
      </article>
    </div>
  )
}

export default MyApp