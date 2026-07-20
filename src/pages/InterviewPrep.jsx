import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import DashboardCard from '../components/DashboardCard';
import InterviewCard from '../components/InterviewCard';
import Button from '../components/Button';
import { HelpCircle, Code, HelpCircle as Behavioral, Users, Sparkles } from 'lucide-react';

const InterviewPrep = () => {
  const { analysisResults } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('technical');

  if (!analysisResults) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No Interview Preparation Sourced</h3>
        <Button variant="primary" className="mt-6" onClick={() => navigate('/dashboard/upload')}>
          Go to Upload
        </Button>
      </div>
    );
  }

  const { interviewPreparation, targetRole } = analysisResults;

  const tabs = [
    { id: 'technical', label: 'Technical Core', icon: Code },
    { id: 'behavioral', label: 'Behavioral Skills', icon: Behavioral },
    { id: 'hr', label: 'HR / Core Values', icon: Users },
    { id: 'roleSpecific', label: 'Role Specific AI', icon: Sparkles }
  ];

  const getActiveQuestions = () => {
    return interviewPreparation[activeTab] || [];
  };

  return (
    <div className="space-y-8">
      {/* Intro Dashboard Card */}
      <DashboardCard
        title="Custom Interview Practice Sheet"
        subtitle={`Dynamically generated for ${targetRole} interview loops`}
      >
        <p className="text-sm md:text-base text-slate-655 dark:text-slate-400 leading-relaxed">
          These practice questions model real interview assessments. Expand each item to view suggested conceptual outlines, key talking points, and copy them to your local note-taking boards.
        </p>
      </DashboardCard>

      {/* Tabs list */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-1 pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm md:text-base whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-4 max-w-4xl">
        {getActiveQuestions().length > 0 ? (
          getActiveQuestions().map((qa, idx) => (
            <InterviewCard
              key={idx}
              question={qa.question}
              answer={qa.answer}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h4 className="font-bold text-slate-800 dark:text-white text-lg">No Questions in Category</h4>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xs mx-auto">
              Our AI advisor is compiling specific questions for this category. Check back shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPrep;
