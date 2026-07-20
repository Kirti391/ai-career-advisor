import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import TimelineCard from '../components/TimelineCard';
import DashboardCard from '../components/DashboardCard';
import Button from '../components/Button';
import { Compass, GraduationCap, FolderCode } from 'lucide-react';

const LearningRoadmap = () => {
  const { analysisResults } = useContext(AppContext);
  const navigate = useNavigate();

  if (!analysisResults) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No Learning Roadmap Available</h3>
        <Button variant="primary" className="mt-6" onClick={() => navigate('/dashboard/upload')}>
          Go to Upload
        </Button>
      </div>
    );
  }

  const { learningRoadmap = [], targetRole = 'Target Role' } = analysisResults;

  return (
    <div className="space-y-8">
      {/* Intro info box */}
      <DashboardCard
        title="Personalized Learning Pathway"
        subtitle="Step-by-step career acceleration timeline"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-sm md:text-base text-slate-650 dark:text-slate-405 leading-relaxed max-w-2xl">
            This custom 90-day learning curriculum is engineered specifically to fill your skill gap anomalies. Focus on completing objectives sequentially, delivering each milestone to lock down competencies for the{' '}
            <strong className="text-blue-500 font-bold">{targetRole}</strong> role.
          </p>
          
          <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              icon={GraduationCap}
              onClick={() => navigate('/dashboard/courses')}
              className="flex-grow sm:flex-grow-0"
            >
              Courses
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={FolderCode}
              onClick={() => navigate('/dashboard/projects')}
              className="flex-grow sm:flex-grow-0"
            >
              Projects
            </Button>
          </div>
        </div>
      </DashboardCard>

      {/* Chronological Roadmap Timeline */}
      <div className="max-w-4xl mx-auto py-4">
        {learningRoadmap?.map((phaseData, idx) => (
          <TimelineCard
            key={idx}
            index={idx}
            phase={phaseData.phase}
            objectives={phaseData.objectives}
            deliverables={phaseData.deliverables}
          />
        ))}
      </div>
    </div>
  );
};

export default LearningRoadmap;
