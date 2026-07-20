import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Briefcase,
  GraduationCap,
  FolderCode,
  Award,
  ArrowRight,
  ChevronRight,
  Flame,
  Wrench,
  FileCheck2
} from 'lucide-react';
import { AppContext } from '../context/AppContext';
import DashboardCard from '../components/DashboardCard';
import Button from '../components/Button';

const CareerAnalysis = () => {
  const { analysisResults } = useContext(AppContext);
  const navigate = useNavigate();

  if (!analysisResults) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No Career Analysis Available</h3>
        <p className="text-slate-450 dark:text-slate-500 mt-2">Please upload a resume first to run analysis.</p>
        <Button variant="primary" className="mt-6" onClick={() => navigate('/dashboard/upload')}>
          Go to Upload
        </Button>
      </div>
    );
  }

  const {
    candidateName = 'Candidate',
    currentRole = 'Career Seeker',
    targetRole = 'Target Role',
    experienceYears = 0,
    profile = {
      experience: [],
      projects: [],
      education: [],
      softSkills: [],
      tools: []
    }
  } = analysisResults;

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <DashboardCard className="bg-slate-900 text-white border-transparent">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">{candidateName}</h2>
              <p className="text-slate-400 text-sm mt-1">
                Currently: <strong>{currentRole}</strong> &bull; Targeting: <strong className="text-blue-400">{targetRole}</strong>
              </p>
            </div>
          </div>
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-center">
            <span className="text-2xl font-black block text-blue-400">{experienceYears}</span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Years Exp</span>
          </div>
        </div>
      </DashboardCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Education & Work History */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Work History */}
          <DashboardCard title="Professional Experience" subtitle="Chronological work history parsed from resume">
            <div className="relative pl-6 space-y-8 border-l border-slate-100 dark:border-slate-850">
              {profile.experience?.map((exp, idx) => (
                <div key={idx} className="relative">
                  {/* Marker node */}
                  <span className="absolute left-[-31px] top-1 w-3 h-3 rounded-full border border-blue-500 bg-white dark:bg-slate-950" />
                  
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-slate-905 dark:text-white text-base md:text-lg">
                        {exp.role}
                      </h4>
                      <p className="text-xs font-bold text-blue-650 dark:text-blue-400 mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400">
                      {exp.duration}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* Projects */}
          <DashboardCard title="Key Projects" subtitle="Showcased project portfolio details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.projects?.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                      {proj.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                      {proj.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-850/60">
                    {proj.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-blue-500/5 text-blue-600 dark:text-blue-450 border border-blue-500/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Right Column: Skills, Soft Skills & Tools */}
        <div className="lg:col-span-1 space-y-6">
          {/* Education */}
          <DashboardCard title="Education" subtitle="Parsed academic degrees">
            <div className="space-y-4">
              {profile.education?.map((edu, idx) => (
                <div key={idx} className="p-4 border border-slate-150 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50 flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">{edu.degree}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-450 mt-0.5">{edu.school} &bull; {edu.year}</p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-bold bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-800 rounded text-slate-500">
                      GPA: {edu.gpa}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* Current Skills list */}
          <DashboardCard title="Current Technical Skills" subtitle="Core technical competencies">
            <div className="flex flex-wrap gap-2">
              {(analysisResults.skillsAnalysis?.matched || []).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  {skill.name}
                </span>
              ))}
            </div>
          </DashboardCard>

          {/* Soft Skills */}
          <DashboardCard title="Soft Skills" subtitle="Interpersonal parsed tags">
            <div className="flex flex-wrap gap-2">
              {profile.softSkills?.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  {skill}
                </span>
              ))}
            </div>
          </DashboardCard>

          {/* Tools */}
          <DashboardCard title="Developer Tools" subtitle="Design, VCS, and workflow systems">
            <div className="flex flex-wrap gap-2">
              {profile.tools?.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-750 flex items-center gap-1.5"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  {tool}
                </span>
              ))}
            </div>
          </DashboardCard>
        </div>

      </div>
    </div>
  );
};

export default CareerAnalysis;
