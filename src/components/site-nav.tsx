import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "projects", title: "作品" },
  { id: "experience", title: "经历" },
  { id: "profile", title: "关于" },
  { id: "contact", title: "联系" },
];
const sectionsFromBottom = [...sections].reverse();

export function SiteNav() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    function sync() {
      setScrolled(window.scrollY > 8);
      const current = sectionsFromBottom.find(({ id }) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= 145;
      });
      const atBottom = window.scrollY > 8 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActive(atBottom ? "contact" : current?.id ?? "");
      frame = 0;
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(sync);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    sync();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="shell site-nav" onKeyDown={(event) => {
        if (open && event.key === "Escape") {
          setOpen(false);
          toggle.current?.focus();
        }
      }}>
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <span className="monogram" aria-hidden="true">GP<span>.</span></span>
          <span>郭佩琦<small>AI 产品作品集</small><span className="sr-only">首页</span></span>
        </a>
        <nav aria-label="主导航" id="site-menu" data-open={open}>
          {sections.map(({ id, title }) => (
            <a href={`#${id}`} key={id} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>
              {title}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#contact">联系我 <ArrowUpRight size={16} /></a>
        <button ref={toggle} className="icon-button menu-toggle" type="button"
          aria-label={open ? "关闭菜单" : "展开菜单"} aria-expanded={open} aria-controls="site-menu"
          onClick={() => setOpen(!open)}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  );
}
