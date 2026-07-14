import { ClientConstellation } from "../site/ClientConstellation";
import { Reveal } from "../site/Reveal";
import { SectionHeading } from "../site/SectionHeading";

export function TrustSection() {
  return (
    <section id="trust" className="trust-section section-pad">
      <div className="trust-section__noise" aria-hidden="true" />
      <div className="page-shell">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="TRUST AT SCALE"
            title={
              <>
                复杂场景里的长期信任，
                <br />
                来自<span className="text-gradient">持续交付</span>
              </>
            }
            description="拓尔思数智化产品与服务已被国内外 10,000 余家企业级用户广泛使用。"
          />
        </Reveal>
        <Reveal delay={100}>
          <ClientConstellation />
        </Reveal>
      </div>
    </section>
  );
}
