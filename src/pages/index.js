import React from 'react';
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Layout from "@theme/Layout";
import clsx from "clsx";

import Heading from "@theme/Heading";
import styles from "./index.module.css";

const StatsList = [
  { value: "99.99%", label: "guaranteed uptime" },
  { value: "10PB+", label: "network storage" },
  { value: "6.8B+", label: "requests" },
  { value: "250ms", label: "cold start time" }
];

const ActionCards = [
  {
    title: "Deploy a GPU Pod",
    description: "Spin up a container-based GPU Pod in seconds and start building immediately.",
    icon: "rocket",
    steps: [
      "Create a RunPod account",
      "Select your desired GPU type",
      "Choose a template or custom image",
      "Deploy and connect to your Pod"
    ],
    cta: "Deploy a Pod",
    url: "/pods/manage-pods",
    color: "purple"
  },
  {
    title: "Fine-tune a Model",
    description: "Access powerful GPUs to fine-tune large language models with your custom data.",
    icon: "sliders",
    steps: [
      "Deploy a Pod with required GPUs",
      "Prepare your training data",
      "Set up your fine-tuning environment",
      "Run the fine-tuning process"
    ],
    cta: "Start Fine-tuning",
    url: "/fine-tune/",
    color: "purple"
  },
  {
    title: "Create Serverless Endpoint",
    description: "Deploy models as auto-scaling serverless endpoints with sub-250ms cold start times.",
    icon: "bolt",
    steps: [
      "Create your containerized application",
      "Configure your serverless template",
      "Deploy the endpoint",
      "Make API requests to your endpoint"
    ],
    cta: "Create Endpoint",
    url: "/serverless/quick-deploys",
    color: "purple"
  },
  {
    title: "Deploy vLLM Endpoint",
    description: "Create lightning-fast OpenAI-compatible endpoints for any large language model.",
    icon: "bolt-lightning",
    steps: [
      "Choose from available vLLM models",
      "Configure your endpoint parameters",
      "Deploy the vLLM worker",
      "Make inference requests via API"
    ],
    cta: "Deploy vLLM",
    url: "/serverless/workers/vllm/get-started",
    color: "purple"
  },
  {
    title: "Launch Instant Cluster",
    description: "Create multi-GPU clusters that scale from 2 to 50+ GPUs with high-speed interconnects.",
    icon: "network-wired",
    steps: [
      "Define your cluster requirements",
      "Select GPU types and count",
      "Configure networking options",
      "Launch your instant cluster"
    ],
    cta: "Create Cluster",
    url: "/instant-clusters/",
    color: "purple"
  },
  {
    title: "Use RunPod API",
    description: "Integrate RunPod's capabilities into your applications with our powerful REST API.",
    icon: "code",
    steps: [
      "Generate API keys",
      "Explore API documentation",
      "Test API endpoints",
      "Integrate with your application"
    ],
    cta: "View API Docs",
    url: "https://rest.runpod.io/v1/docs",
    color: "purple"
  }
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - AI Cloud Platform`}
      description="RunPod enables you to train, fine-tune, and deploy AI models in the cloud"
    >
      <main>
        <section className={styles.mainSection}>
          <div className="container">
            <div className={styles.heroContent}>
              <Heading as="h1" className={styles.heroTitle}>
                All in one AI cloud
              </Heading>
              <p className={styles.heroSubtitle}>
                Train, fine-tune, and deploy AI models with RunPod's globally distributed GPU infrastructure
              </p>
              <div className={styles.buttons}>
                <Link
                  className={clsx("button", styles.primaryButton)}
                  to="https://www.runpod.io/console/signup"
                >
                  Sign up
                </Link>
              </div>
            </div>
            
            <div className={styles.actionHeader}>
              <p>Choose an action below to get started with RunPod</p>
            </div>
            
            <div className={styles.actionCardsContainer}>
              {ActionCards.map((card, index) => (
                <Link key={index} to={card.url} className={styles.cardLink}>
                  <div className={`${styles.actionCard} ${styles[`actionCard-${card.color}`]}`}>
                    <div className={styles.actionCardHeader}>
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                    <div className={styles.actionSteps}>
                      <div className={styles.stepsList}>
                        {card.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className={styles.step}>
                            <div className={styles.stepNumber}>{stepIndex + 1}</div>
                            <div className={styles.stepText}>{step}</div>
                          </div>
                        ))}
                      </div>
                      <div className={styles.actionCta}>
                        {card.cta} <i className="fa-solid fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className={styles.statsContainer}>
              {StatsList.map((stat, idx) => (
                <div key={idx} className={styles.statsItem}>
                  <div className={styles.statsValue}>{stat.value}</div>
                  <div className={styles.statsLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
