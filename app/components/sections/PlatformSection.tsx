import { ProductExplorer } from "../site/ProductExplorer";
import { Reveal } from "../site/Reveal";
import { SectionHeading } from "../site/SectionHeading";

export function PlatformSection() {
  return (
    <section id="platform" className="platform-section section-pad">
      <div className="platform-section__mesh" aria-hidden="true" />
      <div className="page-shell">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="PRODUCT PLATFORM"
            title={
              <>
                一套底座，连接
                <span className="text-gradient">数据与智能</span>
              </>
            }
            description="保留拓尔思现有官网四大产品门类，用更清晰的能力地图组织产品，让客户先看懂价值，再进入具体产品。"
          />
        </Reveal>
        <Reveal delay={120}>
          <ProductExplorer />
        </Reveal>
      </div>
    </section>
  );
}
