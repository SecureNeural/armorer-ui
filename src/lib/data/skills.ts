export interface Skill {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: "system" | "search" | "data" | "communication" | "development" | "ai";
  tags: string[];
  verified: boolean;
  command: string;
  args: string[];
  env?: Record<string, string>;
  injectExample: string;
  compatibleAgents: string[];
  pulls: number;
  updatedAt: string;
}

export const skills: Skill[] = [
  {
    slug: "filesystem",
    name: "Filesystem",
    tagline: "Safe, sandboxed access to local directories via MCP",
    description:
      "Provides controlled file system access through the Model Context Protocol. Agents can read and write files within designated directories only. Armorer enforces path restrictions to prevent directory traversal attacks.",
    category: "system",
    tags: ["file-access", "read", "write", "sandboxed"],
    verified: true,
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/Users/Shared"],
    injectExample: "armorer inject openclaw filesystem",
    compatibleAgents: ["openclaw", "autogpt", "crewai", "openhands"],
    pulls: 15400,
    updatedAt: "2026-02-10",
  },
  {
    slug: "brave-search",
    name: "Brave Search",
    tagline: "Privacy-focused web search capability for agents",
    description:
      "Enables agents to search the web using the Brave Search API. Returns structured results with snippets, URLs, and metadata. Requires a Brave Search API key managed securely through the Armorer Credential Vault.",
    category: "search",
    tags: ["web-search", "privacy", "api"],
    verified: true,
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-brave-search"],
    env: { BRAVE_API_KEY: "${BRAVE_API_KEY}" },
    injectExample: "armorer inject openclaw brave-search",
    compatibleAgents: ["openclaw", "autogpt", "crewai", "metagpt"],
    pulls: 12800,
    updatedAt: "2026-02-08",
  },
  {
    slug: "git",
    name: "Git",
    tagline: "Git repository operations for AI agents",
    description:
      "Provides Git operations (clone, commit, push, pull, diff, log) through MCP. Agents can manage repositories and track changes. Armorer restricts operations to designated repositories only.",
    category: "development",
    tags: ["version-control", "repository", "collaboration"],
    verified: true,
    command: "docker",
    args: ["run", "-i", "--rm", "mcp/git"],
    injectExample: "armorer inject openclaw git",
    compatibleAgents: ["openclaw", "autogpt", "openhands", "aider"],
    pulls: 11200,
    updatedAt: "2026-02-05",
  },
  {
    slug: "github",
    name: "GitHub",
    tagline: "Full GitHub API access — issues, PRs, repos, and actions",
    description:
      "Enables agents to interact with GitHub repositories, create issues, manage pull requests, trigger workflows, and more. Credentials are managed through the Armorer Vault, never stored in plain text.",
    category: "development",
    tags: ["github", "issues", "pull-requests", "ci-cd"],
    verified: true,
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-github"],
    env: { GITHUB_PERSONAL_ACCESS_TOKEN: "${GITHUB_TOKEN}" },
    injectExample: "armorer inject openclaw github",
    compatibleAgents: ["openclaw", "autogpt", "openhands", "aider", "metagpt"],
    pulls: 9800,
    updatedAt: "2026-02-12",
  },
  {
    slug: "postgres",
    name: "PostgreSQL",
    tagline: "Read-only database access for data-driven agents",
    description:
      "Provides read-only PostgreSQL database access via MCP. Agents can query databases to answer questions, generate reports, and analyze data. Write access is explicitly disabled for safety.",
    category: "data",
    tags: ["database", "sql", "read-only", "analytics"],
    verified: true,
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-postgres"],
    env: { POSTGRES_CONNECTION_STRING: "${DATABASE_URL}" },
    injectExample: "armorer inject openclaw postgres",
    compatibleAgents: ["openclaw", "autogpt", "dify", "n8n"],
    pulls: 8400,
    updatedAt: "2026-01-30",
  },
  {
    slug: "sqlite",
    name: "SQLite",
    tagline: "Local database operations for lightweight data tasks",
    description:
      "Provides SQLite database access through MCP. Perfect for local data analysis, prototyping, and lightweight data storage. Armorer restricts database file paths to designated directories.",
    category: "data",
    tags: ["database", "sql", "local", "lightweight"],
    verified: true,
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-sqlite"],
    injectExample: "armorer inject openclaw sqlite",
    compatibleAgents: ["openclaw", "autogpt", "crewai"],
    pulls: 6200,
    updatedAt: "2026-01-25",
  },
  {
    slug: "slack",
    name: "Slack",
    tagline: "Send messages and interact with Slack workspaces",
    description:
      "Enables agents to send messages, read channels, and interact with Slack workspaces. Useful for notification workflows, team updates, and collaborative AI assistants.",
    category: "communication",
    tags: ["messaging", "notifications", "team", "workspace"],
    verified: true,
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-slack"],
    env: { SLACK_BOT_TOKEN: "${SLACK_BOT_TOKEN}" },
    injectExample: "armorer inject openclaw slack",
    compatibleAgents: ["openclaw", "autogpt", "n8n", "dify"],
    pulls: 7100,
    updatedAt: "2026-02-03",
  },
  {
    slug: "memory",
    name: "Memory",
    tagline: "Persistent knowledge graph memory for agents",
    description:
      "Provides a persistent memory layer using a knowledge graph. Agents can store and retrieve facts, relationships, and context across sessions. Data is stored locally and managed by Armorer.",
    category: "ai",
    tags: ["memory", "knowledge-graph", "persistence", "context"],
    verified: true,
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-memory"],
    injectExample: "armorer inject openclaw memory",
    compatibleAgents: ["openclaw", "autogpt", "crewai", "metagpt"],
    pulls: 9400,
    updatedAt: "2026-02-07",
  },
  {
    slug: "puppeteer",
    name: "Puppeteer",
    tagline: "Browser automation and web scraping for agents",
    description:
      "Provides headless browser automation via Puppeteer. Agents can navigate web pages, fill forms, take screenshots, and extract data. Armorer runs the browser in an isolated Docker container.",
    category: "system",
    tags: ["browser", "automation", "scraping", "screenshots"],
    verified: true,
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-puppeteer"],
    injectExample: "armorer inject openclaw puppeteer",
    compatibleAgents: ["openclaw", "autogpt", "openhands"],
    pulls: 7800,
    updatedAt: "2026-02-01",
  },
  {
    slug: "fetch",
    name: "Fetch",
    tagline: "HTTP requests with content extraction and conversion",
    description:
      "Enables agents to make HTTP requests and extract readable content from web pages. Converts HTML to markdown for easy consumption. Armorer restricts target domains via NetworkPolicy.",
    category: "search",
    tags: ["http", "web", "content-extraction", "markdown"],
    verified: true,
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-fetch"],
    injectExample: "armorer inject openclaw fetch",
    compatibleAgents: ["openclaw", "autogpt", "crewai", "openhands"],
    pulls: 6900,
    updatedAt: "2026-01-28",
  },
  {
    slug: "sequential-thinking",
    name: "Sequential Thinking",
    tagline: "Structured reasoning and chain-of-thought for complex problems",
    description:
      "Provides a structured thinking framework that helps agents break down complex problems into sequential steps. Improves reasoning quality for multi-step tasks like debugging, analysis, and planning.",
    category: "ai",
    tags: ["reasoning", "chain-of-thought", "planning", "analysis"],
    verified: true,
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-sequential-thinking"],
    injectExample: "armorer inject openclaw sequential-thinking",
    compatibleAgents: ["openclaw", "autogpt", "crewai", "metagpt", "openhands"],
    pulls: 5600,
    updatedAt: "2026-01-22",
  },
  {
    slug: "google-maps",
    name: "Google Maps",
    tagline: "Location search, directions, and place details",
    description:
      "Provides Google Maps API access for location-based queries. Agents can search for places, get directions, and retrieve business details. API key managed via the Armorer Credential Vault.",
    category: "search",
    tags: ["maps", "location", "directions", "places"],
    verified: true,
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-google-maps"],
    env: { GOOGLE_MAPS_API_KEY: "${GOOGLE_MAPS_API_KEY}" },
    injectExample: "armorer inject openclaw google-maps",
    compatibleAgents: ["openclaw", "autogpt", "n8n"],
    pulls: 4300,
    updatedAt: "2026-01-18",
  },
];

export function getSkill(slug: string): Skill | undefined {
  return skills.find((s) => s.slug === slug);
}

export function searchSkills(query: string, category?: string): Skill[] {
  let results = skills;
  if (category && category !== "all") {
    results = results.filter((s) => s.category === category);
  }
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.tags.some((t) => t.includes(q))
    );
  }
  return results;
}

export const skillCategories = [
  { value: "all", label: "All Skills" },
  { value: "system", label: "System" },
  { value: "search", label: "Search" },
  { value: "data", label: "Data" },
  { value: "communication", label: "Communication" },
  { value: "development", label: "Development" },
  { value: "ai", label: "AI" },
];
