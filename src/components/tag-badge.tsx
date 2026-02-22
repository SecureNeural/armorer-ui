interface TagBadgeProps {
  label: string;
  variant?: "default" | "green" | "yellow" | "red" | "blue";
}

const variantStyles: Record<string, string> = {
  default: "bg-zinc-800 text-zinc-400",
  green: "bg-emerald-950 text-emerald-400 border border-emerald-800",
  yellow: "bg-amber-950 text-amber-400 border border-amber-800",
  red: "bg-red-950 text-red-400 border border-red-800",
  blue: "bg-blue-950 text-blue-400 border border-blue-800",
};

export function TagBadge({ label, variant = "default" }: TagBadgeProps) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]}`}>
      {label}
    </span>
  );
}

export function SecurityBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; variant: TagBadgeProps["variant"] }> = {
    verified: { label: "Verified", variant: "green" },
    hardened: { label: "Hardened", variant: "green" },
    community: { label: "Community", variant: "yellow" },
    unverified: { label: "Unverified", variant: "red" },
  };
  const { label, variant } = config[status] || config.unverified;
  return <TagBadge label={label} variant={variant} />;
}

export function RiskBadge({ level }: { level: string }) {
  const config: Record<string, { label: string; variant: TagBadgeProps["variant"] }> = {
    low: { label: "Low Risk", variant: "green" },
    medium: { label: "Medium Risk", variant: "yellow" },
    high: { label: "High Risk", variant: "red" },
    critical: { label: "Critical Risk", variant: "red" },
  };
  const { label, variant } = config[level] || config.high;
  return <TagBadge label={label} variant={variant} />;
}
