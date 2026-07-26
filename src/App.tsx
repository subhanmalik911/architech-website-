import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Hero } from './components/Hero';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { Portfolio } from './components/Portfolio';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AiConsultant } from './components/AiConsultant';
import { ProcessTimeline } from './components/ProcessTimeline';
import { Footer } from './components/Footer';

import { PROJECTS_DATA, REVIEWS_DATA } from './data/portfolioData';
import { Project, Review } from './types';

// Lazy loading modals & standalone sub-pages for optimal production bundle performance
const ProjectModal = lazy(() => import('./components/ProjectModal').then(module => ({ default: module.ProjectModal })));
const ReviewModal = lazy(() => import('./components/ReviewModal').then(module => ({ default: module.ReviewModal })));
const SavedFavoritesDrawer = lazy(() => import('./components/SavedFavoritesDrawer').then(module => ({ default: module.SavedFavoritesDrawer })));
const ConsultationModal = lazy(() => import('./components/ConsultationModal').then(module => ({ default: module.ConsultationModal })));
const AdminPanel = lazy(() => import('./components/AdminPanel').then(module => ({ default: module.AdminPanel })));
const TeamPage = lazy(() => import('./components/TeamPage').then(module => ({ default: module.TeamPage })));
const CostCalculatorPage = lazy(() => import('./components/CostCalculatorPage').then(module => ({ default: module.CostCalculatorPage })));

// Loading spinner fallback for lazy components
const LazyFallback = () => (
  <div className="flex items-center justify-center p-8 my-12">
    <div className="w-8 h-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  const [projects] = useState<Project[]>(PROJECTS_DATA);
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [savedProjectIds, setSavedProjectIds] = useState<string[]>(['dha-phase6-1kanal-villa']);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'team' | 'calculator'>('home');

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [prefilledProjectTitle, setPrefilledProjectTitle] = useState('');

  // SEO: Dynamic Document Title per view
  useEffect(() => {
    if (currentPage === 'team') {
      document.title = "Leadership & Principal Architects | MZ BUILT Atelier";
    } else if (currentPage === 'calculator') {
      document.title = "Turnkey BOQ Estimator & Construction Cost Calculator | MZ BUILT";
    } else {
      document.title = "MZ BUILT | Luxury Architecture & Turnkey Construction Studio";
    }
  }, [currentPage]);

  // Save/Bookmark Toggle
  const handleToggleSave = (projectId: string) => {
    if (savedProjectIds.includes(projectId)) {
      setSavedProjectIds(savedProjectIds.filter((id) => id !== projectId));
    } else {
      setSavedProjectIds([...savedProjectIds, projectId]);
    }
  };

  // Add new user review
  const handleAddReview = (newReview: Review) => {
    setReviews([newReview, ...reviews]);
  };

  // Saved projects list
  const savedProjects = projects.filter((p) => savedProjectIds.includes(p.id));

  // Consultation openers
  const handleOpenConsultationWithProject = (projectTitle: string) => {
    setPrefilledProjectTitle(projectTitle);
    setIsConsultationOpen(true);
  };

  const handleOpenConsultationWithBatch = (projectTitles: string[]) => {
    setPrefilledProjectTitle(`Saved Moodboard Collection: (${projectTitles.join(', ')})`);
    setIsConsultationOpen(true);
  };

  const themeMode = isDarkMode ? 'dark' : 'light';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#161e2f] text-[#f7f5f0]' : 'bg-[#f7f5f0] text-[#161e2f]'} font-sans antialiased selection:bg-[#c5a059] selection:text-black transition-colors duration-300`}>
      
      {/* Persistent Floating WhatsApp & Call CTA Button */}
      <FloatingWhatsApp onOpenSiteVisit={() => setIsConsultationOpen(true)} />

      {/* Sticky Luxury Navbar */}
      <Navbar
        onOpenConsultation={() => {
          setPrefilledProjectTitle('');
          setIsConsultationOpen(true);
        }}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        savedCount={savedProjectIds.length}
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page as any)}
        theme={themeMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* PAGE CONTENT SWITCHER */}
      {currentPage === 'home' && (
        <main>
          {/* Fullscreen Motion Hero Section */}
          <Hero
            onOpenConsultation={() => {
              setPrefilledProjectTitle('');
              setIsConsultationOpen(true);
            }}
          />

          {/* Architectural Services Section */}
          <ServicesSection
            onOpenConsultation={() => {
              setPrefilledProjectTitle('Full-Spectrum Services Inquiry');
              setIsConsultationOpen(true);
            }}
          />

          {/* Monograph Portfolio Gallery */}
          <Portfolio
            projects={projects}
            onSelectProject={(proj) => setSelectedProject(proj)}
            savedProjectIds={savedProjectIds}
            onToggleSave={handleToggleSave}
          />

          {/* Before & After Renovation / Transformation Slider */}
          <BeforeAfterSlider projects={projects} theme={themeMode} />

          {/* Package-Based Pricing Rates */}
          <PricingSection
            onOpenConsultation={() => {
              setPrefilledProjectTitle('Package Rates Site Visit Inquiry');
              setIsConsultationOpen(true);
            }}
            theme={themeMode}
          />

          {/* AI Spatial Architecture Advisor */}
          <AiConsultant theme={themeMode} />

          {/* Verified Google Reviews & Video Testimonials */}
          <ReviewsSection
            reviews={reviews}
            onOpenWriteReview={() => setIsWriteReviewOpen(true)}
            theme={themeMode}
          />

          {/* Execution Process Timeline */}
          <ProcessTimeline theme={themeMode} />
        </main>
      )}

      <Suspense fallback={<LazyFallback />}>
        {currentPage === 'team' && (
          <TeamPage
            onNavigateHome={() => setCurrentPage('home')}
            onOpenConsultation={() => setIsConsultationOpen(true)}
            theme={themeMode}
          />
        )}

        {currentPage === 'calculator' && (
          <CostCalculatorPage
            onNavigateHome={() => setCurrentPage('home')}
            onOpenConsultation={() => setIsConsultationOpen(true)}
            theme={themeMode}
          />
        )}

        {/* Modals & Drawers Lazy Render */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            isSaved={savedProjectIds.includes(selectedProject.id)}
            onToggleSave={handleToggleSave}
            onOpenConsultationWithProject={handleOpenConsultationWithProject}
          />
        )}

        {isWriteReviewOpen && (
          <ReviewModal
            isOpen={isWriteReviewOpen}
            onClose={() => setIsWriteReviewOpen(false)}
            onSubmitReview={handleAddReview}
          />
        )}

        {isSavedDrawerOpen && (
          <SavedFavoritesDrawer
            isOpen={isSavedDrawerOpen}
            onClose={() => setIsSavedDrawerOpen(false)}
            savedProjects={savedProjects}
            onRemoveProject={handleToggleSave}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenConsultationWithBatch={handleOpenConsultationWithBatch}
          />
        )}

        {isConsultationOpen && (
          <ConsultationModal
            isOpen={isConsultationOpen}
            onClose={() => setIsConsultationOpen(false)}
            prefilledProjectTitle={prefilledProjectTitle}
          />
        )}

        {isAdminPanelOpen && (
          <AdminPanel
            isOpen={isAdminPanelOpen}
            onClose={() => setIsAdminPanelOpen(false)}
          />
        )}
      </Suspense>

      {/* Footer */}
      <Footer onNavigate={(page) => setCurrentPage(page as any)} />

    </div>
  );
}

