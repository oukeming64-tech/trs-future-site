/* eslint-disable @next/next/no-img-element */

export function BrandMark({ compact = false }: { compact?: boolean }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <span className={`brand-mark${compact ? " brand-mark--compact" : ""}`}>
      <img
        className="brand-mark__image"
        src={`${basePath}/trs-logo.png`}
        alt="拓尔思 TRS"
        width={147}
        height={36}
        loading="eager"
      />
    </span>
  );
}
