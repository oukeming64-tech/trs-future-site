import type { Mini3DModelId } from "../../data/visual-types";

export type PrimitiveKind =
  | "beam"
  | "column"
  | "cone"
  | "cube"
  | "disc"
  | "glyph"
  | "node"
  | "orb"
  | "panel"
  | "ring"
  | "shield"
  | "stack"
  | "wave";

export type PrimitiveMotion =
  | "breathe"
  | "counterspin"
  | "float"
  | "hinge"
  | "orbit"
  | "scan"
  | "spin"
  | "stream";

export type PrimitiveTone = "accent" | "cool" | "muted" | "signal" | "white";

export type PrimitiveSpec = {
  kind: PrimitiveKind;
  x: number;
  y: number;
  z?: number;
  width?: number;
  height?: number;
  rx?: number;
  ry?: number;
  rz?: number;
  motion?: PrimitiveMotion;
  tone?: PrimitiveTone;
  delay?: number;
  duration?: number;
  text?: string;
  count?: number;
};

type ModelBlueprint = {
  code: string;
  primitives: PrimitiveSpec[];
};

const p = (
  kind: PrimitiveKind,
  x: number,
  y: number,
  width: number,
  height = width,
  options: Omit<PrimitiveSpec, "kind" | "x" | "y" | "width" | "height"> = {},
): PrimitiveSpec => ({ kind, x, y, width, height, ...options });

const ring = (
  size: number,
  rx: number,
  rz: number,
  motion: PrimitiveMotion = "spin",
  x = 50,
  y = 50,
  z = 0,
  delay = 0,
): PrimitiveSpec =>
  p("ring", x, y, size, size, {
    rx,
    rz,
    z,
    motion,
    delay,
    duration: motion === "counterspin" ? 11 : 9,
  });

const node = (
  x: number,
  y: number,
  z = 20,
  tone: PrimitiveTone = "accent",
  delay = 0,
): PrimitiveSpec =>
  p("node", x, y, 7, 7, {
    z,
    tone,
    motion: "breathe",
    delay,
    duration: 2.4,
  });

const beam = (
  x: number,
  y: number,
  width: number,
  rz: number,
  z = 0,
  motion: PrimitiveMotion = "stream",
  tone: PrimitiveTone = "accent",
  delay = 0,
): PrimitiveSpec =>
  p("beam", x, y, width, 2, {
    z,
    rz,
    motion,
    tone,
    delay,
    duration: 3.8,
  });

const panel = (
  x: number,
  y: number,
  width: number,
  height: number,
  rx: number,
  ry: number,
  rz = 0,
  z = 0,
  delay = 0,
): PrimitiveSpec =>
  p("panel", x, y, width, height, {
    rx,
    ry,
    rz,
    z,
    motion: "float",
    delay,
    duration: 5,
  });

const cube = (
  x: number,
  y: number,
  size: number,
  rx: number,
  ry: number,
  rz = 0,
  z = 10,
  delay = 0,
): PrimitiveSpec =>
  p("cube", x, y, size, size, {
    rx,
    ry,
    rz,
    z,
    motion: "orbit",
    delay,
    duration: 8,
  });

const glyph = (
  text: string,
  x: number,
  y: number,
  width: number,
  z = 30,
  tone: PrimitiveTone = "white",
): PrimitiveSpec =>
  p("glyph", x, y, width, Math.max(24, width * 0.34), {
    z,
    tone,
    text,
    motion: "breathe",
    duration: 3,
  });

const stack = (
  x: number,
  y: number,
  width: number,
  height: number,
  count: number,
  rx = 62,
  rz = -8,
): PrimitiveSpec =>
  p("stack", x, y, width, height, {
    rx,
    rz,
    count,
    motion: "hinge",
    duration: 6,
  });

const orb = (
  x: number,
  y: number,
  size: number,
  z = 20,
  tone: PrimitiveTone = "cool",
  delay = 0,
): PrimitiveSpec =>
  p("orb", x, y, size, size, {
    z,
    tone,
    delay,
    motion: "breathe",
    duration: 3.4,
  });

export const MINI_3D_BLUEPRINTS: Record<Mini3DModelId, ModelBlueprint> = {
  "sensor-array": {
    code: "OMNI / SIGNAL",
    primitives: [
      ring(72, 70, -8),
      ring(48, 62, 24, "counterspin", 50, 51, 12),
      p("cone", 50, 51, 44, 66, { rx: 66, rz: -8, z: -8, motion: "scan", duration: 4.2 }),
      beam(50, 50, 76, -22, 26, "scan"),
      node(25, 38, 34, "signal"),
      node(70, 28, 20, "accent", 0.4),
      node(76, 66, 42, "white", 0.8),
      node(35, 73, 12, "accent", 1.2),
      orb(50, 50, 18, 38, "cool"),
    ],
  },
  "governance-vault": {
    code: "TRUST / VAULT",
    primitives: [
      stack(50, 58, 58, 30, 5),
      cube(50, 43, 31, -20, 38, 8, 36),
      ring(64, 72, 8, "counterspin", 50, 57, -12),
      beam(50, 64, 68, 0, 14, "stream", "signal"),
      node(24, 63, 18, "white"),
      node(76, 63, 18, "white", 0.6),
      glyph("01", 50, 43, 26, 62, "accent"),
    ],
  },
  "semantic-neuron": {
    code: "SEMANTIC / GRAPH",
    primitives: [
      orb(50, 50, 25, 44, "cool"),
      ring(62, 58, -18),
      ring(76, 76, 22, "counterspin", 50, 50, -8),
      beam(50, 50, 58, 18, 18),
      beam(50, 50, 60, 112, 12, "stream", "cool", 0.5),
      node(23, 41, 30),
      node(71, 33, 46, "white", 0.3),
      node(77, 67, 22, "signal", 0.7),
      node(34, 72, 52, "cool", 1),
      glyph("NLP", 50, 50, 32, 72, "white"),
    ],
  },
  "agent-router": {
    code: "AGENT / ROUTE",
    primitives: [
      cube(50, 50, 27, -18, 38, 6, 48),
      ring(70, 69, 0),
      beam(50, 50, 76, 0, 18),
      beam(50, 50, 70, 45, 14, "stream", "cool", 0.3),
      beam(50, 50, 70, 90, 10, "stream", "signal", 0.6),
      beam(50, 50, 70, 135, 6, "stream", "muted", 0.9),
      node(16, 50, 20, "accent"),
      node(74, 28, 30, "cool", 0.4),
      node(82, 50, 20, "signal", 0.8),
      node(31, 72, 34, "white", 1.2),
      glyph("RUN", 50, 50, 30, 76, "white"),
    ],
  },
  "sentiment-radar": {
    code: "RADAR / PULSE",
    primitives: [
      p("disc", 50, 54, 58, 58, { rx: 72, rz: -8, motion: "counterspin", duration: 10 }),
      ring(76, 74, -8),
      ring(42, 70, 18, "counterspin", 50, 54, 18),
      beam(50, 54, 72, -22, 34, "scan"),
      node(29, 42, 38, "signal"),
      node(68, 35, 26, "white", 0.6),
      node(75, 66, 44, "accent", 1),
    ],
  },
  "data-cloud": {
    code: "DATA / CLOUD",
    primitives: [
      orb(40, 53, 30, 34),
      orb(56, 43, 38, 26, "accent", 0.3),
      orb(67, 56, 25, 42, "cool", 0.7),
      ring(72, 68, 16),
      panel(50, 70, 66, 20, 68, 0, -2, -10),
      beam(50, 70, 64, 0, 12, "stream", "white"),
      glyph("5K", 52, 52, 28, 76, "white"),
    ],
  },
  "policy-stack": {
    code: "POLICY / STACK",
    primitives: [
      stack(50, 56, 65, 34, 6, 64, -8),
      panel(50, 42, 48, 28, 62, 0, -6, 38),
      ring(72, 74, 12, "counterspin", 50, 57, -16),
      beam(50, 63, 58, 0, 28, "scan", "signal"),
      glyph("§", 50, 44, 22, 68, "white"),
    ],
  },
  "industry-constellation": {
    code: "INDUSTRY / MAP",
    primitives: [
      orb(50, 50, 22, 44),
      ring(76, 62, -16),
      ring(54, 78, 28, "counterspin", 50, 50, 8),
      beam(50, 50, 62, 26, 20),
      beam(50, 50, 68, 116, 12, "stream", "cool"),
      node(22, 38, 35, "signal"),
      node(71, 31, 24, "white", 0.3),
      node(78, 62, 40, "accent", 0.6),
      node(35, 73, 50, "cool", 0.9),
    ],
  },
  "vector-vault": {
    code: "VECTOR / INDEX",
    primitives: [
      cube(38, 53, 25, -16, 36, 0, 28),
      cube(62, 46, 31, -24, 42, 8, 48, 0.5),
      cube(55, 66, 20, -10, 30, -8, 62, 1),
      ring(78, 70, 10),
      beam(50, 54, 72, -18, 18, "stream", "white"),
      glyph("V", 61, 46, 20, 82, "white"),
    ],
  },
  "fusion-web": {
    code: "FUSION / WEB",
    primitives: [
      orb(50, 50, 17, 52, "accent"),
      ring(76, 54, -18),
      ring(68, 76, 28, "counterspin", 50, 50, 6),
      ring(48, 62, 72, "spin", 50, 50, 22),
      beam(50, 50, 74, 0, 16),
      beam(50, 50, 68, 60, 20, "stream", "cool", 0.4),
      beam(50, 50, 68, 120, 24, "stream", "signal", 0.8),
      node(18, 50, 18),
      node(70, 28, 40, "white", 0.4),
      node(72, 70, 32, "signal", 0.8),
    ],
  },
  "foundation-model": {
    code: "MODEL / CORE",
    primitives: [
      cube(50, 50, 37, -20, 42, 8, 46),
      ring(76, 64, -16),
      ring(58, 78, 30, "counterspin", 50, 50, -6),
      node(20, 36, 26),
      node(76, 34, 38, "white", 0.5),
      node(72, 70, 24, "signal", 1),
      glyph("LLM", 50, 50, 38, 86, "white"),
    ],
  },
  "ai-workbench": {
    code: "AI / WORKBENCH",
    primitives: [
      panel(40, 48, 44, 34, 4, -28, -4, 22),
      panel(57, 51, 48, 38, 2, -18, 3, 42, 0.5),
      panel(67, 56, 40, 30, -2, -10, 8, 58, 1),
      cube(34, 67, 18, -16, 36, 0, 62),
      beam(50, 66, 68, 0, 26, "stream", "signal"),
      glyph("AI", 55, 51, 28, 76, "white"),
    ],
  },
  "knowledge-graph": {
    code: "KNOWLEDGE / GRAPH",
    primitives: [
      orb(50, 50, 18, 48),
      beam(50, 50, 66, -24, 18),
      beam(50, 50, 62, 36, 24, "stream", "cool", 0.3),
      beam(50, 50, 70, 102, 12, "stream", "signal", 0.6),
      node(18, 64, 30, "white"),
      node(28, 31, 18, "accent", 0.25),
      node(73, 29, 42, "cool", 0.5),
      node(82, 58, 28, "signal", 0.75),
      node(53, 76, 54, "white", 1),
    ],
  },
  "semantic-wave": {
    code: "SEMANTIC / WAVE",
    primitives: [
      p("wave", 50, 40, 76, 30, { rz: -6, z: 18, motion: "stream", duration: 4.4 }),
      p("wave", 50, 53, 68, 27, { rz: 5, z: 34, motion: "stream", duration: 5, delay: 0.35 }),
      p("wave", 50, 65, 58, 24, { rz: -3, z: 50, motion: "stream", duration: 5.6, delay: 0.7 }),
      ring(74, 78, 12, "counterspin", 50, 53, -12),
      node(24, 45, 30, "signal"),
      node(75, 62, 46, "accent", 0.8),
      glyph("NLP", 50, 51, 34, 78, "white"),
    ],
  },
  "vision-aperture": {
    code: "VISION / APERTURE",
    primitives: [
      p("disc", 50, 50, 30, 30, { z: 52, motion: "breathe", duration: 2.8 }),
      ring(76, 78, 0),
      ring(60, 66, 48, "counterspin", 50, 50, 18),
      ring(44, 78, 92, "spin", 50, 50, 34),
      beam(50, 50, 70, 0, 22, "scan", "white"),
      glyph("●", 50, 50, 18, 78, "white"),
    ],
  },
  "dialogue-agent": {
    code: "DIALOGUE / AGENT",
    primitives: [
      panel(42, 44, 45, 28, 4, 22, -5, 30),
      panel(59, 59, 43, 27, -3, -22, 5, 44, 0.6),
      orb(26, 65, 16, 52, "accent"),
      orb(73, 34, 13, 36, "signal", 0.5),
      ring(74, 70, -12),
      beam(50, 52, 60, 28, 20, "stream", "cool"),
      glyph("•••", 49, 50, 32, 80, "white"),
    ],
  },
  "isolation-gate": {
    code: "GAP / ISOLATE",
    primitives: [
      panel(31, 52, 30, 52, 0, 28, -4, 26),
      panel(69, 52, 30, 52, 0, -28, 4, 26, 0.4),
      p("shield", 50, 51, 30, 40, { z: 64, motion: "breathe", duration: 3.2 }),
      beam(50, 52, 72, 0, 12, "scan", "signal"),
      ring(76, 74, 0, "counterspin", 50, 52, -18),
      glyph("GAP", 50, 51, 34, 86, "white"),
    ],
  },
  "one-way-tunnel": {
    code: "UIS / ONE WAY",
    primitives: [
      ring(54, 4, 90, "spin", 27, 52, 8),
      ring(46, 4, 90, "counterspin", 48, 52, 20),
      ring(38, 4, 90, "spin", 68, 52, 34),
      beam(50, 52, 70, 0, 52, "stream", "white"),
      node(17, 52, 20, "accent"),
      node(80, 52, 58, "signal", 0.8),
      glyph("→", 50, 52, 30, 82, "white"),
    ],
  },
  "video-packet": {
    code: "MTP / VIDEO",
    primitives: [
      panel(34, 48, 35, 28, 2, 25, -4, 20),
      panel(51, 53, 37, 30, 0, 0, 0, 42, 0.35),
      panel(68, 58, 35, 28, -2, -25, 4, 62, 0.7),
      beam(50, 52, 72, 14, 16, "stream", "signal"),
      ring(72, 74, 0),
      glyph("▶", 51, 53, 24, 84, "white"),
    ],
  },
  "secure-bridge": {
    code: "DTP / BRIDGE",
    primitives: [
      p("column", 27, 57, 18, 54, { rx: -10, ry: 24, z: 24, motion: "float", duration: 5 }),
      p("column", 73, 57, 18, 54, { rx: -10, ry: -24, z: 24, motion: "float", duration: 5, delay: 0.5 }),
      beam(50, 48, 54, 0, 52, "stream", "white"),
      beam(50, 58, 60, 0, 26, "scan", "signal"),
      p("shield", 50, 45, 25, 34, { z: 72, motion: "breathe", duration: 3 }),
      glyph("DTP", 50, 45, 32, 94, "white"),
    ],
  },
  "operations-orbit": {
    code: "BOP / CONTROL",
    primitives: [
      panel(50, 54, 54, 38, 64, 0, -4, 12),
      ring(78, 72, -12),
      ring(58, 76, 30, "counterspin", 50, 52, 24),
      ring(38, 68, 72, "spin", 50, 52, 40),
      node(21, 39, 42, "signal"),
      node(77, 61, 30, "accent", 0.5),
      glyph("OPS", 50, 52, 34, 86, "white"),
    ],
  },
  "audit-scanner": {
    code: "DAS / AUDIT",
    primitives: [
      stack(50, 58, 54, 30, 7, 70, 0),
      p("disc", 50, 47, 48, 48, { rx: 70, z: 38, motion: "counterspin", duration: 9 }),
      beam(50, 45, 64, 0, 72, "scan", "signal"),
      ring(72, 76, 0),
      node(27, 65, 28, "white"),
      node(73, 65, 28, "accent", 0.7),
      glyph("LOG", 50, 48, 30, 88, "white"),
    ],
  },
  "risk-shield": {
    code: "RISK / SCORE",
    primitives: [
      p("shield", 50, 51, 44, 58, { z: 52, motion: "breathe", duration: 3.4 }),
      ring(78, 72, -10),
      ring(58, 78, 28, "counterspin", 50, 51, 10),
      p("column", 25, 66, 7, 22, { z: 26, motion: "float", duration: 4 }),
      p("column", 34, 60, 7, 34, { z: 30, motion: "float", duration: 4.4, delay: 0.25 }),
      p("column", 43, 54, 7, 46, { z: 34, motion: "float", duration: 4.8, delay: 0.5 }),
      glyph("✓", 50, 50, 24, 86, "white"),
    ],
  },
  "market-stream": {
    code: "MARKET / STREAM",
    primitives: [
      panel(50, 53, 72, 52, 3, 0, 0, 12),
      p("wave", 50, 45, 62, 24, { z: 42, motion: "stream", duration: 4 }),
      p("wave", 50, 60, 64, 24, { z: 52, rz: 4, motion: "stream", duration: 4.8, delay: 0.4 }),
      beam(50, 37, 64, 0, 30, "scan", "signal"),
      node(25, 58, 48, "white"),
      node(73, 42, 56, "accent", 0.6),
      glyph("↗", 67, 33, 24, 82, "signal"),
    ],
  },
  "intel-telescope": {
    code: "OSINT / SCOPE",
    primitives: [
      p("cone", 41, 55, 54, 70, { ry: -30, rz: 90, z: 8, motion: "scan", duration: 4.5 }),
      ring(44, 4, 90, "counterspin", 26, 55, 24),
      ring(34, 4, 90, "spin", 42, 55, 38),
      beam(57, 55, 64, 0, 50, "stream", "white"),
      orb(78, 55, 15, 64, "signal"),
      node(70, 34, 40, "accent", 0.5),
      glyph("T", 42, 55, 20, 80, "white"),
    ],
  },
  "search-lens": {
    code: "SEARCH / INDEX",
    primitives: [
      panel(50, 55, 66, 48, 64, 0, 0, -8),
      ring(48, 4, 90, "spin", 46, 48, 38),
      p("disc", 46, 48, 34, 34, { ry: 18, z: 52, motion: "breathe", duration: 3 }),
      beam(64, 65, 34, 42, 60, "stream", "signal"),
      ring(76, 74, -8, "counterspin", 50, 55, -18),
      glyph("⌕", 46, 48, 26, 82, "white"),
    ],
  },
  "dashboard-cubes": {
    code: "VIS / DASHBOARD",
    primitives: [
      panel(50, 56, 74, 50, 66, 0, 0, -12),
      cube(31, 47, 22, -16, 30, -4, 32),
      cube(52, 42, 27, -22, 38, 5, 48, 0.35),
      cube(70, 57, 20, -12, 28, 8, 60, 0.7),
      beam(50, 69, 64, 0, 28, "scan", "signal"),
      glyph("03", 52, 42, 22, 82, "white"),
    ],
  },
  "cloud-cluster": {
    code: "CLOUD / NATIVE",
    primitives: [
      cube(36, 58, 22, -16, 34, 0, 32),
      cube(53, 44, 28, -22, 42, 6, 48, 0.35),
      cube(69, 59, 20, -12, 30, -6, 58, 0.7),
      orb(42, 40, 22, 20, "cool"),
      orb(61, 37, 18, 28, "accent", 0.4),
      ring(78, 70, 10),
      beam(50, 66, 72, 0, 24, "stream", "white"),
      glyph("K8", 53, 44, 24, 86, "white"),
    ],
  },
  "civic-tower": {
    code: "CIVIC / SERVICE",
    primitives: [
      p("column", 36, 60, 16, 48, { ry: 24, z: 30, motion: "float", duration: 5 }),
      p("column", 50, 52, 19, 64, { z: 46, motion: "float", duration: 5.5, delay: 0.25 }),
      p("column", 65, 60, 16, 48, { ry: -24, z: 30, motion: "float", duration: 5, delay: 0.5 }),
      panel(50, 31, 54, 16, 60, 0, 0, 54),
      ring(82, 72, -8),
      beam(50, 73, 72, 0, 18, "scan", "signal"),
      glyph("政", 50, 50, 26, 94, "white"),
    ],
  },
  "finance-engine": {
    code: "FIN / ENGINE",
    primitives: [
      p("disc", 50, 50, 48, 48, { ry: 18, z: 48, motion: "spin", duration: 8 }),
      ring(82, 68, -18),
      ring(60, 78, 28, "counterspin", 50, 50, 12),
      p("column", 25, 68, 7, 22, { z: 22, motion: "float", duration: 4 }),
      p("column", 34, 61, 7, 36, { z: 28, motion: "float", duration: 4.5, delay: 0.3 }),
      p("column", 43, 55, 7, 48, { z: 34, motion: "float", duration: 5, delay: 0.6 }),
      glyph("¥", 50, 50, 28, 88, "white"),
    ],
  },
  "media-broadcast": {
    code: "MEDIA / SIGNAL",
    primitives: [
      p("cone", 50, 54, 70, 74, { rx: 68, z: -8, motion: "scan", duration: 5 }),
      panel(50, 56, 42, 28, 2, 0, 0, 42),
      ring(42, 4, 90, "spin", 50, 48, 52),
      ring(60, 4, 90, "counterspin", 50, 48, 36),
      ring(78, 4, 90, "spin", 50, 48, 18),
      beam(50, 72, 64, 0, 20, "stream", "signal"),
      glyph("ON AIR", 50, 56, 42, 82, "white"),
    ],
  },
  "safety-command": {
    code: "SAFETY / COMMAND",
    primitives: [
      p("shield", 50, 52, 42, 56, { z: 54, motion: "breathe", duration: 3.4 }),
      p("disc", 50, 52, 72, 72, { rx: 72, z: -8, motion: "counterspin", duration: 10 }),
      ring(82, 74, -12),
      beam(50, 52, 76, -28, 36, "scan", "signal"),
      node(25, 34, 38, "accent"),
      node(75, 64, 46, "white", 0.7),
      glyph("SAFE", 50, 52, 35, 90, "white"),
    ],
  },
  "enterprise-twin": {
    code: "ENTERPRISE / TWIN",
    primitives: [
      p("column", 33, 57, 18, 58, { ry: 28, z: 30, motion: "float", duration: 5 }),
      p("column", 48, 48, 22, 76, { ry: 12, z: 46, motion: "float", duration: 5.6, delay: 0.25 }),
      p("column", 65, 58, 18, 56, { ry: -25, z: 38, motion: "float", duration: 5.2, delay: 0.5 }),
      cube(76, 69, 17, -12, 30, 0, 62, 0.8),
      ring(84, 70, -8),
      beam(50, 76, 76, 0, 20, "scan", "signal"),
      glyph("DT", 49, 48, 26, 96, "white"),
    ],
  },
  "patent-balance": {
    code: "IP / BALANCE",
    primitives: [
      p("column", 50, 58, 9, 62, { z: 42, motion: "float", duration: 5 }),
      beam(50, 42, 62, 0, 60, "hinge", "white"),
      p("disc", 28, 58, 28, 20, { rx: 72, z: 48, motion: "breathe", duration: 3 }),
      p("disc", 72, 58, 28, 20, { rx: 72, z: 48, motion: "breathe", duration: 3, delay: 0.5 }),
      beam(28, 50, 22, 90, 40, "stream", "muted"),
      beam(72, 50, 22, 90, 40, "stream", "muted"),
      ring(82, 72, -8),
      glyph("IP", 50, 55, 24, 92, "white"),
    ],
  },
  "publishing-knowledge": {
    code: "PUBLISH / KNOWLEDGE",
    primitives: [
      panel(37, 54, 39, 54, 64, 28, -10, 36),
      panel(63, 54, 39, 54, 64, -28, 10, 36, 0.5),
      stack(50, 66, 64, 22, 4, 70, 0),
      ring(82, 72, -8),
      orb(50, 37, 15, 68, "accent"),
      beam(50, 64, 62, 0, 26, "scan", "signal"),
      glyph("文", 50, 50, 26, 94, "white"),
    ],
  },
};
