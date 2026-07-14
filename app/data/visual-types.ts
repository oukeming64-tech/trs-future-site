export type LifecycleModelId =
  | "sensor-array"
  | "governance-vault"
  | "semantic-neuron"
  | "agent-router";

export type ProductModelId =
  | "sentiment-radar"
  | "data-cloud"
  | "policy-stack"
  | "industry-constellation"
  | "vector-vault"
  | "fusion-web"
  | "foundation-model"
  | "ai-workbench"
  | "knowledge-graph"
  | "semantic-wave"
  | "vision-aperture"
  | "dialogue-agent"
  | "isolation-gate"
  | "one-way-tunnel"
  | "video-packet"
  | "secure-bridge"
  | "operations-orbit"
  | "audit-scanner"
  | "risk-shield"
  | "market-stream"
  | "intel-telescope"
  | "search-lens"
  | "dashboard-cubes"
  | "cloud-cluster";

export type IndustryModelId =
  | "civic-tower"
  | "finance-engine"
  | "media-broadcast"
  | "safety-command"
  | "enterprise-twin"
  | "patent-balance"
  | "publishing-knowledge";

export type Mini3DModelId =
  | LifecycleModelId
  | ProductModelId
  | IndustryModelId;

export type Mini3DVisual = {
  model: Mini3DModelId;
  label: string;
  accent?: string;
};
