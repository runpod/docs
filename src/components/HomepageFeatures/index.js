import Heading from "@theme/Heading";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Serverless",
    Svg: require("@site/static/img/home_2.svg").default,
    url: "/serverless/overview", // Add URL here
    description: (
      <>
        <a href="/serverless/overview">
          <b>Serverless</b>
        </a>{" "}
        service provides pay-per-second serverless computing with autoscaling, quick start times, and robust security in
        its Secure Cloud.
      </>
    ),
  },
  {
    title: "Pods",
    Svg: require("@site/static/img/home_1.svg").default,
    url: "/pods/overview", // Add URL here
    description: (
      <>
        <a href="/pods/overview">
          <b>Pods</b>
        </a>{" "}
        offer fast deployment of container-based GPU instances, with Secure Cloud for high reliability and security, and
        Community Cloud for a secure peer-to-peer network.
      </>
    ),
  },
  {
    title: "vLLM",
    Svg: require("@site/static/img/home_3.svg").default,
    url: "/serverless/workers/vllm/overview",
    description: (
      <>
        <a href="/serverless/workers/vllm/overview">
          <b>vLLM Workers</b>
        </a>{" "}
        are blazingly fast OpenAI-compatible serverless endpoints for any LLM.
      </>
    ),
  },
];

function Feature({ Svg, title, description, url }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <a href={url}>
          <Svg className={styles.featureSvg} role="img" />
        </a>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h2">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => <Feature key={idx} {...props} />)}
        </div>
      </div>
    </section>
  );
}
