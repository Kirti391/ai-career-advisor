import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import DashboardCard from '../components/DashboardCard';
import ATSGauge from '../components/ATSGauge';
import Button from '../components/Button';
import { CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

const ResumeReview = () => {
  const { analysisResults } = useContext(AppContext);
  const navigate = useNavigate();

  if (!analysisResults) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No Resume Review Available</h3>
        <Button variant="primary" className="mt-6" onClick={() => navigate('/dashboard/upload')}>
          Go to Upload
        </Button>
      </div>
    );
  }

  const { resumeReview = {} } = analysisResults;
  const {
    atsScore = 0,
    missingKeywords = [],
    strengths = [],
    weaknesses = [],
    suggestedImprovements = []
  } = resumeReview;

  return (
    <div className="space-y-8">
      {/* ATS score gauge upper grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ATS Gauge Card */}
        <DashboardCard
          title="ATS Optimization Score"
          subtitle="Matching level with industry scanner systems"
          className="lg:col-span-1"
        >
          <div className="py-6 flex justify-center">
            <ATSGauge score={atsScore} size={170} />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed mt-2">
            An ATS score below 75 typically runs the risk of automated screening rejection. Use the missing keywords and improvement items listed here to boost your score above 80.
          </p>
        </DashboardCard>

        {/* Missing Keywords Column */}
        <DashboardCard
          title="Detected Missing Keywords"
          subtitle="Add these keywords to your resume to pass automated screens"
          className="lg:col-span-2"
        >
          <p className="text-sm text-slate-500 dark:text-slate-405 leading-relaxed mb-4">
            These technical terms are highly sought after by recruiters for your target role, but are currently absent from your uploaded resume.
          </p>
          <div className="flex flex-wrap gap-2.5 py-2">
            {missingKeywords.map((word, idx) => (
              <span
                key={idx}
                className="px-3.5 py-2 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-650 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                {word}
              </span>
            ))}
          </div>
          <div className="mt-6 p-4 border border-slate-100 dark:border-slate-850 rounded-2xl bg-blue-50/50 dark:bg-blue-950/10">
            <h5 className="font-bold text-xs text-blue-650 dark:text-blue-400 uppercase tracking-wide">Advisor Suggestion</h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Integrate missing terms contextually. For example: "Designed database structures utilizing <strong>PostgreSQL</strong>" instead of just listing it in a skills bank.
            </p>
          </div>
        </DashboardCard>
      </div>

      {/* Strengths vs Weakness Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Strengths Card */}
        <DashboardCard
          title="Resume Key Strengths"
          subtitle="What you did exceptionally well"
        >
          <ul className="space-y-4">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex gap-3 text-sm md:text-base text-slate-655 dark:text-slate-355 leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </DashboardCard>

        {/* Weak sections / weaknesses */}
        <DashboardCard
          title="Vulnerable Sections"
          subtitle="Areas that require immediate revisions"
        >
          <ul className="space-y-4">
            {weaknesses.map((weak, idx) => (
              <li key={idx} className="flex gap-3 text-sm md:text-base text-slate-655 dark:text-slate-355 leading-relaxed">
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>{weak}</span>
              </li>
            ))}
          </ul>
        </DashboardCard>
      </div>

      {/* Suggested Improvements Checklist */}
      <DashboardCard
        title="Suggested Improvements Checklist"
        subtitle="Actionable steps to rewrite your resume"
      >
        <div className="space-y-4">
          {suggestedImprovements.map((imp, idx) => (
            <div
              key={idx}
              className="p-5 border border-slate-150 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 flex gap-4 items-start"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-650 dark:text-blue-400 font-bold flex items-center justify-center text-sm">
                {idx + 1}
              </span>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white text-base">Re-write Objective</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {imp}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            variant="primary"
            icon={RefreshCw}
            onClick={() => navigate('/dashboard/upload')}
          >
            Re-Upload & Scan Resume
          </Button>
        </div>
      </DashboardCard>
    </div>
  );
};

export default ResumeReview;
