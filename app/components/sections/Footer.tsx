import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { navigation, officialLinks } from "../../data/site-content";
import { BrandMark } from "../site/BrandMark";

export function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="site-footer__glow" aria-hidden="true" />
      <div className="site-footer__cta page-shell">
        <div>
          <span className="micro-label">START A CONVERSATION</span>
          <h2>
            让数据开始工作，
            <br />
            让智能真正发生。
          </h2>
        </div>
        <div className="site-footer__cta-actions">
          <a className="button button--light" href="mailto:trs@trs.com.cn">
            <Mail size={17} /> 合作咨询
          </a>
          <a className="button button--ghost" href="tel:4006300229">
            <Phone size={17} /> 4006 300229
          </a>
        </div>
      </div>

      <div className="site-footer__main page-shell">
        <div className="site-footer__brand">
          <BrandMark />
          <p>
            用自主可控的技术、优质数据资产与全栈解决方案，赋能千行百业实现数智化升级。
          </p>
          <span>北京市海淀区建枫路（南延）6 号院 3 号楼</span>
        </div>

        <div className="site-footer__links">
          <div>
            <strong>页面导航</strong>
            {navigation.slice(0, 4).map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <div>
            <strong>服务与合作</strong>
            <a href={officialLinks.documents} target="_blank" rel="noreferrer">
              文档中心
            </a>
            <a href={officialLinks.ecosystem} target="_blank" rel="noreferrer">
              生态体系
            </a>
            <a href="https://www.trs.com.cn/fwyzc_755/cpsq/" target="_blank" rel="noreferrer">
              产品授权
            </a>
          </div>
          <div>
            <strong>公司信息</strong>
            <a href={officialLinks.about} target="_blank" rel="noreferrer">
              公司简介
            </a>
            <a href={officialLinks.news} target="_blank" rel="noreferrer">
              新闻活动
            </a>
            <a href={officialLinks.investor} target="_blank" rel="noreferrer">
              投资者关系 <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom page-shell">
        <span>© 2026 TRS WEBSITE CONCEPT</span>
        <span>本项目为概念性官网焕新提案，公开信息与外链来源于拓尔思官方网站。</span>
        <a href={officialLinks.home} target="_blank" rel="noreferrer">
          访问现有官网 <ArrowUpRight size={13} />
        </a>
      </div>
    </footer>
  );
}
