export interface Agent {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: "general" | "coding" | "workflow" | "chatbot" | "research";
  tags: string[];
  securityStatus: "verified" | "hardened" | "community" | "unverified";
  riskLevel: "low" | "medium" | "high" | "critical";
  installCommand: string;
  runCommand: string;
  pulls: number;
  stars: number;
  repoUrl: string;
  dockerImage?: string;
  features: string[];
  securityNotes: string;
  updatedAt: string;
}

export const agents: Agent[] = [
  {
    slug: "openclaw",
    name: "OpenClaw",
    tagline: "Personal AI assistant that automates tasks, browses the web, and writes code",
    description:
      "OpenClaw is an autonomous AI agent that can interact with your computer, browse the internet, write and execute code, manage files, and integrate with messaging platforms. Armorer hardens OpenClaw by sandboxing it in Docker, encrypting credentials via the Vault, monitoring sessions in real-time, and redacting leaked secrets before the agent can read them back.",
    category: "general",
    tags: ["autonomous", "coding", "web-browsing", "tool-use", "messaging"],
    securityStatus: "hardened",
    riskLevel: "high",
    installCommand: "armorer install openclaw",
    runCommand: "armorer run openclaw",
    pulls: 48700,
    stars: 52,
    repoUrl: "https://github.com/openclaw/openclaw",
    dockerImage: "ghcr.io/openclaw/openclaw:main",
    features: [
      "Autonomous task execution",
      "Web browsing and research",
      "Code generation and execution",
      "File management",
      "Messaging platform integration",
      "Terminal UI (TUI)",
    ],
    securityNotes:
      "High-risk agent with RCE capabilities. Armorer enforces Docker sandboxing, real-time session monitoring, credential vault injection, and prompt injection defense via ConversationGuard.",
    updatedAt: "2026-02-15",
  },
  {
    slug: "open-webui",
    name: "Open WebUI",
    tagline: "Self-hosted AI interface for Ollama and OpenAI-compatible models with tools and pipelines",
    description:
      "Open WebUI is a popular self-hosted AI interface that works well with Ollama and OpenAI-compatible endpoints. It offers a polished chat UX, model management, and extensibility while remaining easy to deploy with Docker Compose. Armorer supports installing and running the official Compose stack and helps isolate the deployment.",
    category: "chatbot",
    tags: ["openclaw-alternative", "self-hosted", "ollama", "docker-compose", "ui"],
    securityStatus: "verified",
    riskLevel: "medium",
    installCommand: "armorer install open-webui",
    runCommand: "armorer run open-webui",
    pulls: 92000,
    stars: 125,
    repoUrl: "https://github.com/open-webui/open-webui",
    dockerImage: "ghcr.io/open-webui/open-webui:main",
    features: [
      "Ollama integration out of the box",
      "OpenAI-compatible API support",
      "Self-hosted web UI",
      "Docker Compose deployment",
      "Model and chat management",
      "Extensible pipelines/tools",
    ],
    securityNotes:
      "Web app with model/provider connectivity and optional tool integrations. Armorer isolates the Compose stack and surfaces port/preflight checks before startup.",
    updatedAt: "2026-02-22",
  },
  {
    slug: "librechat",
    name: "LibreChat",
    tagline: "Open-source AI chat platform with agents, MCP, and multi-provider support",
    description:
      "LibreChat is a mature self-hosted AI chat platform that supports multiple providers and advanced capabilities such as agents and MCP integrations. It ships with an official Docker Compose stack for full local deployment. Armorer can install and run the Compose deployment while guiding required configuration file setup.",
    category: "chatbot",
    tags: ["openclaw-alternative", "self-hosted", "agents", "mcp", "docker-compose"],
    securityStatus: "verified",
    riskLevel: "medium",
    installCommand: "armorer install librechat",
    runCommand: "armorer run librechat",
    pulls: 47000,
    stars: 34,
    repoUrl: "https://github.com/danny-avila/LibreChat",
    dockerImage: "ghcr.io/danny-avila/librechat-dev:latest",
    features: [
      "Multi-provider chat",
      "Agents and MCP support",
      "Docker Compose stack",
      "RAG add-ons",
      "Search and indexing services",
      "Self-hosted web UI",
    ],
    securityNotes:
      "Multi-service stack (API, MongoDB, vector DB, search, RAG API). Armorer automates common config file copies and keeps the deployment containerized.",
    updatedAt: "2026-02-22",
  },
  {
    slug: "anythingllm",
    name: "AnythingLLM",
    tagline: "Private AI workspace with chat, RAG, agents, and local knowledge ingestion",
    description:
      "AnythingLLM is a self-hosted AI workspace focused on private knowledge and local deployment. It supports chat, retrieval, and agent-style workflows and has an official Docker Compose deployment in the repository. Armorer supports the official Docker path and adds security warnings for elevated container capabilities.",
    category: "chatbot",
    tags: ["openclaw-alternative", "self-hosted", "rag", "agents", "docker-compose"],
    securityStatus: "community",
    riskLevel: "medium",
    installCommand: "armorer install anythingllm",
    runCommand: "armorer run anythingllm",
    pulls: 63000,
    stars: 55,
    repoUrl: "https://github.com/Mintplex-Labs/anything-llm",
    features: [
      "Private knowledge workspace",
      "Chat + RAG",
      "Agent workflows",
      "Official Docker Compose deployment",
      "Document ingestion",
      "Local-first self-hosting",
    ],
    securityNotes:
      "Official Compose stack requests elevated Linux capability (`SYS_ADMIN`). Armorer surfaces this risk before startup and keeps the deployment isolated.",
    updatedAt: "2026-02-22",
  },
  {
    slug: "influencerpy",
    name: "InfluencerPy",
    tagline: "AI-powered content discovery and curation tool with dashboard and bot workflows",
    description:
      "InfluencerPy is an AI-powered content discovery tool for finding, monitoring, and curating relevant content across sources like RSS, Reddit, Substack, Arxiv, and search. It ships as an interactive CLI packaged in Docker and supports both dashboard-driven review and bot/scheduler workflows. Armorer can install the repository, prepare its config directory, and expose first-class run shortcuts for the dashboard, bot system, and configuration flow.",
    category: "research",
    tags: ["content-discovery", "research", "telegram", "scheduler", "docker-compose"],
    securityStatus: "community",
    riskLevel: "medium",
    installCommand: "armorer install influencerpy",
    runCommand: "armorer run influencerpy",
    pulls: 0,
    stars: 0,
    repoUrl: "https://github.com/cristianleoo/InfluencerPy",
    features: [
      "Interactive dashboard",
      "Telegram bot workflow",
      "Scheduled scouts",
      "RSS, Reddit, Substack, Arxiv, and search sources",
      "AI-assisted content triage",
      "Dockerized local config directory",
    ],
    securityNotes:
      "Interactive Dockerized CLI with API-key and messaging credentials stored in a local config directory. Armorer keeps configuration scoped to `.influencerpy/` and exposes explicit run shortcuts instead of background startup by default.",
    updatedAt: "2026-03-01",
  },
  {
    slug: "autogpt",
    name: "AutoGPT",
    tagline: "Autonomous AI agent framework for building and running custom agents",
    description:
      "AutoGPT by Significant Gravitas is a pioneering open-source framework for autonomous AI agents. It enables creating agents that can chain tasks, use tools, and work towards complex goals with minimal human intervention. Armorer provides sandboxed execution and security oversight for AutoGPT deployments.",
    category: "general",
    tags: ["autonomous", "framework", "tool-use", "goal-driven"],
    securityStatus: "verified",
    riskLevel: "high",
    installCommand: "armorer install autogpt",
    runCommand: "armorer run autogpt",
    pulls: 34200,
    stars: 41,
    repoUrl: "https://github.com/Significant-Gravitas/AutoGPT",
    features: [
      "Goal-driven autonomous execution",
      "Plugin system",
      "Memory management",
      "Multi-step planning",
      "Web browsing",
      "Code execution",
    ],
    securityNotes:
      "Autonomous agent with broad system access. Armorer restricts network egress, monitors file writes, and gates Docker socket access.",
    updatedAt: "2026-02-10",
  },
  {
    slug: "flowise",
    name: "Flowise",
    tagline: "Drag-and-drop visual builder for LLM workflows and chatbots",
    description:
      "Flowise is a low-code/no-code tool for building customized LLM orchestration flows. Build chatbots, RAG pipelines, and AI agents with an intuitive visual interface. Armorer secures the deployment with network isolation and credential management.",
    category: "workflow",
    tags: ["low-code", "visual-builder", "chatbot", "rag", "workflow"],
    securityStatus: "verified",
    riskLevel: "medium",
    installCommand: "armorer install flowise",
    runCommand: "armorer run flowise",
    pulls: 28500,
    stars: 38,
    repoUrl: "https://github.com/FlowiseAI/Flowise",
    features: [
      "Visual flow builder",
      "Pre-built components",
      "RAG pipeline support",
      "Custom tool integration",
      "API endpoints",
      "Chat widget embedding",
    ],
    securityNotes:
      "Web-based UI with API exposure. Armorer enforces port isolation and credential vault for connected LLM provider keys.",
    updatedAt: "2026-02-12",
  },
  {
    slug: "langflow",
    name: "Langflow",
    tagline: "Visual framework for building multi-agent and RAG applications",
    description:
      "Langflow is a visual framework for building AI applications powered by LangChain. Drag-and-drop components to create complex pipelines including agents, RAG, and custom logic. Armorer provides Docker sandboxing and secure credential injection.",
    category: "workflow",
    tags: ["visual-builder", "langchain", "rag", "multi-agent", "workflow"],
    securityStatus: "verified",
    riskLevel: "medium",
    installCommand: "armorer install langflow",
    runCommand: "armorer run langflow",
    pulls: 22100,
    stars: 35,
    repoUrl: "https://github.com/langflow-ai/langflow",
    features: [
      "Visual component editor",
      "LangChain integration",
      "Multi-agent orchestration",
      "Custom Python components",
      "API playground",
      "Prompt management",
    ],
    securityNotes:
      "Python execution environment with API surface. Armorer sandboxes the runtime and secures provider credentials.",
    updatedAt: "2026-02-08",
  },
  {
    slug: "openhands",
    name: "OpenHands",
    tagline: "AI-powered software development agent that writes and runs code",
    description:
      "OpenHands (formerly OpenDevin) is an autonomous AI agent for software engineering tasks. It can write code, run terminal commands, browse the web, and interact with APIs. Armorer sandboxes its powerful capabilities within secure Docker containers.",
    category: "coding",
    tags: ["openclaw-alternative", "coding", "software-engineering", "autonomous", "docker-compose"],
    securityStatus: "community",
    riskLevel: "critical",
    installCommand: "armorer install openhands",
    runCommand: "armorer run openhands",
    pulls: 71000,
    stars: 68,
    repoUrl: "https://github.com/OpenHands/OpenHands",
    features: [
      "Full IDE capabilities",
      "Terminal command execution",
      "Web browsing",
      "Multi-file editing",
      "Git integration",
      "Automated testing",
    ],
    securityNotes:
      "Critical-risk agent with full shell access. Armorer enforces strict Docker sandboxing, command allow-lists, and real-time file monitoring.",
    updatedAt: "2026-02-22",
  },
];

export function getAgent(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export function searchAgents(query: string, category?: string): Agent[] {
  let results = agents;
  if (category && category !== "all") {
    results = results.filter((a) => a.category === category);
  }
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.tagline.toLowerCase().includes(q) ||
        a.tags.some((t) => t.includes(q))
    );
  }
  return results;
}

export const agentCategories = [
  { value: "all", label: "All Agents" },
  { value: "general", label: "General" },
  { value: "coding", label: "Coding" },
  { value: "workflow", label: "Workflow" },
  { value: "chatbot", label: "Chatbot" },
  { value: "research", label: "Research" },
];
