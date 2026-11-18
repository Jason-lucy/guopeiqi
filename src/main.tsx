import { ArrowUp, ArrowUpRight, Blocks, Cpu, GraduationCap, Layers3, Mail, MessagesSquare, Phone, Workflow } from "lucide-react";
import { domAnimation, LazyMotion } from "motion/react";
import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BlurFade from "./components/magicui/blur-fade";
import { CopyButton } from "./components/copy-button";
import { Hero } from "./components/hero";
import type { OpenProject } from "./components/project-card";
import { ProjectDialog } from "./components/project-dialog";
import ProjectsSection from "./components/section/projects-section";
import { SiteNav } from "./components/site-nav";
import { capabilities, evidence, experience, focus, profile, projects } from "./data/resume";
import "./styles.css";

const capabilityIcons = [Layers3, Blocks, Workflow, Cpu];
const currentProject = () => projects.find((project) => location.hash === `#${project.id}`);

function App() {
  const [project, setProject] = useState(currentProject);
  const opener = useRef<HTMLElement>();
  const wasOpen = useRef(Boolean(project));

  useEffect(() => {
    function sync() {
      setProject(currentProject());
    }
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    const hash = location.hash.slice(1);
    if (hash && !currentProject()) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: "instant" }));
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  useEffect(() => {
    if (!project && wasOpen.current) {
      const previous = opener.current;
      if (previous?.isConnected) previous.focus({ preventScroll: true });
      else document.getElementById("projects-title")?.focus({ preventScroll: true });
    }
    wasOpen.current = Boolean(project);
  }, [project]);

  const openProject: OpenProject = (id, event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (!projects.some((item) => item.id === id)) return;
    event.preventDefault();
    opener.current = event.currentTarget;
    history.pushState({ portfolioProject: id }, "", `#${id}`);
    setProject(currentProject());
  };

  function closeProject() {
    if (!project) return;
    if (history.state?.portfolioProject === project.id) {
      history.back();
      return;
    }
    history.replaceState(history.state, "", "#projects");
    setProject(undefined);
    requestAnimationFrame(() => document.getElementById("projects")?.scrollIntoView({ behavior: "instant" }));
  }

  return (
    <div id="top">
      <a className="skip-link" href="#main">跳转到正文</a>
      <SiteNav />
      <main id="main">
        <Hero onOpen={openProject} />
        <section className="evidence shell" aria-label="项目交付与验证数据">
          {evidence.map(({ value, label, href }) => (
            <a href={href} key={href} onClick={(event) => openProject(href.slice(1), event)}>
              <strong>{value}</strong><span>{label}</span><ArrowUpRight size={17} aria-hidden="true" />
            </a>
          ))}
        </section>

        <ProjectsSection onOpen={openProject} />

        <section className="experience-section" id="experience" aria-labelledby="experience-title">
          <div className="shell content-section">
            <div className="section-header">
              <div><p className="eyebrow">EXPERIENCE</p><h2 id="experience-title">工作经历<span>.</span></h2></div>
              <p>从港口营运与整车物流，到工业仿真售前和团队知识交付。</p>
            </div>
            <ol className="timeline">
              {experience.map((item) => (
                <li key={item.company}>
                  <BlurFade inView className="timeline-row">
                    <div className="when">{item.period}</div>
                    <div>
                      <h3>{item.company}</h3>
                      <p className="position">{item.role}</p>
                      <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                    </div>
                  </BlurFade>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="shell content-section profile-section" id="profile" aria-labelledby="profile-title">
          <div className="section-header">
            <div><p className="eyebrow">ABOUT</p><h2 id="profile-title">关于我<span>.</span></h2></div>
            <p>工业工程训练让我习惯从流程、约束和指标理解问题。我把这种方法带进 AI 产品实践。</p>
          </div>
          <div className="profile-grid">
            <BlurFade inView className="profile-panel">
              <h3>个人信息</h3>
              <dl>
                <div><dt>现居</dt><dd>{profile.location}</dd></div>
                <div><dt>目标城市</dt><dd>{profile.targetCities}</dd></div>
                <div><dt>籍贯</dt><dd>{profile.origin}</dd></div>
                <div><dt>工作方式</dt><dd>{profile.travel}</dd></div>
                <div><dt>求职方向</dt><dd>{focus.map(({ title }) => title).join(" · ")}</dd></div>
              </dl>
            </BlurFade>
            <BlurFade inView delay={0.07} className="profile-panel education">
              <GraduationCap size={27} />
              <p className="eyebrow">EDUCATION</p>
              <h3>{profile.school}</h3>
              <p className="degree">{profile.degree} <span>{profile.studyPeriod}</span></p>
              <p>{profile.education}</p>
            </BlurFade>
          </div>
          <div className="capability-section" id="capabilities">
            <h3>能力与工具</h3>
            <div className="capability-grid">
              {capabilities.map((capability, index) => {
                const Icon = capabilityIcons[index];
                return (
                  <BlurFade inView key={capability.title} delay={(index % 2) * 0.06} className="capability">
                    <Icon size={22} strokeWidth={1.6} />
                    <h4>{capability.title}</h4>
                    <ul className="tags">{capability.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </BlurFade>
                );
              })}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="shell contact-inner">
            <div>
              <p className="eyebrow">CONTACT</p>
              <h2 id="contact-title">一起做点<br />真实可用的产品<span>.</span></h2>
              <p>期待 AI 产品、AI 售前 / FDE 与 AI 运营方向的交流。</p>
            </div>
            <div className="contact-options">
              <div>
                <a href={`mailto:${profile.email}`}><Mail size={20} /><span><small>邮箱</small>{profile.email}</span><ArrowUpRight size={18} /></a>
                <CopyButton label="复制邮箱" getValue={() => profile.email} />
              </div>
              <div>
                <a href={`tel:${profile.phone}`}><Phone size={20} /><span><small>电话</small>{profile.phone}</span><ArrowUpRight size={18} /></a>
              </div>
              <div>
                <p><MessagesSquare size={20} /><span><small>微信</small>{profile.wechat}</span></p>
                <CopyButton label="复制微信" getValue={() => profile.wechat} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer shell">
        <span>郭佩琦 · 个人简历与作品集</span>
        <a href="#top">返回顶部 <ArrowUp size={15} /></a>
      </footer>
      <ProjectDialog project={project} onClose={closeProject} />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode><LazyMotion features={domAnimation} strict><App /></LazyMotion></StrictMode>,
);
