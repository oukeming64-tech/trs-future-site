"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation, officialLinks } from "../../data/site-content";
import { BrandMark } from "./BrandMark";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header__inner page-shell">
        <a className="site-header__brand" href="#top" aria-label="返回顶部">
          <BrandMark />
        </a>

        <nav className="site-header__nav" aria-label="主导航">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a
            className="stock-pill"
            href={officialLinks.investor}
            target="_blank"
            rel="noreferrer"
            aria-label="查看拓尔思投资者关系信息"
          >
            <span>深交所</span>
            <strong>300229</strong>
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <a className="header-contact" href="#contact">
            合作咨询
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={open ? "关闭菜单" : "打开菜单"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-navigation${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="mobile-navigation__glow" aria-hidden="true" />
        <div className="mobile-navigation__inner page-shell">
          <span className="micro-label">NAVIGATION / 导航</span>
          <nav aria-label="移动端主导航">
            {navigation.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ "--menu-delay": `${index * 55}ms` } as React.CSSProperties}
              >
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mobile-navigation__meta">
            <a href={officialLinks.investor} target="_blank" rel="noreferrer">
              投资者关系 <ArrowUpRight size={14} />
            </a>
            <a href="https://www.trs.com.cn/en/" target="_blank" rel="noreferrer">
              EN <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
