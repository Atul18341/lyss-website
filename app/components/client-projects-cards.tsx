// src/components/Projects.tsx
import React from 'react';

interface ProjectItem {
  title: string;
  desc: string;
  icon: string;
}

interface ProjectsProps {
  t: {
    tag: string;
    title: string;
    desc: string;
    items: ProjectItem[];
  };
}

export default function ClientProjects({ t }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 bg-slate-50 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-purple-900 font-bold tracking-wide uppercase text-sm mb-2">{t.tag}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.title}</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">{t.desc}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.items.map((project, index) => (
            <div key={index} className="card-hover bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              <div className="h-48 bg-slate-200 flex items-center justify-center text-slate-400">
                <i className={`fa-solid ${project.icon} text-4xl`}></i>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-slate-900 mb-2">{project.title}</h4>
                <p className="text-slate-600 text-sm">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}