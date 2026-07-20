import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import DashboardCard from '../components/DashboardCard';
import StatCard from '../components/StatCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Download,
  Share2,
  Bookmark,
  CheckCircle,
  HelpCircle,
  FileCheck2,
  TrendingUp,
  Brain,
  Link,
  Mail,
  Copy
} from 'lucide-react';

const CareerSummary = () => {
  const { analysisResults, addToast } = useContext(AppContext);
  const navigate = useNavigate();

  const [shareOpen, setShareOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!analysisResults) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No Career Summary Available</h3>
        <Button variant="primary" className="mt-6" onClick={() => navigate('/dashboard/upload')}>
          Go to Upload
        </Button>
      </div>
    );
  }

  const safeCareerSummary = analysisResults?.careerSummary || {};
  const safeStrengths = safeCareerSummary.topStrengths || safeCareerSummary.strengths || [];
  const safeNextSteps = safeCareerSummary.nextSteps || safeCareerSummary.priorityActions || [];
  const { confidenceScore = 0, targetRole = 'Target Role', candidateName = 'Candidate' } = analysisResults;

const handleDownload = () => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(22);
  doc.text("AI Career Advisor Report", 20, y);

  y += 15;

  doc.setFontSize(14);
  doc.text(`Candidate: ${candidateName}`, 20, y);

  y += 10;

  doc.text(`Target Role: ${targetRole}`, 20, y);

  y += 10;

  doc.text(
    `ATS Score: ${analysisResults.atsScore}%`,
    20,
    y
  );

  y += 10;

  doc.text(
    `Skill Match: ${analysisResults.skillMatchPercentage}%`,
    20,
    y
  );

  y += 15;

  doc.setFontSize(18);
  doc.text("Career Summary", 20, y);

  y += 10;

  doc.setFontSize(11);

  doc.text(
    doc.splitTextToSize(
      safeCareerSummary.overview,
      170
    ),
    20,
    y
  );

  y += 35;

  autoTable(doc, {
    startY: y,

    head: [["Top Strengths"]],

    body: safeStrengths.map((item) => [item]),
  });

  y = doc.lastAutoTable.finalY + 10;

  autoTable(doc, {
    startY: y,

    head: [["Next Steps"]],

    body: safeNextSteps.map((item) => [item]),
  });

  doc.save(`${candidateName}_Career_Report.pdf`);

  addToast("PDF downloaded successfully!", "success");
};
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://pathfinder-ai.net/reports/share/${analysisResults.id}`);
    setCopiedLink(true);
    addToast("Shared report URL copied to clipboard!", "success");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Overview Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <DashboardCard
            title="Advisory Executive Brief"
            subtitle={`Target Role: ${targetRole}`}
          >
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg md:text-xl mb-3">
              "{safeCareerSummary.headline || 'Career summary unavailable'}"
            </h3>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-400 leading-relaxed mb-4">
              {safeCareerSummary.overview || 'The current analysis summary is temporarily unavailable.'}
            </p>
          </DashboardCard>
        </div>

        {/* Confidence rating card */}
        <div className="md:col-span-1">
          <DashboardCard title="Advisor Confidence" subtitle="AI evaluation of transition readiness">
            <div className="py-4 text-center">
              <span className="text-6xl font-black text-blue-500 block tracking-tight">
                {confidenceScore}%
              </span>
              <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest mt-1 block">
                Feasibility Index
              </span>
            </div>
            <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-150 dark:border-slate-800 rounded-xl">
              <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center font-medium">
                High alignment. Candidate has strong core logic skills, requiring only syntax and tool-specific backend practice.
              </p>
            </div>
          </DashboardCard>
        </div>
      </div>

      {/* Main summary breakdown details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Core Strengths */}
        <DashboardCard title="Diagnosed Candidate Strengths" subtitle="Assets you can highlight immediately">
          <ul className="space-y-4">
            {safeStrengths.map((str, idx) => (
              <li key={idx} className="flex gap-3 text-sm md:text-base text-slate-650 dark:text-slate-355 leading-relaxed">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </DashboardCard>

        {/* Next Steps Checklist */}
        <DashboardCard title="Prioritized Next Milestones" subtitle="High priority developmental tasks">
          <ul className="space-y-4">
            {safeNextSteps.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-sm md:text-base text-slate-650 dark:text-slate-355 leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-650 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </DashboardCard>
      </div>

      {/* Sharing controls and quick action button toolbar */}
      <div className="flex gap-4 justify-center py-4">
        <Button variant="primary" size="lg" icon={Download} onClick={handleDownload}>
          Download PDF Report
        </Button>
        <Button variant="outline" size="lg" icon={Share2} onClick={() => setShareOpen(true)}>
          Share Report
        </Button>
      </div>

      {/* Shared reports Modal mockup */}
      <Modal isOpen={shareOpen} onClose={() => setShareOpen(false)} title="Share Career Advising Report">
        <div className="space-y-5">
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Generate a shareable link to present this report directly to mentors, employers, or career counselors.
          </p>

          <div className="flex items-center gap-3">
            <input
              type="text"
              readOnly
              value={`https://pathfinder-ai.net/reports/share/${analysisResults.id}`}
              className="flex-grow p-3 bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-500 select-all"
            />
            <Button variant="primary" size="sm" icon={copiedLink ? CheckCircle : Copy} onClick={handleCopyLink}>
              {copiedLink ? 'Copied' : 'Copy'}
            </Button>
          </div>

          <div className="flex justify-around pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <button className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
              <span className="p-3 border border-slate-150 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-850"><Mail className="w-5 h-5 text-blue-500" /></span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Email</span>
            </button>
            <button className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
              <span className="p-3 border border-slate-150 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-850"><Share2 className="w-5 h-5 text-indigo-500" /></span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Slack</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CareerSummary;
