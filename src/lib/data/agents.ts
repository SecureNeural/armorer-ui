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
    slug: "crewai",
    name: "CrewAI",
    tagline: "Framework for orchestrating role-playing autonomous AI agents",
    description:
      "CrewAI enables you to create AI agent teams where each agent has a specific role, goal, and backstory. Agents collaborate to accomplish complex tasks. Armorer provides isolated execution environments and monitors inter-agent communication.",
    category: "general",
    tags: ["multi-agent", "role-playing", "collaboration", "framework"],
    securityStatus: "community",
    riskLevel: "medium",
    installCommand: "armorer install crewai",
    runCommand: "armorer run crewai",
    pulls: 19800,
    stars: 33,
    repoUrl: "https://github.com/crewAIInc/crewAI",
    features: [
      "Role-based agent design",
      "Agent collaboration",
      "Task delegation",
      "Tool integration",
      "Process orchestration",
      "Memory and context sharing",
    ],
    securityNotes:
      "Multi-agent system with tool execution. Armorer monitors cross-agent communication and restricts external network calls.",
    updatedAt: "2026-01-28",
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
  {
    slug: "dify",
    name: "Dify",
    tagline: "Open-source LLM app development platform with visual orchestration",
    description:
      "Dify is a comprehensive platform for building LLM-powered applications. It includes visual orchestration, RAG pipeline, agent capabilities, model management, and observability features. Armorer secures deployments with network policies and credential isolation.",
    category: "workflow",
    tags: ["platform", "visual-builder", "rag", "observability", "enterprise"],
    securityStatus: "verified",
    riskLevel: "medium",
    installCommand: "armorer install dify",
    runCommand: "armorer run dify",
    pulls: 26800,
    stars: 40,
    repoUrl: "https://github.com/langgenius/dify",
    features: [
      "Visual workflow orchestration",
      "Built-in RAG engine",
      "Agent mode with tool use",
      "Multi-model support",
      "Observability dashboard",
      "API-first design",
    ],
    securityNotes:
      "Platform with database and API exposure. Armorer enforces network segmentation and credential vault for provider keys.",
    updatedAt: "2026-02-14",
  },
  {
    slug: "n8n",
    name: "n8n",
    tagline: "Workflow automation tool with AI agent capabilities",
    description:
      "n8n is a fair-code workflow automation platform that now includes AI agent nodes. Build complex automations that combine traditional workflows with LLM-powered agents, tool use, and RAG. Armorer provides secure deployment with credential management.",
    category: "workflow",
    tags: ["automation", "workflow", "integrations", "ai-agents", "low-code"],
    securityStatus: "verified",
    riskLevel: "medium",
    installCommand: "armorer install n8n",
    runCommand: "armorer run n8n",
    pulls: 21300,
    stars: 37,
    repoUrl: "https://github.com/n8n-io/n8n",
    features: [
      "400+ integrations",
      "AI agent nodes",
      "Visual workflow builder",
      "Custom code nodes",
      "Webhook triggers",
      "Self-hosted",
    ],
    securityNotes:
      "Automation platform with broad integration access. Armorer gates outbound connections and secures third-party API credentials.",
    updatedAt: "2026-02-11",
  },
  {
    slug: "lobechat",
    name: "LobeChat",
    tagline: "Modern, extensible chatbot framework with plugin ecosystem",
    description:
      "LobeChat is a high-performance chatbot framework supporting multiple AI providers, plugins, and knowledge bases. Features a beautiful UI with multi-modal support. Armorer secures the deployment and manages provider API keys.",
    category: "chatbot",
    tags: ["chatbot", "multi-modal", "plugins", "knowledge-base", "ui"],
    securityStatus: "community",
    riskLevel: "low",
    installCommand: "armorer install lobechat",
    runCommand: "armorer run lobechat",
    pulls: 18200,
    stars: 30,
    repoUrl: "https://github.com/lobehub/lobe-chat",
    features: [
      "Multi-provider support",
      "Plugin marketplace",
      "Knowledge base",
      "Multi-modal (vision, TTS)",
      "Beautiful responsive UI",
      "Self-hosted",
    ],
    securityNotes:
      "Chatbot with plugin execution. Armorer sandboxes plugin execution and manages provider credentials securely.",
    updatedAt: "2026-02-05",
  },
  {
    slug: "metagpt",
    name: "MetaGPT",
    tagline: "Multi-agent framework that simulates a software company",
    description:
      "MetaGPT assigns different roles (Product Manager, Engineer, QA) to AI agents that collaborate to produce software deliverables from a single requirement. Armorer secures the multi-agent execution environment.",
    category: "coding",
    tags: ["multi-agent", "software-engineering", "role-playing", "collaboration"],
    securityStatus: "community",
    riskLevel: "high",
    installCommand: "armorer install metagpt",
    runCommand: "armorer run metagpt",
    pulls: 15600,
    stars: 28,
    repoUrl: "https://github.com/geekan/MetaGPT",
    features: [
      "Role-based agent team",
      "Software lifecycle simulation",
      "Code generation",
      "Architecture design",
      "Quality assurance",
      "Documentation generation",
    ],
    securityNotes:
      "Multi-agent code generation with file system access. Armorer monitors file writes and restricts network egress.",
    updatedAt: "2026-01-20",
  },
  {
    slug: "bolt",
    name: "Bolt.new",
    tagline: "AI-powered full-stack web development agent in the browser",
    description:
      "Bolt.new lets you prompt, run, edit, and deploy full-stack web applications directly in the browser. It combines AI code generation with an integrated development environment. Armorer provides secure self-hosted deployment.",
    category: "coding",
    tags: ["coding", "web-development", "full-stack", "browser-ide"],
    securityStatus: "community",
    riskLevel: "medium",
    installCommand: "armorer install bolt",
    runCommand: "armorer run bolt",
    pulls: 12400,
    stars: 25,
    repoUrl: "https://github.com/stackblitz/bolt.new",
    features: [
      "Full-stack code generation",
      "In-browser IDE",
      "Live preview",
      "npm package management",
      "Multi-file editing",
      "One-click deploy",
    ],
    securityNotes:
      "Code execution environment with npm access. Armorer sandboxes the runtime and restricts package installation to verified sources.",
    updatedAt: "2026-02-01",
  },
  {
    slug: "aider",
    name: "Aider",
    tagline: "AI pair programming in your terminal",
    description:
      "Aider is a command-line tool for AI-assisted coding. It works with your existing git repo, understands your codebase, and makes well-scoped changes with proper git commits. Armorer secures API key management and monitors file operations.",
    category: "coding",
    tags: ["coding", "pair-programming", "terminal", "git", "refactoring"],
    securityStatus: "verified",
    riskLevel: "low",
    installCommand: "armorer install aider",
    runCommand: "armorer run aider",
    pulls: 20100,
    stars: 36,
    repoUrl: "https://github.com/Aider-AI/aider",
    features: [
      "Git-aware editing",
      "Multi-file changes",
      "Auto-commit with messages",
      "Voice coding",
      "Multi-model support",
      "Repo mapping",
    ],
    securityNotes:
      "Terminal coding tool with file system access. Low risk — operates on user-directed changes only. Armorer manages API credentials.",
    updatedAt: "2026-02-16",
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
