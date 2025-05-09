// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config
import { injectSpeedInsights } from "@vercel/speed-insights"
/* const {
  remarkCodeHike,
} = require("@code-hike/mdx");
*/
import path from "path"
import { themes as prismThemes } from "prism-react-renderer"

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "RunPod Documentation",
  tagline:
    "Globally distributed GPU cloud built for production. Develop, train, and scale AI applications.",
  favicon: "img/favicon.ico",
  url: "https://docs.runpod.io",
  baseUrl: "/",

  organizationName: "runpod",
  projectName: "docs",

  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "warn",
  customFields: {
    runPodAPI: process.env.REACT_APP_RUNPOD_AI_KEY,
  },
  // https://docusaurus.io/blog/releases/3.6
  future: {
    experimental_faster: true,
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsible: true,
          routeBasePath: "",
          editUrl: "https://github.com/runpod/docs/blob/main",
          /* beforeDefaultRemarkPlugins: [
            [remarkCodeHike, { theme: "nord" }],
          ],
          */
        },
        /*
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        */
        theme: {
          customCss: [
            "./src/css/custom.css",
            // require.resolve("@code-hike/mdx/styles.css"),
          ],
        },
      }),
    ],
    /*
    [
      "redocusaurus",
      {
        // Plugin Options for loading OpenAPI files
        debug: Boolean(process.env.DEBUG || process.env.CI),
        config: path.join(__dirname, "redocly.yaml"),
        specs: [
          {
            id: "using-single-yaml",
            spec: "docs/references/spec/openapi.yaml",
          },
        ],
        // Theme Options for modifying how redoc renders them
        theme: {
          // Change with your site colors
          primaryColor: "#1890ff",
        },
      },
    ],
      */
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "dark",
    },
    algolia: {
      appId: "LZTDWL431O",
      apiKey: "579a75d22533b970ddf821f8fd0389d9",
      indexName: "runpod-vercel",
      //  // insights: true,
    },
    image: "img/docusaurus-social-card.png",
    navbar: {
      title: "RunPod",
      logo: {
        alt: "RunPod Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "docsSidebar",
          collapsed: false,
          label: "Documentation",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "tutorialsSidebar",
          collapsed: false,
          label: "Tutorials",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "sdkSidebar",
          collapsed: false,
          label: "SDKs",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "cliSidebar",
          collapsed: false,
          label: "CLI",
        },  
        {
          href: "https://rest.runpod.io/v1/docs",
          label: "API",
          position: "left",
        },
        { href: "https://blog.runpod.io", label: "Blog", position: "left" },
        {
          href: "https://www.runpod.io/console/signup",
          label: "Sign up",
          position: "left",
        },
        {
          href: "https://github.com/runpod",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Overview",
              to: "/overview",
            },
            {
              label: "Tutorials",
              to: "/tutorials/introduction/overview",
            },
          ],
        },
        {
          title: "Community",
          items: [
            /*
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              */
            {
              label: "Discord",
              href: "https://discord.gg/runpod",
            },
            {
              label: "Contact us",
              href: "https://www.runpod.io/contact",
            },
            /*
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
              */
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              href: "https://blog.runpod.io",
            },
            {
              label: "GitHub",
              href: "https://github.com/runpod",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} RunPod`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["docker", "json", "bash"],
    },
    docs: {
      sidebar: {
        hideable: false,
      },
    },
    announcementBar: {
      id: "h200s",
      content:
        'Deploy your workloads on H200s for 1.4x the performance of H100. <a href="https://www.runpod.io/console/deploy?gpu=H200+SXM">Learn more</a>.',
      backgroundColor: "#004a7f",
      textColor: "#ffffff",
      isCloseable: true,
    },
  },

  scripts: [
    {
      src: "https://widget.kapa.ai/kapa-widget.bundle.js",
      "data-website-id": "d8e25089-cadd-4c1c-9010-7e83cd99a2a5",
      "data-project-name": "RunPod",
      "data-project-color": "#070D27",
      "data-project-logo":
        "https://avatars.githubusercontent.com/u/95939477?s=200&v=4",
      async: true,
    },
    {
      src: "https://scripts.simpleanalyticscdn.com/latest.js",
      async: true,
      defer: true,
    },
    {
      src: "https://kit.fontawesome.com/4b9ba14b0f.js",
      crossOrigin: "anonymous",
    },
    // {
    // src: "/scripts/fullstory.js",
    //  async: true,
    //  defer: true,
    /// },
  ],
  plugins: [
    [
      "posthog-docusaurus",
      {
        apiKey: "phc_1ku7R949l2D5wsXgMCBNSRIVRMiAn8FyKFNoJWDCcOb",
        appUrl: "https://observe.runpod.io",
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        createRedirects(existingPath) {
          const redirects = []
          // Redirect from /serverless/workers/vllm/ to /serverless/vllm/
          if (existingPath.startsWith("/serverless/vllm/")) {
            redirects.push(
              existingPath.replace(
                "/serverless/vllm/",
                "/serverless/workers/vllm/"
              )
            )
          }
          // Redirect from /serverless/workers/handlers/ to /serverless/handlers/
          else if (existingPath.startsWith("/serverless/handlers/")) {
            redirects.push(
              existingPath.replace(
                "/serverless/handlers/",
                "/serverless/workers/handlers/"
              )
            )
          }
          // Redirect from /serverless/workers/development/ to /serverless/development/
          else if (existingPath.startsWith("/serverless/development/")) {
            redirects.push(
              existingPath.replace(
                "/serverless/development/",
                "/serverless/workers/development/"
              )
            )
          } else if (existingPath.includes("/serverless/endpoints/")) {
            redirects.push(
              existingPath.replace(
                "/serverless/endpoints/",
                "/serverless/references/"
              )
            )
          } else if (existingPath.includes("/tutorials/serverless/")) {
            redirects.push(
              existingPath.replace(
                "/tutorials/serverless/",
                "/tutorials/serverless/gpu/"
              )
            )
          }
          return redirects
        },

        redirects: [
          {
            to: "/serverless/endpoints/send-requests",
            from: "/serverless/endpoints/get-started",
          },
          {
            to: "/serverless/endpoints/operations",
            from: "/serverless/endpoints/job-operations",
          },
          {
            to: "/references/glossary",
            from: "/glossary",
          },
          {
            to: "/references/billing-information",
            from: "/get-started/billing-information",
          },
          {
            to: "/references/referrals",
            from: "/get-started/referrals",
          },
          {
            to: "/tutorials/introduction/overview",
            from: "/tutorials/overview",
          },
          {
            to: "/tutorials/serverless/run-ollama-inference",
            from: "/tutorials/serverless/cpu/run-ollama-inference",
          },
          // Consolidated handler pages
          {
            to: "/serverless/workers/handler-functions",
            from: "/serverless/handlers/handler-additional-controls",
          },
          {
            to: "/serverless/workers/handler-functions",
            from: "/serverless/handlers/handler-async",
          },
          {
            to: "/serverless/workers/concurrent-handler",
            from: "/serverless/handlers/handler-concurrency",
          },
          {
            to: "/serverless/workers/handler-functions",
            from: "/serverless/handlers/handler-generator",
          },
          {
            to: "/serverless/workers/handler-functions",
            from: "/serverless/workers/handlers/handler-error-handling",
          },
          {
            to: "/serverless/workers/handler-functions",
            from: "/serverless/handlers/overview",
          },
          // Move github integration under workers
          {
            to: "/serverless/workers/github-integration",
            from: "/serverless/github-integration",
          },
          {
            to: "/serverless/workers/custom-worker",
            from: "/serverless/get-started",
          },
          // Redirects for deletions
          {
            to: "/serverless/vllm/overview",
            from: "/serverless/vllm/configurable-endpoints",
          },
          {
            to: "/serverless/vllm/overview",
            from: "/serverless/vllm/environment-variables",
          },
          {
            to: "/serverless/overview",
            from: "/serverless/quick-deploys",
          },
        ],
      },
    ],
  ],
}

export default config
injectSpeedInsights()
