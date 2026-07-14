export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark${compact ? " brand-mark--compact" : ""}`}>
      <span className="brand-mark__symbol" aria-hidden="true">
        <span>T</span>
        <span>R</span>
        <span>S</span>
      </span>
      <span className="brand-mark__copy">
        <strong>拓尔思</strong>
        {!compact && <small>DATA + INTELLIGENCE</small>}
      </span>
    </span>
  );
}
