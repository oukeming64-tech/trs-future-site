import { ArrowUpRight } from "lucide-react";
import { companyMetrics, officialLinks } from "../../data/site-content";
import { Reveal } from "../site/Reveal";
import { SectionHeading } from "../site/SectionHeading";

const timeline = [
  { year: "1993", text: "始于中文全文检索，自主核心技术起步" },
  { year: "2011", text: "深交所创业板上市，股票代码 300229" },
  { year: "2023", text: "拓天大模型发布，行业智能加速落地" },
  { year: "NEXT", text: "数据、模型与智能体协同，走向全球市场" },
];

export function AboutSection() {
  return (
    <section id="about" className="about-section section-pad">
      <div className="page-shell">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="ABOUT TRS"
            title={
              <>
                三十余年，
                <br />
                始终做<span className="text-gradient">难而正确的事</span>
              </>
            }
          />
        </Reveal>

        <div className="about-section__layout">
          <Reveal className="about-story">
            <p className="about-story__lead">
              拓尔思成立于 1993 年，是中文全文检索技术的始创者，也是领先的人工智能、大数据和数据安全产品及服务提供商。
            </p>
            <p>
              公司以“数据 + 智能”为核心战略，坚持自主可控技术、优质数据资产与全栈解决方案协同，服务数字政府、金融科技、媒体融合、公共安全等关键领域。
            </p>
            <a href={officialLinks.about} target="_blank" rel="noreferrer">
              阅读官方公司介绍 <ArrowUpRight size={16} />
            </a>
          </Reveal>

          <div className="about-metrics">
            {companyMetrics.map((metric, index) => (
              <Reveal key={metric.label} className="about-metric" delay={(index % 3) * 65}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="about-timeline" delay={120}>
          <div className="about-timeline__line" aria-hidden="true" />
          {timeline.map((item) => (
            <div key={item.year}>
              <i aria-hidden="true" />
              <strong>{item.year}</strong>
              <span>{item.text}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
