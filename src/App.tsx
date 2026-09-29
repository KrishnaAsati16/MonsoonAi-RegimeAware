import React, { useState } from 'react';
import { Sidebar, TabId } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { TopMetrics } from './components/dashboard/TopMetrics';
import { IndiaRainfallMap } from './components/dashboard/IndiaRainfallMap';
import { WeatherRegimeCard } from './components/dashboard/WeatherRegimeCard';
import { ForecastAccuracyCard } from './components/dashboard/ForecastAccuracyCard';
import { HeavyRainfallRiskCard } from './components/dashboard/HeavyRainfallRiskCard';
import { RainfallAlertsCard } from './components/dashboard/RainfallAlertsCard';
import { AiPipelineCard } from './components/dashboard/AiPipelineCard';
import { NwpVsAiChartCard } from './components/dashboard/NwpVsAiChartCard';
import { DistrictForecastTable } from './components/dashboard/DistrictForecastTable';
import { AiExplanationCard } from './components/dashboard/AiExplanationCard';
import { VerificationCard } from './components/dashboard/VerificationCard';
import { BottomWidgets } from './components/dashboard/BottomWidgets';
import { DistrictDetailModal } from './components/modals/DistrictDetailModal';

// Secondary views for other navigation tabs
import { ForecastView } from './components/views/ForecastView';
import { WeatherRegimesView } from './components/views/WeatherRegimesView';
import { DistrictsView } from './components/views/DistrictsView';
import { HeavyRainfallView } from './components/views/HeavyRainfallView';
import { VerificationView } from './components/views/VerificationView';
import { ModelPerformanceView } from './components/views/ModelPerformanceView';
import { DataSourcesView } from './components/views/DataSourcesView';
import { SettingsView } from './components/views/SettingsView';

import { DISTRICTS_DATA, RAINFALL_ALERTS } from './data/mockData';
import { DistrictData, RainfallAlert } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<TabId>('Dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected district for map floating card, AI explanation card, and modal
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(DISTRICTS_DATA[0]); // default Bhopal
  const [modalDistrict, setModalDistrict] = useState<DistrictData | null>(null);

  const handleSelectAlert = (alert: RainfallAlert) => {
    const matched = DISTRICTS_DATA.find(d => d.name.toLowerCase().includes(alert.district.toLowerCase()) || alert.district.toLowerCase().includes(d.name.toLowerCase()));
    if (matched) {
      setSelectedDistrict(matched);
      setModalDistrict(matched);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] text-[#171717] flex">
      {/* Fixed Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area (offset by sidebar width on lg screens) */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Dynamic Main Body Content */}
        <main className="flex-1 p-4 sm:p-5 lg:p-6 max-w-[1680px] w-full mx-auto">
          {activeTab === 'Dashboard' && (
            <div className="animate-in fade-in duration-200">
              {/* Dashboard Heading Header */}
              <div className="mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-[#171717] tracking-tight">
                  Good morning, Weather Analyst
                </h1>
                <div className="text-sm sm:text-base font-semibold text-[#262626] mt-0.5">
                  India Monsoon Forecast Intelligence
                </div>
                <p className="text-xs text-[#737373] mt-0.5 font-normal">
                  Regime-aware AI post-processing of NWP rainfall forecasts.
                </p>
              </div>

              {/* Top 5 Metrics Row */}
              <TopMetrics 
                onSelectMetric={(key) => {
                  if (key === 'regime') setActiveTab('Weather Regimes');
                  if (key === 'risk') setActiveTab('Heavy Rainfall');
                  if (key === 'districts') setActiveTab('Districts');
                  if (key === 'improvement' || key === 'confidence') setActiveTab('Model Performance');
                }} 
              />

              {/* Middle Section: Map + 4 Cards beside it */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-5">
                {/* Large Map Card (5 cols on 12-col grid or ~50%) */}
                <div className="lg:col-span-6 xl:col-span-6">
                  <IndiaRainfallMap
                    districts={DISTRICTS_DATA}
                    selectedDistrict={selectedDistrict}
                    onSelectDistrict={setSelectedDistrict}
                    onViewDetails={(d) => setModalDistrict(d)}
                  />
                </div>

                {/* 4 Cards beside the map arranged in 2x2 grid (6 cols on 12-col grid) */}
                <div className="lg:col-span-6 xl:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Top-Left: Current Weather Regime */}
                  <WeatherRegimeCard />

                  {/* Top-Right: Forecast Accuracy */}
                  <ForecastAccuracyCard />

                  {/* Bottom-Left: Heavy Rainfall Risk */}
                  <HeavyRainfallRiskCard />

                  {/* Bottom-Right: Rainfall Alerts (Dark Charcoal Card!) */}
                  <RainfallAlertsCard
                    onSelectAlert={handleSelectAlert}
                    onViewAllAlerts={() => setActiveTab('Heavy Rainfall')}
                  />
                </div>
              </div>

              {/* AI Post-Processing Pipeline Card (Full Width) */}
              <AiPipelineCard />

              {/* Lower 4 Analytics Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-5">
                {/* 1. Raw NWP vs AI Corrected Chart */}
                <div className="xl:col-span-4">
                  <NwpVsAiChartCard />
                </div>

                {/* 2. District Forecast Table */}
                <div className="xl:col-span-4">
                  <DistrictForecastTable
                    districts={DISTRICTS_DATA}
                    selectedDistrict={selectedDistrict}
                    onSelectDistrict={(d) => setSelectedDistrict(d)}
                  />
                </div>

                {/* 3. Why did AI change the forecast? */}
                <div className="xl:col-span-2">
                  <AiExplanationCard
                    district={selectedDistrict}
                    onViewFactorsModal={() => setModalDistrict(selectedDistrict)}
                  />
                </div>

                {/* 4. Forecast Verification */}
                <div className="xl:col-span-2">
                  <VerificationCard
                    onViewDetails={() => setActiveTab('Verification')}
                  />
                </div>
              </div>

              {/* Bottom 3 Information Widgets */}
              <BottomWidgets
                onSelectDataSourceTab={() => setActiveTab('Data Sources')}
                onSelectModelPerformanceTab={() => setActiveTab('Model Performance')}
              />
            </div>
          )}

          {/* Secondary Views */}
          {activeTab === 'Forecast' && <ForecastView />}
          {activeTab === 'Weather Regimes' && <WeatherRegimesView />}
          {activeTab === 'Districts' && (
            <DistrictsView onSelectDistrict={(d) => { setSelectedDistrict(d); setModalDistrict(d); }} />
          )}
          {activeTab === 'Heavy Rainfall' && <HeavyRainfallView />}
          {activeTab === 'Verification' && <VerificationView />}
          {activeTab === 'Model Performance' && <ModelPerformanceView />}
          {activeTab === 'Data Sources' && <DataSourcesView />}
          {activeTab === 'Settings' && <SettingsView />}
        </main>

        {/* Global Footer Disclaimer */}
        <footer className="py-3 px-6 text-center border-t border-[#E7E7E3] bg-[#F5F5F3]">
          <p className="text-[11px] text-[#737373]">
            Prototype Demonstration • Forecast values and verification metrics are simulated and not operational forecasts.
          </p>
        </footer>
      </div>

      {/* District Detail Modal */}
      <DistrictDetailModal
        district={modalDistrict}
        onClose={() => setModalDistrict(null)}
      />
    </div>
  );
}

export default App;
