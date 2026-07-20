import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/outline';
import {
  FileUp,
  Brain,
  Download,
  GraduationCap,
  FolderCode,
  Briefcase,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  FileText,
  UserCheck
} from 'lucide-react';
import { AppContext } from '../context/AppContext';
import DashboardCard from '../components/DashboardCard';
import StatCard from '../components/StatCard';
import CircularProgress from '../components/CircularProgress';
import ATSGauge from '../components/ATSGauge';
import Button from '../components/Button';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Dashboard = () => {
  const { user, resume, analysisResults, addToast } = useContext(AppContext);
  const navigate = useNavigate();

  const safeAnalysis = analysisResults || {};
  const safeCareerSummary = safeAnalysis.careerSummary || {};
  const safeSkillsAnalysis = safeAnalysis.skillsAnalysis || { matched: [], partiallyMatched: [], missing: [] };
  const safeCourses = safeAnalysis.courses || [];
  const safeProjects = safeAnalysis.projects || [];
  const candidateName =
  safeAnalysis.candidateName || user?.name || "Candidate";

const targetRole =
  safeAnalysis.targetRole || "Target Role";

const safeStrengths =
  safeCareerSummary.strengths ||
  safeAnalysis.strengths ||
  [];

const safeNextSteps =
  safeCareerSummary.nextSteps ||
  safeCareerSummary.priorityActions ||
  [];

  // Export PDF mockup
const handleDownload = () => {
  try {
    const doc = new jsPDF();

    const candidateName =
      safeAnalysis.candidateName || user?.name || "Candidate";

    const targetRole =
      safeAnalysis.targetRole || "Not Specified";

    let y = 20;

    // ---------------- TITLE ----------------
    doc.setFontSize(22);
    doc.setTextColor(30, 64, 175);
    doc.text("AI Career Advisor Report", 20, y);

    y += 10;

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(
      `Generated: ${new Date().toLocaleDateString()}`,
      20,
      y
    );

    y += 15;

    // ---------------- PROFILE ----------------
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text("Candidate Profile", 20, y);

    y += 10;

    autoTable(doc, {
      startY: y,
      theme: "grid",
      head: [["Field", "Value"]],
      body: [
        ["Candidate", candidateName],
        ["Target Role", targetRole],
        ["Experience", `${safeAnalysis.experienceYears || 0} Years`],
        ["ATS Score", `${safeAnalysis.atsScore || 0}/100`],
        ["Skill Match", `${safeAnalysis.skillMatchPercentage || 0}%`],
      ],
    });

    y = doc.lastAutoTable.finalY + 15;

    // ---------------- CAREER SUMMARY ----------------
    doc.setFontSize(16);
    doc.text("Career Summary", 20, y);

    y += 8;

    doc.setFontSize(11);

    const summary =
      safeCareerSummary.overview ||
      "No summary available.";

    doc.text(
      doc.splitTextToSize(summary, 170),
      20,
      y
    );

    y += 40;

    // ---------------- STRENGTHS ----------------
    autoTable(doc, {
      startY: y,
      head: [["Top Strengths"]],
      body:
        safeStrengths.length > 0
          ? safeStrengths.map((s) => [s])
          : [["No strengths available"]],
    });

    y = doc.lastAutoTable.finalY + 10;

    // ---------------- MISSING SKILLS ----------------
    autoTable(doc, {
      startY: y,
      head: [["Missing Skills"]],
      body:
        safeSkillsAnalysis.missing.length > 0
          ? safeSkillsAnalysis.missing.map((skill) => [
              skill.name || skill,
            ])
          : [["None"]],
    });

    y = doc.lastAutoTable.finalY + 10;

    // ---------------- MATCHED SKILLS ----------------
    autoTable(doc, {
      startY: y,
      head: [["Matched Skills"]],
      body:
        safeSkillsAnalysis.matched.length > 0
          ? safeSkillsAnalysis.matched.map((skill) => [
              skill.name || skill,
            ])
          : [["None"]],
    });

    y = doc.lastAutoTable.finalY + 10;

    // ---------------- NEXT PAGE ----------------
    doc.addPage();

    y = 20;

    doc.setFontSize(18);
    doc.text("Recommended Courses", 20, y);

    y += 8;

    autoTable(doc, {
      startY: y,
      head: [["Course", "Provider", "Type"]],
      body:
        safeCourses.length > 0
          ? safeCourses.map((course) => [
              course.title,
              course.provider,
              course.priceType,
            ])
          : [["No Courses", "", ""]],
    });

    y = doc.lastAutoTable.finalY + 15;

    // ---------------- PROJECTS ----------------
    doc.setFontSize(18);
    doc.text("Recommended Projects", 20, y);

    y += 8;

    autoTable(doc, {
      startY: y,
      head: [["Project", "Difficulty", "Estimated Time"]],
      body:
        safeProjects.length > 0
          ? safeProjects.map((project) => [
              project.name,
              project.difficulty,
              project.estimatedTime,
            ])
          : [["No Projects", "", ""]],
    });

    y = doc.lastAutoTable.finalY + 15;

    // ---------------- NEXT STEPS ----------------
    doc.setFontSize(18);
    doc.text("Career Action Plan", 20, y);

    y += 8;

    autoTable(doc, {
      startY: y,
      head: [["Next Steps"]],
      body:
        safeNextSteps.length > 0
          ? safeNextSteps.map((step) => [step])
          : [["No recommendations"]],
    });

    // ---------------- SAVE ----------------
    doc.save(`${candidateName}_Career_Report.pdf`);

    addToast("PDF downloaded successfully!", "success");
  } catch (err) {
    console.error(err);
    addToast("Failed to generate PDF", "error");
  }
};
  // If no resume analysis results exist, display a beautiful empty state
  if (!analysisResults) {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center max-w-2xl mx-auto">
        <div className="p-6 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 rounded-full text-blue-600 dark:text-blue-450 mb-6 scale-110">
          <Brain className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Welcome to PathFinder AI, {user?.name}!
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed max-w-md">
          To start receiving personalized career roadmaps, skill gap audits, course matches, and ATS reviews, please upload your resume.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center w-full">
          <Button
            variant="primary"
            size="lg"
            icon={FileUp}
            onClick={() => navigate('/dashboard/upload')}
          >
            Upload Your Resume
          </Button>
        </div>

        {/* Steps walkthrough */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 w-full text-left">
          <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50">
            <span className="text-xs uppercase font-bold text-blue-500">Step 1</span>
            <h4 className="font-bold text-slate-800 dark:text-white mt-1.5">PDF Upload</h4>
            <p className="text-xs text-slate-450 dark:text-slate-500 mt-1 leading-relaxed">Drop your resume. We support Standard PDF formatting.</p>
          </div>
          <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50">
            <span className="text-xs uppercase font-bold text-blue-500">Step 2</span>
            <h4 className="font-bold text-slate-800 dark:text-white mt-1.5">AI Graph Parsing</h4>
            <p className="text-xs text-slate-450 dark:text-slate-500 mt-1 leading-relaxed">Our LangGraph agent analyzes matching requirements and gaps.</p>
          </div>
          <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50">
            <span className="text-xs uppercase font-bold text-blue-500">Step 3</span>
            <h4 className="font-bold text-slate-800 dark:text-white mt-1.5">Study & Project Map</h4>
            <p className="text-xs text-slate-450 dark:text-slate-500 mt-1 leading-relaxed">Follow custom 30-60-90 day timeline guides with resource links.</p>
          </div>
        </div>
      </div>
    );
  }

  // Loaded state dashboard
  return (
    <div className="space-y-8">
      {/* Welcome Card banner */}
      <div className="p-6 md:p-8 bg-linear-to-r from-slate-900 via-blue-900 to-indigo-950 dark:from-slate-900/50 dark:via-blue-950/20 dark:to-indigo-950/20 border border-slate-800/80 dark:border-slate-800 rounded-3xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        {/* Decorative circle glow */}
        <div className="absolute top-0 right-0 w-50 h-50 rounded-full bg-blue-500/10 blur-[50px] pointer-events-none" />
        
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome back, {safeAnalysis.candidateName || user?.name || 'Candidate'}!
          </h2>
          <p className="text-slate-300 text-sm md:text-base mt-2 max-w-xl leading-relaxed">
            Your career analysis is ready. Your target goal is set to{' '}
            <strong className="text-blue-400 font-bold">{safeAnalysis.targetRole || 'your target role'}</strong>. Let's work together to bridge your skill mismatches.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border border-white/10" icon={Download} onClick={handleDownload}>
            Download Report
          </Button>
          <Button variant="primary" icon={FileUp} onClick={() => navigate('/dashboard/upload')}>
            Upload Another
          </Button>
        </div>
      </div>

      {/* Numerical Stats Widgets Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Candidate Experience"
          value={`${safeAnalysis.experienceYears || 0} Years`}
          icon={Briefcase}
          description="In Frontend roles"
          trend="Mid-level"
          trendType="neutral"
        />
        <StatCard
          title="Skill Match Rating"
          value={`${safeAnalysis.skillMatchPercentage || 0}%`}
          icon={UserCheck}
          description="Mapped vs target role requirements"
          trend="+8% from last upload"
          trendType="up"
        />
        <StatCard
          title="Resume ATS Score"
          value={`${safeAnalysis.atsScore || 0}/100`}
          icon={SparklesIcon}
          description="Pass threshold typically is 75+"
          trend="Needs improvement"
          trendType="down"
        />
      </div>

      {/* Main Analysis Visual Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: ATS Score & Skill Match Radial visuals */}
        <div className="lg:col-span-1 space-y-6">
          <DashboardCard title="ATS Score Assessment" subtitle="Keyword matching and layout check">
            <div className="py-6 flex justify-center">
              <ATSGauge score={safeAnalysis.atsScore || 0} />
            </div>
            <div className="mt-4 p-4 border border-slate-100 dark:border-slate-850 rounded-xl bg-slate-50 dark:bg-slate-900/50">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Top ATS Feedback</h5>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Resume has strong impact numbers but lacks backend architectural terms (FastAPI, Docker, SQL).
              </p>
              <button
                onClick={() => navigate('/dashboard/review')}
                className="text-xs font-bold text-blue-650 dark:text-blue-400 hover:underline mt-2 flex items-center gap-1"
              >
                View Full ATS Breakdown &rarr;
              </button>
            </div>
          </DashboardCard>

          <DashboardCard title="Skill Match Indicator" subtitle="General core coverage percentage">
            <div className="py-6 flex justify-center">
              <CircularProgress value={analysisResults.skillMatchPercentage} color="blue" />
            </div>
            <div className="flex gap-4 items-center justify-around border-t border-slate-100 dark:border-slate-850 pt-4 text-center mt-2">
              <div>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {safeSkillsAnalysis.matched.length}
                </span>
                <span className="text-[10px] font-bold text-slate-450 dark:text-slate-550 block">Matched</span>
              </div>
              <div>
                <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                  {safeSkillsAnalysis.partiallyMatched.length}
                </span>
                <span className="text-[10px] font-bold text-slate-450 dark:text-slate-550 block">Partial</span>
              </div>
              <div>
                <span className="text-lg font-bold text-rose-600 dark:text-rose-405">
                  {safeSkillsAnalysis.missing.length}
                </span>
                <span className="text-[10px] font-bold text-slate-450 dark:text-slate-550 block">Missing</span>
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* Right Column: Key Details Summaries */}
        <div className="lg:col-span-2 space-y-6">
          {/* Executive Career Summary */}
          <DashboardCard
            title="Career Transition Summary"
            subtitle="AI Advisor overview on your goal"
          >
            <h4 className="font-bold text-slate-800 dark:text-white text-base md:text-lg mb-3">
              {safeCareerSummary.headline || 'Career Summary Unavailable'}
            </h4>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {safeCareerSummary.overview || 'The current report is still being generated. Please try again in a moment.'}
            </p>

            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Key Actionable Next Steps
            </h5>
            <ul className="space-y-3">
              {(safeCareerSummary.nextSteps || safeCareerSummary.priorityActions || []).map((step, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-slate-650 dark:text-slate-350">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </DashboardCard>

          {/* Missing Skills and Quick Action Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard title="Critical Missing Skills" subtitle="Highest priority items to learn">
              <div className="flex flex-wrap gap-2 py-2">
                {safeSkillsAnalysis.missing.slice(0, 4).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-650 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {skill.name}
                  </span>
                ))}
              </div>
              <button
                onClick={() => navigate('/dashboard/skills')}
                className="text-xs font-bold text-blue-650 dark:text-blue-400 hover:underline mt-4 block"
              >
                Analyze Skill Gap Chart &rarr;
              </button>
            </DashboardCard>

            <DashboardCard title="Quick Advising Actions" subtitle="Fast route shortcuts">
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => navigate('/dashboard/roadmap')}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-left transition-colors"
                >
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-white">View Learning Roadmap</h5>
                    <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5">30-60-90 day objective planning</p>
                  </div>
                  <FileText className="w-4 h-4 text-blue-500" />
                </button>

                <button
                  onClick={() => navigate('/dashboard/interview')}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-left transition-colors"
                >
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-white">Prepare for Interviews</h5>
                    <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5">Role specific QA worksheets</p>
                  </div>
                  <HelpCircle className="w-4 h-4 text-indigo-500" />
                </button>
              </div>
            </DashboardCard>
          </div>

          {/* Quick recommendations preview row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard title="Recommended Courses" subtitle="Selected to fill Python/FastAPI gaps">
              <div className="space-y-3.5">
                {safeCourses.slice(0, 2).map((c, i) => (
                  <div key={i} className="flex gap-3 justify-between items-start border-b border-slate-100 dark:border-slate-850/60 pb-3 last:border-0 last:pb-0">
                    <div>
                      <h5 className="font-bold text-sm text-slate-800 dark:text-white">{c.title}</h5>
                      <span className="text-[10px] font-semibold text-slate-450 dark:text-slate-550 uppercase tracking-wide mt-1 block">{c.provider}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 border border-emerald-500/20">{c.priceType}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/dashboard/courses')}
                className="text-xs font-bold text-blue-650 dark:text-blue-400 hover:underline mt-4 block"
              >
                See all course matches &rarr;
              </button>
            </DashboardCard>

            <DashboardCard title="Recommended Portfolio Projects" subtitle="Build real systems to showcase">
              <div className="space-y-3.5">
                {safeProjects.slice(0, 2).map((p, i) => (
                  <div key={i} className="flex gap-3 justify-between items-start border-b border-slate-100 dark:border-slate-850/60 pb-3 last:border-0 last:pb-0">
                    <div>
                      <h5 className="font-bold text-sm text-slate-800 dark:text-white">{p.name}</h5>
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 mt-1 block">Difficulty: {p.difficulty}</span>
                    </div>
                    <span className="text-xs text-slate-450 dark:text-slate-500 font-semibold">{p.estimatedTime}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/dashboard/projects')}
                className="text-xs font-bold text-blue-650 dark:text-blue-400 hover:underline mt-4 block"
              >
                Explore project details &rarr;
              </button>
            </DashboardCard>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
