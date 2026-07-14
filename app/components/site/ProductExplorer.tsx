"use client";

import { ArrowUpRight, MoveRight } from "lucide-react";
import { useState } from "react";
import { productCategories } from "../../data/site-content";

export function ProductExplorer() {
  const [activeId, setActiveId] = useState(productCategories[0].id);
  const activeIndex = productCategories.findIndex(
    (category) => category.id === activeId,
  );
  const active = productCategories[Math.max(activeIndex, 0)];

  const moveTab = (direction: number) => {
    const next =
      (Math.max(activeIndex, 0) + direction + productCategories.length) %
      productCategories.length;
    setActiveId(productCategories[next].id);
  };

  return (
    <div
      className="product-explorer"
      style={{ "--category-accent": active.accent } as React.CSSProperties}
    >
      <div
        className="product-explorer__tabs"
        role="tablist"
        aria-label="产品能力分类"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") moveTab(1);
          if (event.key === "ArrowLeft") moveTab(-1);
        }}
      >
        {productCategories.map((category) => (
          <button
            key={category.id}
            id={`product-tab-${category.id}`}
            type="button"
            role="tab"
            aria-selected={category.id === active.id}
            aria-controls={`product-panel-${category.id}`}
            tabIndex={category.id === active.id ? 0 : -1}
            className={category.id === active.id ? "is-active" : ""}
            onClick={() => setActiveId(category.id)}
          >
            <span>{category.index}</span>
            {category.label}
          </button>
        ))}
      </div>

      <div
        id={`product-panel-${active.id}`}
        className="product-explorer__panel"
        role="tabpanel"
        aria-labelledby={`product-tab-${active.id}`}
        key={active.id}
      >
        <div className="product-explorer__summary">
          <div className="product-orbit" aria-hidden="true">
            <span className="product-orbit__ring product-orbit__ring--one" />
            <span className="product-orbit__ring product-orbit__ring--two" />
            <span className="product-orbit__ring product-orbit__ring--three" />
            <span className="product-orbit__core">
              <i />
            </span>
            <span className="product-orbit__satellite product-orbit__satellite--one" />
            <span className="product-orbit__satellite product-orbit__satellite--two" />
          </div>
          <span className="micro-label">{active.eyebrow}</span>
          <strong>{active.label}</strong>
          <p>{active.summary}</p>
          <div className="product-explorer__signal" aria-hidden="true">
            <span>LIVE CAPABILITY MAP</span>
            <i />
          </div>
        </div>

        <div className="product-explorer__grid">
          {active.products.map((product, index) => (
            <a
              key={product.name}
              className="product-card"
              href={product.href}
              target="_blank"
              rel="noreferrer"
              style={{ "--card-index": index } as React.CSSProperties}
            >
              <span className="product-card__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="product-card__tag">{product.tag}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="product-card__link">
                查看产品 <ArrowUpRight size={15} />
              </span>
            </a>
          ))}
        </div>

        <a
          className="product-explorer__all"
          href="https://www.trs.com.cn/"
          target="_blank"
          rel="noreferrer"
        >
          前往拓尔思官网查看完整产品矩阵 <MoveRight size={18} />
        </a>
      </div>
    </div>
  );
}
