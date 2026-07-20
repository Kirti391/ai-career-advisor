import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import DashboardCard from '../components/DashboardCard';
import Button from '../components/Button';
import { User, Calendar, ShieldCheck, Sparkles, LogOut, FileText, Trash2 } from 'lucide-react';

const Profile = () => {
  const { user, history, logout, addToast } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleViewReport = (id) => {
    addToast("Loading history report data...", "info");
    // Since we are using mock data, we just redirect back to dashboard
    navigate('/dashboard');
  };

  const handleDeleteHistory = (id, e) => {
    e.stopPropagation();
    addToast("Report removed from history database.", "success");
  };

  return (
    <div className="space-y-8">
      
      {/* Profile info block */}
      {user && (
        <DashboardCard title="Candidate Credentials" subtitle="Your account profile metadata">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 shadow-md"
            />
            <div className="text-center md:text-left flex-grow">
              <h3 className="text-2xl font-extrabold text-slate-905 dark:text-white tracking-tight">
                {user.name}
              </h3>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                {user.email}
              </p>
              <div className="flex gap-2 justify-center md:justify-start items-center mt-3 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-500/10 border border-blue-500/20 text-blue-650 dark:text-blue-400">
                  {user.role}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-650 dark:text-emerald-450 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Account Active
                </span>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-full md:w-auto">
              <Button variant="danger" icon={LogOut} onClick={handleLogout} className="w-full md:w-auto font-bold">
                Log Out
              </Button>
            </div>
          </div>
        </DashboardCard>
      )}

      {/* Uploaded resumes history list */}
      <DashboardCard
        title="Uploaded Resume History"
        subtitle="Access previous uploads and generated advisory sheets"
      >
        <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900">
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => handleViewReport(item.id)}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850/60 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl text-blue-600 dark:text-blue-450">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm md:text-base">
                      {item.filename}
                    </h4>
                    <p className="text-xs text-slate-450 dark:text-slate-500 mt-0.5 flex items-center gap-1.5 font-semibold">
                      <Calendar className="w-3.5 h-3.5" /> Checked {item.date} &bull; Target: {item.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-bold">Score:</span>
                    <span className={`px-2.5 py-0.5 rounded border text-xs font-bold ${
                      item.score < 60 ? 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400' :
                      item.score < 80 ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400' :
                      'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-450'
                    }`}>
                      {item.score}%
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleDeleteHistory(item.id, e)}
                    className="p-2 border border-slate-150 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-red-550 hover:border-red-500/30 transition-colors"
                    title="Remove from history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardCard>

    </div>
  );
};

export default Profile;
