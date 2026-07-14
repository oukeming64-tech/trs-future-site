import { ArrowUpRight } from "lucide-react";
import { industries } from "../../data/site-content";
import { Reveal } from "../site/Reveal";
import { SectionHeading } from "../site/SectionHeading";

export function IndustriesSection() {
  return (
    <section id="industries" className="industries-section section-pad">
      <div className="page-shell">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="INDUSTRY SOLUTIONS"
            title={
              <>
                行业不是标签，
                <br />
                是智能落地的<span className="text-gradient">真实语境</span>
              </>
            }
            description="把拓尔思在政务、金融、媒体、公共安全等领域的长期积累，转译为清楚、可进入的场景入口。"
          />
        </Reveal>

        <div className="industry-grid">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <Reveal
                key={industry.id}
                className={`industry-card${index === 0 ? " industry-card--featured" : ""}`}
                delay={(index % 4) * 70}
              >
                <a href={industry.href} target="_blank" rel="noreferrer">
                  <div className="industry-card__top">
                    <span>{industry.index}</span>
                    <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <div className="industry-card__visual" aria-hidden="true">
                    <span>{industry.metric}</span>
                    <i />
                    <b />
                  </div>
                  <div className="industry-card__copy">
                    <small>{industry.tagline}</small>
                    <h3>{industry.name}</h3>
                    <p>{industry.description}</p>
                  </div>
                  <span className="industry-card__link">
                    进入方案 <ArrowUpRight size={16} />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
