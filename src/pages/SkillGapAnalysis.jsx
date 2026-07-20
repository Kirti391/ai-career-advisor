import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { AppContext } from '../context/AppContext';
import DashboardCard from '../components/DashboardCard';
import SkillCard from '../components/SkillCard';
import CircularProgress from '../components/CircularProgress';
import Button from '../components/Button';

const SkillGapAnalysis = () => {
  const { analysisResults } = useContext(AppContext);
  const navigate = useNavigate();

  if (!analysisResults) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No Analysis Available</h3>
        <Button variant="primary" className="mt-6" onClick={() => navigate('/dashboard/upload')}>
          Go to Upload
        </Button>
      </div>
    );
  }

  const safeSkillsAnalysis = analysisResults?.skillsAnalysis || { matched: [], partiallyMatched: [], missing: [] };
  const { skillMatchPercentage = 0 } = analysisResults;

  // Formatting data for Recharts Bar Chart
  const chartData = [
    ...safeSkillsAnalysis.matched.slice(0, 4).map(s => ({
      name: s.name,
      Current: s.level,
      Required: 95
    })),
    ...safeSkillsAnalysis.partiallyMatched.map(s => ({
      name: s.name,
      Current: s.level,
      Required: 90
    }))
  ];

  return (
    <div className="space-y-8">
      {/* Upper overview section with CircularProgress and breakdown stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Match radial card */}
        <DashboardCard
          title="Skill Alignment Overview"
          subtitle="Detailed percentage match with target specifications"
          className="lg:col-span-1"
        >
          <div className="py-6 flex justify-center">
            <CircularProgress value={skillMatchPercentage} size={150} strokeWidth={12} label="Matched" color="blue" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed mt-2">
            You cover roughly 68% of required competencies. Acquiring remaining critical skills will increase your match rating above the 80% market competitive benchmark.
          </p>
        </DashboardCard>

        {/* Recharts chart comparing proficiency */}
        <DashboardCard
          title="Proficiency Gap Comparison"
          subtitle="Comparing your current skill level against industry standards"
          className="lg:col-span-2"
        >
          <div className="h-64 w-full text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.1} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis domain={[0, 100]} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#f8fafc'
                  }}
                />
                <Legend />
                <Bar dataKey="Current" fill="#3b82f6" radius={[4, 4, 0, 0]} name="My Level (%)" />
                <Bar dataKey="Required" fill="#6366f1" radius={[4, 4, 0, 0]} name="Target Role Level (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      {/* Grid of Skill Cards categorized */}
      <div className="space-y-6">
        
        {/* Matched Skills */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            Matched Competencies ({safeSkillsAnalysis.matched.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {safeSkillsAnalysis.matched.map((skill, idx) => (
              <SkillCard
                key={idx}
                name={skill.name}
                type="matched"
                level={skill.level}
              />
            ))}
          </div>
        </div>

        {/* Partially Matched Skills */}
        <div className="pt-2">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            Partially Matched Gaps ({safeSkillsAnalysis.partiallyMatched.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {safeSkillsAnalysis.partiallyMatched.map((skill, idx) => (
              <SkillCard
                key={idx}
                name={skill.name}
                type="partiallyMatched"
                gap={skill.currentGap}
              />
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="pt-2">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            Critical Missing Requirements ({safeSkillsAnalysis.missing.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {safeSkillsAnalysis.missing.map((skill, idx) => (
              <SkillCard
                key={idx}
                name={skill.name}
                type="missing"
                importance={skill.importance}
              />
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SkillGapAnalysis;
