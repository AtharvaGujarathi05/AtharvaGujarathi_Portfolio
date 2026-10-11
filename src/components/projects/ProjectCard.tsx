import { Sparkles } from 'lucide-react';
import { Project } from '../../types/portfolio';
import { TiltCard } from '../ui/TiltCard';
import { ProjectVisuals } from './ProjectVisuals';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <TiltCard
      maxTilt={10}
      className="p-6 sm:p-7 flex flex-col justify-between h-full group hover:border-electric-blue/50 hover:shadow-glow-blue/20 transition-all duration-300"
    >
      <div>
        {/* Generative Visual Header */}
        <div className="mb-6 transform transition-transform duration-300 group-hover:scale-[1.01]">
          <ProjectVisuals type={project.previewType} />
        </div>

        {/* Category & Status Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono text-electric-blue uppercase tracking-wider font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
            {project.category}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.08]">
            {project.status}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-electric-blue transition-colors font-display mb-3">
          {project.title}
        </h3>

        {/* Project Short Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-5">
          {project.shortDescription}
        </p>

        {/* Architecture & Engineering Highlights */}
        <div className="mb-6 space-y-2 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 transition-colors group-hover:border-white/15">
          <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-electric-violet" />
            Key Capabilities:
          </span>
          <ul className="space-y-2 mt-2.5">
            {project.highlights.map((highlight, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed"
              >
                <span className="text-electric-blue mt-0.5 font-bold text-sm leading-none">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-2">
        {/* Technology Pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.03] text-slate-300 border border-white/[0.07] group-hover:border-electric-blue/30 group-hover:text-white transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </TiltCard>
  );
};
