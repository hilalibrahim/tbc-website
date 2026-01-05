'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import CTA from '@/components/CTA';
import { Filter, TrendingUp, Users, Target, Zap, Globe, BarChart3, ArrowRight, Search, Play, Megaphone, Cpu, ShoppingCart } from 'lucide-react';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects', icon: <Globe className="w-4 h-4" /> },
    { id: 'travel', label: 'Travel & Hospitality', icon: '✈️' },
    { id: 'tech', label: 'Technology', icon: '💻' },
    { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
    { id: 'services', label: 'Professional Services', icon: '🏢' },
    { id: 'startups', label: 'Startups', icon: '🚀' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Pitstopia Growth Strategy',
      category: 'travel',
      industry: 'Travel Tech',
      timeline: '3 Months',
      description: 'Complete digital marketing strategy for India\'s premier travel utility app.',
      results: [
        { label: 'User Growth', value: '+320%', color: 'from-[#D9D9D9] to-[#BFBFBF]' },
        { label: 'App Downloads', value: '+215%', color: 'from-[#BFBFBF] to-[#8C8C8C]' },
        { label: 'Engagement', value: '+84%', color: 'from-[#8C8C8C] to-[#737373]' }
      ],
      services: ['Growth Strategy', 'Content Marketing', 'Social Media', 'SEO'],
      featured: true
    },
    {
      id: 2,
      title: 'TechFlow Solutions',
      category: 'tech',
      industry: 'SaaS Platform',
      timeline: '4 Months',
      description: 'Go-to-market strategy for B2B SaaS platform launch.',
      results: [
        { label: 'User Acquisition', value: '+180%', color: 'from-[#D9D9D9] to-[#BFBFBF]' },
        { label: 'Activation Rate', value: '+92%', color: 'from-[#BFBFBF] to-[#8C8C8C]' },
        { label: 'MRR Growth', value: '+156%', color: 'from-[#8C8C8C] to-[#737373]' }
      ],
      services: ['Launch Strategy', 'Content Marketing', 'Email Campaigns', 'Analytics']
    },
    {
      id: 3,
      title: 'Luxe Fashion Co.',
      category: 'ecommerce',
      industry: 'E-commerce',
      timeline: '6 Months',
      description: 'Digital transformation for luxury fashion e-commerce brand.',
      results: [
        { label: 'Revenue Growth', value: '+320%', color: 'from-[#D9D9D9] to-[#BFBFBF]' },
        { label: 'Conversion Rate', value: '+84%', color: 'from-[#BFBFBF] to-[#8C8C8C]' },
        { label: 'Customer LTV', value: '+65%', color: 'from-[#8C8C8C] to-[#737373]' }
      ],
      services: ['E-commerce Strategy', 'PPC Advertising', 'Social Commerce', 'Retention']
    },
    {
      id: 4,
      title: 'LegalTech Partners',
      category: 'services',
      industry: 'Professional Services',
      timeline: '5 Months',
      description: 'Digital presence overhaul for legal technology consulting firm.',
      results: [
        { label: 'Lead Generation', value: '+275%', color: 'from-[#D9D9D9] to-[#BFBFBF]' },
        { label: 'Website Traffic', value: '+190%', color: 'from-[#BFBFBF] to-[#8C8C8C]' },
        { label: 'Conversion Rate', value: '+68%', color: 'from-[#8C8C8C] to-[#737373]' }
      ],
      services: ['Brand Strategy', 'Lead Generation', 'Content Marketing', 'SEO']
    },
    {
      id: 5,
      title: 'HealthTech Startup',
      category: 'startups',
      industry: 'Healthcare Technology',
      timeline: '3 Months',
      description: 'Digital marketing strategy for early-stage health tech startup.',
      results: [
        { label: 'User Growth', value: '+420%', color: 'from-[#D9D9D9] to-[#BFBFBF]' },
        { label: 'Funding Success', value: 'Achieved', color: 'from-[#BFBFBF] to-[#8C8C8C]' },
        { label: 'Market Share', value: '+35%', color: 'from-[#8C8C8C] to-[#737373]' }
      ],
      services: ['Startup Strategy', 'Investor Relations', 'Growth Hacking', 'PR']
    },
    {
      id: 6,
      title: 'EduTech Platform',
      category: 'tech',
      industry: 'Education Technology',
      timeline: '4 Months',
      description: 'Digital marketing campaign for online learning platform.',
      results: [
        { label: 'Student Signups', value: '+280%', color: 'from-[#D9D9D9] to-[#BFBFBF]' },
        { label: 'Course Completion', value: '+45%', color: 'from-[#BFBFBF] to-[#8C8C8C]' },
        { label: 'Revenue Growth', value: '+195%', color: 'from-[#8C8C8C] to-[#737373]' }
      ],
      services: ['Digital Campaigns', 'Content Strategy', 'Social Media', 'Email Marketing']
    },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const impactStats = [
    { label: 'Average Growth', value: '3.2x', description: 'Across all client projects' },
    { label: 'Industries Served', value: '15+', description: 'Different sectors transformed' },
    { label: 'Project Success', value: '100%', description: 'Client satisfaction rate' },
    { label: 'ROI Delivered', value: '250%+', description: 'Average return on investment' },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#151515] to-[#0A0A0A]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, #BFBFBF 1px, transparent 1px), linear-gradient(180deg, #BFBFBF 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-[#D9D9D9] to-transparent"></div>
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Success Stories</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D9D9D9]"></div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                Portfolio
              </span>
            </h1>
            
            <p className="text-xl text-[#BFBFBF] max-w-2xl mx-auto">
              Real results from real clients across multiple industries. See how we've transformed businesses through digital marketing.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="relative bg-[#0A0A0A] py-8 sm:py-12 border-t border-[#BFBFBF]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Filter Header */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF8E3C]" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Filter by Industry</span>
            </div>
            
            {/* Filter Buttons - Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2 sm:gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-[#FF6B35] via-[#FF8E3C] to-[#FF6B35] text-white border border-[#FF8E3C]/50 shadow-lg shadow-[#FF8E3C]/20'
                      : 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-[#8C8C8C] border border-[#BFBFBF]/20 hover:text-[#FF8E3C] hover:border-[#FF8E3C]/30 hover:bg-gradient-to-r hover:from-[#1A1A1A] hover:to-[#0A0A0A]'
                  }`}
                >
                  <span className="text-base sm:text-lg flex-shrink-0">
                    {typeof category.icon === 'string' ? category.icon : category.icon}
                  </span>
                  <span className="whitespace-nowrap">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#151515] to-[#0A0A0A] py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="portfolioPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="20" fill="none" stroke="#BFBFBF" strokeWidth="1" opacity="0.1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#portfolioPattern)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="group relative"
                style={{ transitionDelay: `${project.id * 100}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#D9D9D9]/20 to-transparent opacity-0 group-hover:opacity-30 rounded-2xl blur transition-opacity duration-300"></div>
                
                {/* Project Card */}
                <div className="relative h-full rounded-2xl overflow-hidden border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] group-hover:border-[#D9D9D9]/30 transition-all duration-300 group-hover:scale-[1.02]">
                  {/* Header */}
                  <div className="p-6 border-b border-[#BFBFBF]/10">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {project.featured && (
                            <span className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] rounded border border-[#D9D9D9]/30">
                              FEATURED
                            </span>
                          )}
                          <span className="text-sm text-[#8C8C8C]">{project.industry}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#D9D9D9]">{project.title}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-[#8C8C8C]">Timeline</div>
                        <div className="text-sm font-semibold text-[#D9D9D9]">{project.timeline}</div>
                      </div>
                    </div>
                    <p className="text-[#BFBFBF] text-sm leading-relaxed">{project.description}</p>
                  </div>
                  
                  {/* Results */}
                  <div className="p-6 border-b border-[#BFBFBF]/10">
                    <h4 className="text-sm font-semibold text-[#D9D9D9] mb-4">Key Results</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {project.results.map((result, index) => (
                        <div key={index} className="text-center">
                          <div className={`text-lg font-bold bg-gradient-to-br ${result.color} bg-clip-text text-transparent mb-1`}>
                            {result.value}
                          </div>
                          <div className="text-xs text-[#8C8C8C]">{result.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Services */}
                  <div className="p-6">
                    <h4 className="text-sm font-semibold text-[#D9D9D9] mb-4">Services Provided</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 text-xs bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#BFBFBF] rounded-lg border border-[#BFBFBF]/20"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-6">
                    <div className="flex items-center gap-2 text-[#D9D9D9] text-sm font-semibold">
                      <span>View Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center">
              <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10">
                <Filter className="w-12 h-12 text-[#8C8C8C] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#D9D9D9] mb-2">No Projects Found</h3>
                <p className="text-[#BFBFBF] max-w-md mx-auto">
                  No projects match your selected filter. Try a different industry category.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-[#151515] py-32">
        {/* Floating Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-[#D9D9D9]/10 to-transparent rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-tl from-[#BFBFBF]/10 to-transparent rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <TrendingUp className="w-5 h-5 text-[#D9D9D9]" />
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Our Impact</span>
              <TrendingUp className="w-5 h-5 text-[#D9D9D9]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                Proven Results
              </span>
            </h2>
            <p className="text-xl text-[#BFBFBF] max-w-2xl mx-auto">
              Consistent success across industries and business models
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat, index) => (
              <div 
                key={index}
                className="group relative"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl blur"></div>
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10 group-hover:border-[#D9D9D9]/30 transition-all duration-300 group-hover:scale-[1.02] text-center">
                  <div className="text-4xl font-bold text-[#D9D9D9] mb-3">{stat.value}</div>
                  <div className="text-lg font-semibold text-[#BFBFBF] mb-2">{stat.label}</div>
                  <div className="text-sm text-[#8C8C8C]">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Expertise Showcase */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#151515] to-[#0A0A0A] py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-[#D9D9D9]" />
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Industry Expertise</span>
              <Globe className="w-5 h-5 text-[#D9D9D9]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                Across All Sectors
              </span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '✈️', title: 'Travel & Hospitality', count: '12+ Projects' },
              { icon: '💻', title: 'Technology', count: '15+ Projects' },
              { icon: '🛒', title: 'E-commerce', count: '8+ Projects' },
              { icon: '🏢', title: 'Professional Services', count: '10+ Projects' },
            ].map((industry, index) => (
              <div 
                key={index}
                className="group relative"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10 group-hover:border-[#D9D9D9]/30 transition-all duration-300 text-center">
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-bold text-[#D9D9D9] mb-2">{industry.title}</h3>
                  <div className="text-sm text-[#8C8C8C]">{industry.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
  
    </main>
  );
}