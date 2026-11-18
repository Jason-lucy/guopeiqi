import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { asset } from "../data/resume";
import type { Project } from "../data/resume";
import { CopyButton } from "./copy-button";

export function ProjectDialog({ project, onClose }: { project: Project | undefined; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (project && dialog && !dialog.open) {
      dialog.showModal();
      close.current?.focus({ preventScroll: true });
    }
    if (!project && dialog?.open) dialog.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="detail-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      {project && (
        <article className="detail" key={project.id}>
          <div className="detail-top">
            <span>{project.category} <span aria-hidden="true">/</span> {project.status}</span>
            <button ref={close} className="icon-button" type="button" aria-label="关闭项目详情" onClick={onClose}><X size={22} /></button>
          </div>
          <header className="detail-heading">
            <h2 id="detail-title">{project.title}</h2>
            <p>{project.subtitle} · {project.role}</p>
          </header>
          <figure className={`detail-figure project-${project.id}`}>
            <img src={asset(project.image)} alt={project.alt} decoding="async" />
            <figcaption>{project.caption}</figcaption>
          </figure>
          <div className="detail-copy">
            <section><h3>背景与问题</h3><p>{project.challenge}</p></section>
            <section><h3>我的工作</h3><ul>{project.contribution.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section className="detail-outcome"><h3>交付与验证</h3><p>{project.outcome}</p></section>
            <section><h3>技术与方法</h3><ul className="tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></section>
            <footer className="detail-actions">
              {project.links?.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={16} /></a>)}
              <CopyButton label="复制项目链接" getValue={() => window.location.href} />
            </footer>
          </div>
        </article>
      )}
    </dialog>
  );
}
