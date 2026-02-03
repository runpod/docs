// PODS
  
export const PodTooltip = () => {
  return (
  <Tooltip headline="Pod" tip="A dedicated GPU or CPU instance for containerized AI/ML workloads." cta="Learn more about Pods" href="/pods/overview">Pod</Tooltip>
  );
};

export const PodsTooltip = () => {
  return (
  <Tooltip headline="Pods" tip="Dedicated GPU or CPU instances for containerized AI/ML workloads." cta="Learn more about Pods" href="/pods/overview">Pods</Tooltip>
  );
};

export const GlobalNetworkingTooltip = () => {
  return (
  <Tooltip headline="Global networking" tip="A secure, private network that connects all your Pods within your Runpod account. This feature enables Pod-to-Pod communication as if they were on the same local network, regardless of their physical location across different data centers." cta="Learn more about global networking" href="/pods/networking">global networking</Tooltip>
  );
};

// SERVERLESS

export const ServerlessTooltip = () => {
  return (
  <Tooltip headline="Serverless" tip="A cloud computing platform that allows you to deploy AI/ML applications without provisioning or managing servers." cta="Learn more about Serverless" href="/serverless/overview">Serverless</Tooltip>
  );
};

export const ColdStartTooltip = () => {
  return (
  <Tooltip headline="Cold start" tip="The time between when an endpoint with no running workers receives a request, and when a worker is fully warmed up and ready to handle the request." cta="Learn more about cold starts" href="/serverless/overview#cold-starts">cold start</Tooltip>
  );
};

export const HandlerFunctionTooltip = () => {
  return (
  <Tooltip headline="Handler function" tip="The core of a Runpod Serverless application. These functions define how a worker processes incoming requests and returns results." cta="Learn more about handler functions" href="/serverless/workers/handler-functions">handler function</Tooltip>
  );
};

export const RequestTooltip = () => {
  return (
  <Tooltip headline="Request" tip="An HTTP request that you send to an endpoint, which can include parameters, payloads, and headers that define what the endpoint should process." cta="Learn more about requests" href="/serverless/endpoints/send-requests">request</Tooltip>
  );
};


export const WorkerTooltip = () => {
  return (
  <Tooltip headline="Worker" tip="A container that runs your application code and processes requests to your Serverless endpoint. Workers are automatically started and stopped by Runpod to handle traffic spikes and ensure optimal resource utilization." cta="Learn more about workers" href="/serverless/workers/overview">worker</Tooltip>
  );
};

export const WorkersTooltip = () => {
  return (
  <Tooltip headline="Workers" tip="The container instances that execute your code when requests arrive at your endpoint. Runpod automatically manages worker lifecycle, starting them when needed and stopping them when idle to optimize resource utilization." cta="Learn more about workers" href="/serverless/workers/overview">workers</Tooltip>
  );
};

export const EndpointTooltip = () => {
  return (
  <Tooltip headline="Endpoint" tip="The access point for your Serverless application. Endpoints provide a URL where users or applications can send requests to run your code." cta="Learn more about endpoints" href="/serverless/endpoints/overview">endpoint</Tooltip>
  );
};

export const VLLMTooltip = () => {
  return (
  <Tooltip headline="vLLM" tip="An open-source inference engine for LLMs that maximizes throughput and minimizes latency when running LLM inference workloads." cta="Learn more about vLLM" href="https://vllm.ai/">vLLM</Tooltip>
  );
};

export const CachedModelsTooltip = () => {
  return (
  <Tooltip headline="Cached models" tip="An optional Serverless feature that starts workers on machines that already have the model cached, reducing cold start times and improving performance." cta="Learn more about cached models" href="/serverless/endpoints/model-caching">cached models</Tooltip>
  );
};

// STORAGE

export const NetworkVolumeTooltip = () => {
  return (
  <Tooltip headline="Network volume" tip="A persistent storage that exists independently of your other compute resources and can be attached to multiple Pods or Serverless endpoints to share data between machines." cta="Learn more about network volumes" href="/storage/network-volumes">network volume</Tooltip>
  );
};

export const ContainerVolumeTooltip = () => {
  return (
  <Tooltip headline="Container volume" tip="A temporary storage that exists only while a worker is running, and is completely lost when the worker is stopped or scaled down." cta="Learn more about container volumes" href="/serverless/storage/container-volumes">container volume</Tooltip>
  );
};

export const VolumeDiskTooltip = () => {
  return (
  <Tooltip headline="Volume disk" tip="Persistent storage that remains available for the duration of the Pod's lease. It functions like a dedicated hard drive, allowing you to store data that needs to be retained even if the Pod is stopped or rebooted. Mounted at /workspace by default." cta="Learn more about volume disks" href="/pods/storage/types">volume disk</Tooltip>
  );
};

export const ContainerDiskTooltip = () => {
  return (
  <Tooltip headline="Container disk" tip="A temporary storage that exists only while a Pod is running, and is completely lost when the Pod is stopped or deleted." cta="Learn more about container disks" href="/pods/storage/types">container disk</Tooltip>
  );
};

// PRODUCTS

export const RunpodHubTooltip = () => {
  return (
  <Tooltip headline="Runpod Hub" tip="A repository for discovering, deploying, and sharing preconfigured AI projects optimized for Runpod." cta="Learn more about Runpod Hub" href="/hub/overview">Runpod Hub</Tooltip>
  );
};

export const PublicEndpointTooltip = () => {
  return (
  <Tooltip headline="Public Endpoint" tip="A Runpod-managed endpoint providing instant access to state-of-the-art AI models through simple API calls." cta="Learn more about public endpoints" href="/serverless/endpoints/public-endpoints">Public Endpoint</Tooltip>
  );
};

export const InstantClusterTooltip = () => {
  return (
  <Tooltip headline="Instant Cluster" tip="A managed compute cluster with high-speed networking for multi-node distributed workloads like training large AI models." cta="Learn more about Instant Clusters" href="/instant-clusters">Instant Cluster</Tooltip>
  );
};

export const RunpodCLITooltip = () => {
  return (
  <Tooltip headline="Runpod CLI" tip="A command-line interface for managing your Runpod resources remotely from your local machine. You can transfer files and data between your local system and Runpod, execute code on remote Pods, and automate Pod deployment workflows." cta="Learn more about Runpod CLI" href="/runpodctl/overview">Runpod CLI</Tooltip>
  );
};

// CONCEPTS

export const ContainerTooltip = () => {
  return (
  <Tooltip headline="Container" tip="A Docker-based environment that packages your code, dependencies, and runtime into a portable unit that runs consistently across machines." cta="Learn more about containers" href="/containers">container</Tooltip>
  );
};

export const DataCenterTooltip = () => {
  return (
  <Tooltip headline="Data center" tip="A physical facility where Runpod's GPU and CPU hardware is located." cta="Learn more about data centers" href="/data-centers">data center</Tooltip>
  );
};

export const MachineTooltip = () => {
  return (
  <Tooltip headline="Machine" tip="The physical server hardware within a data center that hosts your workloads." cta="Learn more about machines" href="/machines">machine</Tooltip>
  );
};

export const EnvironmentVariablesTooltip = () => {
  return (
  <Tooltip headline="Environment variables" tip="Key-value pairs that you can set and access within your code, allowing you to configure your application without hardcoding credentials or settings.">environment variables</Tooltip>
  );
};
