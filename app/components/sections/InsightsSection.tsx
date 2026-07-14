import { ArrowUpRight } from "lucide-react";
import { insights, officialLinks } from "../../data/site-content";
import { Reveal } from "../site/Reveal";
import { SectionHeading } from "../site/SectionHeading";

export function InsightsSection() {
  return (
    <section id="insights" className="insights-section section-pad">
      <div className="page-shell">
        <Reveal>
          <div className="insights-section__heading">
            <SectionHeading
              index="05"
              eyebrow="NEWS & INSIGHTS"
              title={
                <>
                  让变化被看见，
                  <br />
                  让判断<span className="text-gradient">领先一步</span>
                </>
              }
            />
            <a href={officialLinks.news} target="_blank" rel="noreferrer">
              查看全部资讯 <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>

        <div className="insight-grid">
          {insights.map((insight, index) => (
            <Reveal key={insight.title} className="insight-card" delay={index * 80}>
              <a href={insight.href} target="_blank" rel="noreferrer">
                <div className="insight-card__visual" aria-hidden="true">
                  <span>TRS</span>
                  <i />
                  <b>{String(index + 1).padStart(2, "0")}</b>
                </div>
                <div className="insight-card__meta">
                  <span>{insight.category}</span>
                  <time>{insight.date}</time>
                </div>
                <h3>{insight.title}</h3>
                <span className="insight-card__link">
                  阅读详情 <ArrowUpRight size={15} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
