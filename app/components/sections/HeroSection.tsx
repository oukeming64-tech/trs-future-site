import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { DataCoreScene } from "../site/DataCoreScene";
import { heroMetrics, lifecycle } from "../../data/site-content";
import { Reveal } from "../site/Reveal";

export function HeroSection() {
  return (
    <>
      <section id="top" className="hero-section">
        <div className="hero-section__grid" aria-hidden="true" />
        <div className="hero-section__aurora hero-section__aurora--one" aria-hidden="true" />
        <div className="hero-section__aurora hero-section__aurora--two" aria-hidden="true" />

        <div className="hero-section__content page-shell">
          <div className="hero-copy">
            <div className="hero-copy__eyebrow">
              <span className="status-dot" />
              TRS · DATA + INTELLIGENCE
              <span>2026 CONCEPT</span>
            </div>

            <h1>
              让数据成为
              <span>可行动的智能</span>
            </h1>

            <p className="hero-copy__lead">
              从 5,000 亿+高质量数据资产，到拓天大模型与行业智能体，
              <strong>拓尔思</strong>让复杂信息在真实业务中被理解、被连接、被执行。
            </p>

            <div className="hero-copy__actions">
              <a className="button button--primary" href="#platform">
                探索拓天智能底座 <ArrowRight size={17} />
              </a>
              <a className="button button--ghost" href="#industries">
                查看行业方案
              </a>
            </div>

            <div className="hero-copy__signal">
              <Sparkles size={15} aria-hidden="true" />
              <span>
                自主可控技术 × 高质量数据 × 全栈行业解决方案
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <DataCoreScene />
            <div className="hero-visual__caption" aria-hidden="true">
              <span>TRS / SEMANTIC INTELLIGENCE</span>
              <strong>实时语义核心</strong>
            </div>
          </div>

          <div className="hero-metrics" aria-label="公司核心数据">
            {heroMetrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <a className="hero-scroll" href="#lifecycle" aria-label="向下查看全栈能力">
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown size={15} />
        </a>
      </section>

      <section id="lifecycle" className="lifecycle-section">
        <div className="page-shell">
          <Reveal className="lifecycle-section__intro">
            <span className="micro-label">FULL-STACK INTELLIGENCE</span>
            <h2>
              一条从数据进入
              <br />
              到业务行动的完整链路
            </h2>
            <p>
              不是单一模型，也不是孤立工具。拓尔思把数据、知识、模型与场景组织成持续运转的智能系统。
            </p>
          </Reveal>

          <div className="lifecycle-track">
            <div className="lifecycle-track__beam" aria-hidden="true" />
            {lifecycle.map((item, index) => (
              <Reveal key={item.index} className="lifecycle-card" delay={index * 90}>
                <div className="lifecycle-card__top">
                  <span>{item.index}</span>
                  <i aria-hidden="true" />
                </div>
                <small>{item.caption}</small>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
