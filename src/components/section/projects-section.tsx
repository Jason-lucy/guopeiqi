// Data-driven project grid with reveal wrappers adapted from Dillion Verma's Portfolio, MIT.
import { useState } from "react";
import { categories, projects } from "../../data/resume";
import type { Category } from "../../data/resume";
import BlurFade from "../magicui/blur-fade";
import { ProjectCard } from "../project-card";
import type { OpenProject } from "../project-card";

export default function ProjectsSection({ onOpen }: { onOpen: OpenProject }) {
  const [category, setCategory] = useState<Category>("全部");
  const matching = projects.filter((project) => category === "全部" || project.category === category);

  return (
    <section className="shell content-section projects-section" id="projects" aria-labelledby="projects-title">
      <span id="work" className="legacy-anchor" aria-hidden="true" />
      <div className="section-header">
        <div>
          <p className="eyebrow">SELECTED WORK</p>
          <h2 id="projects-title" tabIndex={-1}>精选作品<span>.</span></h2>
        </div>
        <p>从需求研究到可运行的产品。每个案例都包含我的贡献、交付范围和原始项目截图。</p>
      </div>
      <div className="filters" role="group" aria-label="筛选作品">
        {categories.map((item) => (
          <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
        <span className="results" role="status">{matching.length} 个作品</span>
      </div>
      <div className="project-grid">
        {matching.map((project, index) => (
          <BlurFade key={project.id} inView delay={(index % 2) * 0.06} className="project-item">
            <ProjectCard project={project} onOpen={onOpen} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
