/* eslint-disable @next/next/no-img-element */

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark${compact ? " brand-mark--compact" : ""}`}>
      <img
        className="brand-mark__image"
        src="/trs-logo.png"
        alt="拓尔思 TRS"
        width={147}
        height={36}
        loading="eager"
      />
    </span>
  );
}
