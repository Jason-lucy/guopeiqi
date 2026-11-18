import { ArrowDown, ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { useState } from "react";
import type { PointerEvent } from "react";
import { asset, focus, profile } from "../data/resume";
import BlurFade from "./magicui/blur-fade";
import type { OpenProject } from "./project-card";

function movePointer(event: PointerEvent<HTMLElement>, strength: number) {
  if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const target = event.currentTarget;
  const bounds = target.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  target.style.setProperty("--mx", `${x * strength}px`);
  target.style.setProperty("--my", `${y * strength}px`);
}

function resetPointer(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.removeProperty("--mx");
  event.currentTarget.style.removeProperty("--my");
}

export function Hero({ onOpen }: { onOpen: OpenProject }) {
  const [selected, setSelected] = useState(0);
  const role = focus[selected];

  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <BlurFade className="hero-identity">
          <span className="status-dot" aria-hidden="true" />
          <span>{profile.name}</span><span className="identity-divider" aria-hidden="true" />
          <span className="romanized">{profile.romanized}</span>
        </BlurFade>
        <BlurFade delay={0.06}>
          <h1 id="hero-title">让 AI 走进<br />业务现场<span>.</span></h1>
        </BlurFade>
        <BlurFade delay={0.12}>
          <p className="hero-description">从工业工程与仿真售前出发，做可验证的 AI 产品、解决方案和工作流。</p>
        </BlurFade>
        <BlurFade delay={0.18} className="hero-actions">
          <a className="button button-primary" href="#projects" onPointerMove={(event) => movePointer(event, 10)} onPointerLeave={resetPointer}>
            <span>探索作品 <ArrowDownRight size={18} /></span>
          </a>
          <a className="button button-secondary" href="#experience">查看经历 <ArrowDown size={16} /></a>
        </BlurFade>
        <div className="role-panel">
          <div className="role-options" role="group" aria-label="职业方向">
            {focus.map((item, index) => (
              <button type="button" key={item.title} aria-pressed={index === selected} onClick={() => setSelected(index)}>{item.title}</button>
            ))}
          </div>
          <div className="role-story" aria-live="polite">
            <BlurFade key={role.project} duration={0.26} yOffset={4} blur="0px">
              <p>{role.description}</p>
              <a href={`#${role.project}`} onClick={(event) => onOpen(role.project, event)} aria-haspopup="dialog">
                {role.action} <ArrowUpRight size={15} />
              </a>
            </BlurFade>
          </div>
        </div>
      </div>
      <BlurFade delay={0.08} className="hero-portrait">
        <figure className="portrait" onPointerMove={(event) => movePointer(event, 19)} onPointerLeave={resetPointer}>
          <img src={asset("portrait.webp")} width="660" height="863" alt="根据郭佩琦简历照片创作的数字肖像" fetchPriority="high" />
          <div className="portrait-grid" aria-hidden="true" />
          <span className="portrait-corner corner-top" aria-hidden="true" />
          <span className="portrait-corner corner-bottom" aria-hidden="true" />
          <figcaption><MapPin size={15} /> {profile.location} <span aria-hidden="true">/</span> 数字肖像</figcaption>
        </figure>
      </BlurFade>
    </section>
  );
}
