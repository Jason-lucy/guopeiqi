// Media → project identity → description → tags structure adapted from Dillion Verma's Portfolio, MIT.
import { ArrowUpRight } from "lucide-react";
import { asset } from "../data/resume";
import type { Project } from "../data/resume";
import type { MouseEvent } from "react";

export type OpenProject = (id: string, event: MouseEvent<HTMLAnchorElement>) => void;

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: OpenProject }) {
  return (
    <article className={`project-card project-${project.id}`}>
      <a className="project-link" href={`#${project.id}`} onClick={(event) => onOpen(project.id, event)} aria-haspopup="dialog">
        <div className="project-cover">
          <div className="project-window">
            <div className="window-bar" aria-hidden="true"><i /><i /><i /></div>
            <img src={asset(project.image)} alt={project.alt} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="project-content">
          <div className="project-meta"><span>{project.category}</span><span>{project.status}</span></div>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <div className="project-bottom">
            <ul className="tags" aria-label="相关技术与方法">
              {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <span className="project-arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
          </div>
        </div>
      </a>
    </article>
  );
}
