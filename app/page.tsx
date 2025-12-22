import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import CTA from '@/components/CTA';
import Card from '@/components/Card';
import Link from 'next/link';

export const metadata = {
  title: 'Home - Marketing Agency | Digital Marketing Solutions',
  description: 'Transform your digital presence with data-driven marketing solutions. SEO, content marketing, PPC, and more.',
};

export default function Home() {
  const services = [
    {
      title: 'SEO Optimization',
      description: 'Boost your search rankings with data-driven strategies.',
      features: ['Keyword Research', 'On-Page SEO', 'Technical Audit'],
    },
    {
      title: 'Content Marketing',
      description: 'Engaging content that converts visitors into customers.',
      features: ['Blog Writing', 'Social Media', 'Email Campaigns'],
    },
    {
      title: 'PPC Advertising',
      description: 'Maximize ROI with targeted paid advertising campaigns.',
      features: ['Google Ads', 'Social Ads', 'Conversion Tracking'],
    },
  ];

  const features = [
    { title: 'Data-Driven', description: 'Every decision backed by analytics', icon: '📊' },
    { title: 'Fast Execution', description: 'Quick turnaround on all projects', icon: '⚡' },
    { title: 'Transparent Reporting', description: 'Real-time dashboards and insights', icon: '📈' },
    { title: 'Expert Team', description: '10+ years of combined experience', icon: '👥' },
  ];

  const testimonials = [
    {
      quote: 'They transformed our online presence completely. Our traffic increased by 300% in just 3 months!',
      author: 'Sarah Johnson',
      company: 'TechStart Inc.',
    },
    {
      quote: 'Professional, efficient, and results-driven. Best marketing agency we\'ve worked with.',
      author: 'Michael Chen',
      company: 'Digital Solutions',
    },
    {
      quote: 'Outstanding service and exceptional results. They truly understand digital marketing.',
      author: 'Emily Rodriguez',
      company: 'CodeCraft',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section - White Background */}
      <Hero
        headline="Transform Your Digital Presence"
        subheadline="Data-driven marketing solutions that deliver exceptional results."
        ctaText="Get Started"
        ctaLink="/contact"
      />

      {/* Services Overview - Black Background */}
      <section className="bg-gradient-dark px-4 py-24 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-5xl font-heading text-white sm:text-6xl">
              Our Services
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive solutions designed to elevate your brand
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                features={service.features}
                ctaText="Learn More"
                ctaLink="/services"
                variant="dark"
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-block text-white hover:text-accent font-heading text-lg transition-colors border-b-2 border-transparent hover:border-accent pb-1"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Features/Benefits - White Background */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-5xl font-heading text-foreground sm:text-6xl">
              Why Choose Us
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Excellence in every aspect of digital marketing
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="h-full text-center floating" 
                depth="3"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="mb-3 text-2xl font-heading text-foreground">
                  {feature.title}
                </h3>
                <p className="text-secondary">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview - Black Background */}
      <section className="bg-gradient-dark px-4 py-24 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-5xl font-heading text-white sm:text-6xl">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real results from real clients
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="h-full floating" depth="4" variant="dark">
              <h3 className="mb-4 text-3xl font-heading text-white">TechStart Inc.</h3>
              <p className="mb-6 text-gray-300 text-lg">
                Complete digital transformation resulting in 300% traffic increase.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="mr-3 text-accent text-xl">✓</span>
                  SEO Optimization
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-accent text-xl">✓</span>
                  Content Strategy
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-accent text-xl">✓</span>
                  PPC Campaigns
                </li>
              </ul>
            </Card>
            
            <Card className="h-full floating" depth="4" variant="dark">
              <h3 className="mb-4 text-3xl font-heading text-white">Digital Solutions</h3>
              <p className="mb-6 text-gray-300 text-lg">
                Brand redesign and marketing automation implementation.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="mr-3 text-accent text-xl">✓</span>
                  Brand Identity
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-accent text-xl">✓</span>
                  Marketing Automation
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-accent text-xl">✓</span>
                  Analytics Setup
                </li>
              </ul>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Link
              href="/portfolio"
              className="inline-block text-white hover:text-accent font-heading text-lg transition-colors border-b-2 border-transparent hover:border-accent pb-1"
            >
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - White Background */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-5xl font-heading text-foreground sm:text-6xl">
              Client Testimonials
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              What our clients say about us
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                company={testimonial.company}
                variant="white"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Black Background */}
      <section className="bg-gradient-dark px-4 py-24 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-6xl font-heading text-accent mb-2">500+</div>
              <div className="text-gray-300 text-lg">Clients Served</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-heading text-accent mb-2">1,200+</div>
              <div className="text-gray-300 text-lg">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-heading text-accent mb-2">250%</div>
              <div className="text-gray-300 text-lg">Avg. Growth</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-heading text-accent mb-2">98%</div>
              <div className="text-gray-300 text-lg">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Accent Background */}
      <CTA
        headline="Ready to Transform Your Business?"
        description="Let's discuss how we can help you achieve your marketing goals."
        primaryCtaText="Get Started"
        primaryCtaLink="/contact"
        secondaryCtaText="View Services"
        secondaryCtaLink="/services"
      />
    </main>
  );
}
