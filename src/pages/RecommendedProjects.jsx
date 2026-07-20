import React, { useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FolderCode, Code } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import ProjectCard from '../components/ProjectCard';
import DashboardCard from '../components/DashboardCard';
import Button from '../components/Button';

const RecommendedProjects = () => {
  const { analysisResults } = useContext(AppContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  if (!analysisResults) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No Project Recommendations Available</h3>
        <Button variant="primary" className="mt-6" onClick={() => navigate('/dashboard/upload')}>
          Go to Upload
        </Button>
      </div>
    );
  }

  const { projects } = analysisResults;

  // Filtered projects mapping
  const filteredProjects = useMemo(() => {
    return projects.filter(proj => {
      const matchesSearch =
        proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDifficulty = difficultyFilter === 'All' || proj.difficulty === difficultyFilter;

      return matchesSearch && matchesDifficulty;
    });
  }, [projects, searchQuery, difficultyFilter]);

  return (
    <div className="space-y-8">
      {/* Upper Search & Filter controls */}
      <DashboardCard
        title="Portfolio Project Matching"
        subtitle="End-to-end applications designed to showcase your newly acquired skills"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name or description..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-850 dark:text-white transition-all"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="w-full md:w-auto">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full md:w-48 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
      </DashboardCard>

      {/* Grid of Projects */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              name={proj.name}
              difficulty={proj.difficulty}
              description={proj.description}
              estimatedTime={proj.estimatedTime}
              skillsLearned={proj.skillsLearned}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
          <FolderCode className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h4 className="font-bold text-slate-800 dark:text-white text-lg">No Projects Found</h4>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-sm mx-auto">
            Try adjusting your search query or filter tags to discover matching portfolio tasks.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecommendedProjects;
