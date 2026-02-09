// PODS

export const TemplateTooltip = () => {
  return (
  <Tooltip headline="Template" tip="A pre-configured Pod setup that bundles a Docker image with hardware specs, network settings, and environment variables for quick deployment." cta="Learn more about templates" href="/pods/templates/overview">template</Tooltip>
  );
};

export const TemplatesTooltip = () => {
  return (
  <Tooltip headline="Templates" tip="Pre-configured Pod setups that bundle Docker images with hardware specs, network settings, and environment variables for quick deployment." cta="Learn more about templates" href="/pods/templates/overview">templates</Tooltip>
  );
};

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

export const RequestsTooltip = () => {
  return (
  <Tooltip headline="Requests" tip="HTTP requests that you send to an endpoint, which can include parameters, payloads, and headers that define what the endpoint should process." cta="Learn more about requests" href="/serverless/endpoints/send-requests">requests</Tooltip>
  );
};

export const JobTooltip = () => {
  return (
  <Tooltip headline="Job" tip="A unit of work submitted to a queue-based Serverless endpoint. Jobs progress through states like IN_QUEUE, RUNNING, and COMPLETED as they are processed by workers." cta="Learn more about job states" href="/serverless/endpoints/job-states">job</Tooltip>
  );
};

export const JobsTooltip = () => {
  return (
  <Tooltip headline="Jobs" tip="Units of work submitted to a queue-based Serverless endpoint. Jobs progress through states like IN_QUEUE, RUNNING, and COMPLETED as they are processed by workers." cta="Learn more about job states" href="/serverless/endpoints/job-states">jobs</Tooltip>
  );
};


export const WorkerTooltip = () => {
  return (
  <Tooltip headline="Worker" tip="A container that runs your application code and processes requests to your Serverless endpoint. Workers are automatically started and stopped by Runpod to handle traffic spikes and ensure optimal resource utilization." cta="Learn more about workers" href="/serverless/workers/overview">worker</Tooltip>
  );
};

export const WorkersTooltip = () => {
  return (
  <Tooltip headline="Worker" tip="A container that runs your application code and processes requests to your Serverless endpoint. Workers are automatically started and stopped by Runpod to handle traffic spikes and ensure optimal resource utilization." cta="Learn more about workers" href="/serverless/workers/overview">worker</Tooltip>
  );
};

export const EndpointTooltip = () => {
  return (
  <Tooltip headline="Endpoint" tip="The access point for your Serverless application. Endpoints provide a URL where users or applications can send requests to run your code." cta="Learn more about endpoints" href="/serverless/endpoints/overview">endpoint</Tooltip>
  );
};

export const QueueBasedEndpointTooltip = () => {
  return (
  <Tooltip headline="Queue-based endpoint" tip="A Serverless endpoint that processes requests sequentially through a managed queue, providing guaranteed execution and automatic retries. Uses handler functions and standard operations like /run and /runsync." cta="Learn more about queue-based endpoints" href="/serverless/endpoints/overview#queue-based-endpoints">queue-based endpoint</Tooltip>
  );
};

export const QueueBasedEndpointsTooltip = () => {
  return (
  <Tooltip headline="Queue-based endpoint" tip="A Serverless endpoint that processes requests sequentially through a managed queue, providing guaranteed execution and automatic retries. Uses handler functions and standard operations like /run and /runsync." cta="Learn more about queue-based endpoints" href="/serverless/endpoints/overview#queue-based-endpoints">queue-based endpoints</Tooltip>
  );
};

export const LoadBalancingEndpointTooltip = () => {
  return (
  <Tooltip headline="Load balancing endpoint" tip="A Serverless endpoint that routes requests directly to worker HTTP servers without queuing, ideal for real-time applications and streaming. Supports custom HTTP frameworks like FastAPI or Flask." cta="Learn more about load balancing endpoints" href="/serverless/load-balancing/overview">load balancing endpoint</Tooltip>
  );
};

export const LoadBalancingEndpointsTooltip = () => {
  return (
  <Tooltip headline="Load balancing endpoints" tip="Serverless endpoints that route requests directly to worker HTTP servers without queuing, ideal for real-time applications and streaming. Support custom HTTP frameworks like FastAPI or Flask." cta="Learn more about load balancing endpoints" href="/serverless/load-balancing/overview">load balancing endpoints</Tooltip>
  );
};

export const VLLMTooltip = () => {
  return (
  <Tooltip headline="vLLM" tip="An open-source inference engine for LLMs that maximizes throughput and minimizes latency when running LLM inference workloads." cta="Learn more about vLLM" href="https://vllm.ai/">vLLM</Tooltip>
  );
};

export const PyTorchTooltip = () => {
  return (
  <Tooltip headline="PyTorch" tip="An open-source machine learning framework for building and training neural networks, widely used for deep learning research and production deployments." cta="Read the PyTorch documentation" href="https://pytorch.org/projects/pytorch/">PyTorch</Tooltip>
  );
};

export const TensorFlowTooltip = () => {
  return (
  <Tooltip headline="TensorFlow" tip="An open-source machine learning framework developed by Google for building and deploying neural networks at scale, widely used for both research and production ML applications." cta="Read the TensorFlow documentation" href="https://www.tensorflow.org/">TensorFlow</Tooltip>
  );
};

export const CUDATooltip = () => {
  return (
  <Tooltip headline="CUDA" tip="NVIDIA's parallel computing platform that enables GPU-accelerated processing for AI/ML workloads. CUDA provides the low-level interface between your code and NVIDIA GPUs." cta="Read the CUDA docs" href="https://developer.nvidia.com/cuda-toolkit">CUDA</Tooltip>
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
  <Tooltip headline="Network volume" tip="Persistent storage that exists independently of your other compute resources. Can be attached to multiple Pods or Serverless endpoints to share data between machines." cta="Learn more about network volumes" href="/storage/network-volumes">network volume</Tooltip>
  );
};


export const VolumeDiskTooltip = () => {
  return (
  <Tooltip headline="Volume disk" tip="Persistent storage that remains available for the duration of the Pod's lease. It functions like a dedicated hard drive, allowing you to store data that needs to be retained even if the Pod is stopped or rebooted. Mounted at /workspace by default." cta="Learn more about volume disks" href="/pods/storage/types">volume disk</Tooltip>
  );
};

export const PodContainerDiskTooltip = () => {
  return (
  <Tooltip headline="Container disk" tip="Temporary storage that exists only while a Pod is running, and is completely lost when the Pod is stopped or deleted." cta="Learn more about container disks" href="/pods/storage/types">container disk</Tooltip>
  );
};

export const WorkerContainerDiskTooltip = () => {
  return (
  <Tooltip headline="Container disk" tip="Temporary storage that exists only while a worker is running, and is completely lost when the worker is stopped or deleted." cta="Learn more about container disks" href="/serverless/storage/overview#container-disk">container disk</Tooltip>
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
  <Tooltip headline="Public Endpoint" tip="A Runpod-managed endpoint providing instant access to state-of-the-art AI models through simple API calls." cta="Learn more about public endpoints" href="/hub/public-endpoints">Public Endpoint</Tooltip>
  );
};

export const InstantClusterTooltip = () => {
  return (
  <Tooltip headline="Instant Cluster" tip="A managed compute cluster with high-speed networking for multi-node distributed workloads like training large AI models." cta="Learn more about Instant Clusters" href="/instant-clusters">Instant Cluster</Tooltip>
  );
};

export const SlurmTooltip = () => {
  return (
  <Tooltip headline="Slurm" tip="An open-source job scheduler for high-performance computing that provides job management, scheduling, and resource allocation across multiple nodes." cta="Learn more about Slurm on Runpod" href="/instant-clusters/slurm">Slurm</Tooltip>
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
  <Tooltip headline="Container" tip="A Docker-based environment that packages your code, dependencies, and runtime into a portable unit that runs consistently across machines."
  >container</Tooltip>
  );
};

export const DataCenterTooltip = () => {
  return (
  <Tooltip headline="Data center" tip="A physical facility where Runpod's GPU, CPU, and storage hardware is located.">data center</Tooltip>
  );
};

export const MachineTooltip = () => {
  return (
  <Tooltip headline="Machine" tip="The physical server hardware within a data center that hosts your compute resources.">machine</Tooltip>
  );
};

export const MachinesTooltip = () => {
  return (
  <Tooltip headline="Machine" tip="The physical server hardware within a data center that hosts your compute resources.">machines</Tooltip>
  );
};

export const PodEnvironmentVariablesTooltip = () => {
  return (
  <Tooltip headline="Environment variables" tip="Key-value pairs that you can set in your Pod template and access within your code, allowing you to configure your application without hardcoding credentials or settings." cta="Learn more about Pod environment variables" href="/pods/templates/environment-variables">environment variables</Tooltip>
  );
};

export const ServerlessEnvironmentVariablesTooltip = () => {
  return (
  <Tooltip headline="Environment variables" tip="Key-value pairs that you can set in your Serverless endpoint configuration and access within your worker code, allowing you to configure your application without hardcoding credentials or settings." cta="Learn more about Serverless environment variables" href="/serverless/development/environment-variables">environment variables</Tooltip>
  );
};

// AI/ML CONCEPTS

export const TrainingTooltip = () => {
  return (
  <Tooltip headline="AI training" tip="The initial phase of AI model development, in which a model analyzes a dataset to learn patterns and relationships.">training</Tooltip>
  );
};

export const TrainTooltip = () => {
  return (
  <Tooltip headline="AI training" tip="The foundational phase of AI development, in which a model analyzes a dataset to learn patterns and relationships. This process is hardware-intensive and can take hours to weeks, depending on the size of the dataset and the complexity of the model.">train</Tooltip>
  );
};

export const FineTuningTooltip = () => {
  return (
  <Tooltip headline="AI fine-tuning" tip="The process of adapting a pre-trained model to a specific task using a smaller, specialized dataset." cta="Learn more about fine-tuning" href="/fine-tune">fine-tuning</Tooltip>
  );
};

export const FineTuneTooltip = () => {
  return (
  <Tooltip headline="AI fine-tuning" tip="The process of adapting a pre-trained model to a specific task using a smaller, specialized dataset. Fine-tuning saves significant time and resources compared to training from scratch.">fine-tune</Tooltip>
  );
};

export const InferenceTooltip = () => {
  return (
  <Tooltip headline="AI inference" tip="The execution phase where a trained model makes predictions on new data. When you prompt a model and it responds, that's inference.">inference</Tooltip>
  );
};

export const ServingTooltip = () => {
  return (
  <Tooltip headline="AI serving" tip="The process of deploying and managing a model for inference. When you deploy a model to a Serverless endpoint, that's serving.">serving</Tooltip>
  );
};
