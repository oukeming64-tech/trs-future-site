import type { CSSProperties } from "react";
import type { Mini3DModelId } from "../../data/visual-types";
import {
  MINI_3D_BLUEPRINTS,
  type PrimitiveSpec,
} from "./mini-3d-blueprints";

type SceneStyle = CSSProperties & Record<`--scene-${string}`, string>;
type ObjectStyle = CSSProperties & Record<`--object-${string}`, string>;
type LayerStyle = CSSProperties & Record<`--layer-${string}`, string>;

function CubeFaces() {
  return (
    <>
      <i data-face="front" />
      <i data-face="back" />
      <i data-face="left" />
      <i data-face="right" />
      <i data-face="top" />
      <i data-face="bottom" />
    </>
  );
}

function StackLayers({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <i
          key={index}
          style={
            {
              "--layer-x": `${(index - (count - 1) / 2) * 2}px`,
              "--layer-y": `${(index - (count - 1) / 2) * -5}px`,
              "--layer-z": `${index * 7}px`,
              opacity: 0.48 + (index / Math.max(count - 1, 1)) * 0.44,
            } as LayerStyle
          }
        />
      ))}
    </>
  );
}

function Primitive({
  primitive,
  index,
}: {
  primitive: PrimitiveSpec;
  index: number;
}) {
  const style = {
    "--object-x": `${primitive.x}%`,
    "--object-y": `${primitive.y}%`,
    "--object-z": `${primitive.z ?? 0}px`,
    "--object-width": String(primitive.width ?? 20),
    "--object-height": String(primitive.height ?? primitive.width ?? 20),
    "--object-rx": `${primitive.rx ?? 0}deg`,
    "--object-ry": `${primitive.ry ?? 0}deg`,
    "--object-rz": `${primitive.rz ?? 0}deg`,
    "--object-delay": `${primitive.delay ?? index * 0.07}s`,
    "--object-duration": `${primitive.duration ?? 6}s`,
  } as ObjectStyle;

  return (
    <span
      className={`mini-3d__object mini-3d__object--${primitive.kind}`}
      data-motion={primitive.motion ?? "float"}
      data-tone={primitive.tone ?? "accent"}
      style={style}
    >
      <span className="mini-3d__shape">
        {(primitive.kind === "cube" || primitive.kind === "column") && (
          <CubeFaces />
        )}
        {primitive.kind === "stack" && (
          <StackLayers count={primitive.count} />
        )}
        {primitive.kind === "glyph" && primitive.text}
      </span>
    </span>
  );
}

export function Mini3DScene({
  model,
  label,
  accent = "#5ee7ff",
  className = "",
}: {
  model: Mini3DModelId;
  label: string;
  accent?: string;
  className?: string;
}) {
  const blueprint = MINI_3D_BLUEPRINTS[model];
  const style = {
    "--scene-accent": accent,
  } as SceneStyle;

  return (
    <div
      className={`mini-3d-scene ${className}`.trim()}
      data-model={model}
      style={style}
      aria-hidden="true"
    >
      <span className="mini-3d-scene__grid" />
      <span className="mini-3d-scene__glow" />
      <span className="mini-3d-scene__scan" />
      <span className="mini-3d-scene__stage">
        {blueprint.primitives.map((primitive, index) => (
          <Primitive
            key={`${model}-${primitive.kind}-${index}`}
            primitive={primitive}
            index={index}
          />
        ))}
      </span>
      <span className="mini-3d-scene__readout">
        <i />
        <span>{blueprint.code}</span>
        <b>{label}</b>
      </span>
    </div>
  );
}
