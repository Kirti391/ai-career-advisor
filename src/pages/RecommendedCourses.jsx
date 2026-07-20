import React, { useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, BookOpen, GraduationCap } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import CourseCard from '../components/CourseCard';
import DashboardCard from '../components/DashboardCard';
import Button from '../components/Button';

const RecommendedCourses = () => {
  const { analysisResults } = useContext(AppContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');

  if (!analysisResults) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No Course Recommendations Available</h3>
        <Button variant="primary" className="mt-6" onClick={() => navigate('/dashboard/upload')}>
          Go to Upload
        </Button>
      </div>
    );
  }

  const { courses } = analysisResults;

  // Extract unique providers for filtering
  const providers = useMemo(() => {
    const list = courses.map(c => c.provider);
    return ['All', ...new Set(list)];
  }, [courses]);

  // Filtered courses mapping
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skillsCovered.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesProvider = providerFilter === 'All' || course.provider === providerFilter;
      const matchesPrice = priceFilter === 'All' || course.priceType === priceFilter;

      return matchesSearch && matchesProvider && matchesPrice;
    });
  }, [courses, searchQuery, providerFilter, priceFilter]);

  return (
    <div className="space-y-8">
      {/* Upper Search & Filter controls */}
      <DashboardCard
        title="Course Catalog Matching"
        subtitle="Sourced specifically to bridge your diagnosed skill anomalies"
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
              placeholder="Search courses or skills (e.g. FastAPI, SQL)..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-850 dark:text-white transition-all"
            />
          </div>

          {/* Filtering dropdowns */}
          <div className="flex gap-3 w-full md:w-auto">
            {/* Provider Filter */}
            <div className="flex-1 md:flex-none">
              <select
                value={providerFilter}
                onChange={(e) => setProviderFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                {providers.map((p, idx) => (
                  <option key={idx} value={p}>{p === 'All' ? 'All Providers' : p}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex-1 md:flex-none">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="All">All Prices</option>
                <option value="Free">Free Only</option>
                <option value="Paid">Paid Only</option>
              </select>
            </div>
          </div>
        </div>
      </DashboardCard>

      {/* Grid of Courses */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              provider={course.provider}
              duration={course.duration}
              skillsCovered={course.skillsCovered}
              priceType={course.priceType}
              link={course.link}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h4 className="font-bold text-slate-800 dark:text-white text-lg">No Courses Found</h4>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-sm mx-auto">
            Try adjusting your search query or filter tags to discover matching study catalogs.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecommendedCourses;
