import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Layout from "@theme/Layout";
import clsx from "clsx";

import Heading from "@theme/Heading";
import styles from "./index.module.css";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useReferrer from "@site/src/hooks/useReferrer";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h2" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={clsx(
              "button button--secondary button--lg",
              styles.customButton
            )}
            to="/get-started/"
          >
            Get started with RunPod
          </Link>
          <Link
            className={clsx(
              "button button--secondary button--lg",
              styles.customButton
            )}
            to="https://www.runpod.io/console/signup"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="RunPod enables you to run your workloads on GPUs in the Cloud <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <BrowserOnly>
        {() => {
          useReferrer();
          return null;
        }}
      </BrowserOnly>
    </Layout>
  );
}
