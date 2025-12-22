'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import CTA from '@/components/CTA';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'seo', 'content', 'ppc', 'social', 'automation'];

  const projects = [
    {
      id: 1,
      title: 'TechStart Inc.',
      category: 'seo',
      description: 'Complete SEO overhaul resulting in 300% traffic increase.',
      results: [
        '300% increase in organic traffic',
        '50+ new keyword rankings',
        '75% improvement in page speed',
      ],
      services: ['SEO Optimization', 'Technical Audit', 'Content Strategy'],
    },
    {
      id: 2,
      title: 'Digital Solutions',
      category: 'content',
      description: 'Content marketing strategy and brand redesign.',
      results: [
        '200% increase in engagement',
        '150% growth in email subscribers',
        '40% improvement in conversion rate',
      ],
      services: ['Content Marketing', 'Brand Identity', 'Email Campaigns'],
    },
    {
      id: 3,
      title: 'CodeCraft',
      category: 'ppc',
      description: 'PPC campaign optimization and automation setup.',
      results: [
        '60% reduction in cost per acquisition',
        '250% increase in qualified leads',
        '35% improvement in ROI',
      ],
      services: ['PPC Advertising', 'Marketing Automation', 'Analytics'],
    },
    {
      id: 4,
      title: 'EcoTech Solutions',
      category: 'social',
      description: 'Social media strategy and community building.',
      results: [
        '500% increase in followers',
        '80% improvement in engagement rate',
        '200% growth in website referrals',
      ],
      services: ['Social Media Marketing', 'Community Management', 'Influencer Outreach'],
    },
    {
      id: 5,
      title: 'FinanceHub',
      category: 'automation',
      description: 'Marketing automation and CRM integration.',
      results: [
        '90% automation of lead nurturing',
        '45% increase in sales qualified leads',
        '55% reduction in manual work',
      ],
      services: ['Marketing Automation', 'CRM Integration', 'Workflow Design'],
    },
    {
      id: 6,
      title: 'RetailMax',
      category: 'ppc',
      description: 'E-commerce PPC campaigns and conversion optimization.',
      results: [
        '180% increase in online sales',
        '50% reduction in ad spend waste',
        '65% improvement in ROAS',
      ],
      services: ['PPC Advertising', 'Conversion Optimization', 'A/B Testing'],
    },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <main className="min-h-screen">
      {/* Page Hero - White Background */}
      <section className="bg-gradient-light px-4 py-20 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <h1 className="mb-6 text-5xl font-heading text-foreground sm:text-6xl lg:text-7xl">
            Our Portfolio
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Real results from real clients. See how we've helped businesses grow.
          </p>
        </div>
      </section>

      {/* Filterable Project Grid - Black Background */}
      <section className="bg-gradient-dark px-4 py-24 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl relative z-10">
          {/* Category Filters */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`border-2 px-6 py-3 rounded-xl font-heading text-sm transition-all duration-300 capitalize ${
                  selectedCategory === category
                    ? 'bg-accent text-white border-accent shadow-depth-3'
                    : 'bg-transparent text-white border-white/30 hover:border-white hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="h-full floating" depth="4" variant="dark">
                <div className="flex h-full flex-col">
                  <h3 className="mb-3 text-2xl font-heading text-white">{project.title}</h3>
                  <p className="mb-6 text-gray-300 text-lg leading-relaxed">{project.description}</p>
                  
                  <div className="mb-6 flex-1">
                    <h4 className="mb-3 text-sm font-heading text-white">Results:</h4>
                    <ul className="mb-6 space-y-3 text-sm text-gray-300">
                      {project.results.map((result, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-3 text-accent text-xl">✓</span>
                          <span className="leading-relaxed">{result}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="mb-3 text-sm font-heading text-white">Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service, index) => (
                        <span
                          key={index}
                          className="border border-gray-700 bg-black/50 px-3 py-1 text-xs text-gray-300 rounded-lg"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-300 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Results/Impact Summary - White Background */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-5xl font-heading text-foreground sm:text-6xl">
              Overall Impact
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              The numbers that matter
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center floating" depth="3">
              <div className="text-6xl font-heading text-accent mb-3">250%</div>
              <div className="text-secondary text-lg">Average Traffic Increase</div>
            </Card>
            <Card className="text-center floating" depth="3">
              <div className="text-6xl font-heading text-accent mb-3">180%</div>
              <div className="text-secondary text-lg">Average ROI</div>
            </Card>
            <Card className="text-center floating" depth="3">
              <div className="text-6xl font-heading text-accent mb-3">98%</div>
              <div className="text-secondary text-lg">Client Satisfaction</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA
        headline="Ready to Start Your Project?"
        description="Let's create something amazing together."
        primaryCtaText="Contact Us"
        primaryCtaLink="/contact"
        secondaryCtaText="View Services"
        secondaryCtaLink="/services"
      />
    </main>
  );
}
