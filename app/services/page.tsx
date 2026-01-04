import ServiceCard from '@/components/ServiceCard';
import Card from '@/components/Card';
import CTA from '@/components/CTA';

export const metadata = {
  title: 'Services - Marketing Agency',
  description: 'Our comprehensive marketing service packages',
};

export default function ServicesPage() {
  const servicePackages = [
    {
      title: 'Starter',
      description: 'Perfect for small businesses getting started with digital marketing.',
      price: '₹99,999/mo',
      features: [
        'SEO Audit & Optimization',
        '5 Blog Posts per Month',
        'Social Media Management (3 platforms)',
        'Monthly Analytics Report',
        'Email Support',
      ],
      featured: false,
    },
    {
      title: 'Professional',
      description: 'Comprehensive marketing solution for growing businesses.',
      price: '₹2,49,999/mo',
      features: [
        'Everything in Starter',
        '10 Blog Posts per Month',
        'Social Media Management (5 platforms)',
        'PPC Campaign Management',
        'Content Strategy Development',
        'Weekly Analytics Report',
        'Priority Support',
        'Monthly Strategy Call',
      ],
      featured: true,
    },
    {
      title: 'Enterprise',
      description: 'Full-service marketing for established companies.',
      price: 'Custom',
      features: [
        'Everything in Professional',
        'Unlimited Content Creation',
        'All Social Media Platforms',
        'Multi-Channel PPC Campaigns',
        'Marketing Automation Setup',
        'Custom Analytics Dashboards',
        'Dedicated Account Manager',
        'Weekly Strategy Calls',
        'Custom Integrations',
      ],
      featured: false,
    },
  ];

  const additionalServices = [
    {
      title: 'SEO Optimization',
      description: 'Comprehensive search engine optimization to improve your rankings.',
      icon: '🔍',
    },
    {
      title: 'Content Marketing',
      description: 'Strategic content creation that engages and converts.',
      icon: '📝',
    },
    {
      title: 'PPC Advertising',
      description: 'Paid advertising campaigns with maximum ROI.',
      icon: '📊',
    },
    {
      title: 'Social Media Marketing',
      description: 'Build your brand presence across all social platforms.',
      icon: '📱',
    },
    {
      title: 'Email Marketing',
      description: 'Automated email campaigns that nurture leads.',
      icon: '✉️',
    },
    {
      title: 'Analytics & Reporting',
      description: 'Data-driven insights to optimize your marketing efforts.',
      icon: '📈',
    },
  ];

  const processSteps = [
    { step: '01', title: 'Discovery', description: 'We analyze your business goals and current marketing state.', icon: '🔎' },
    { step: '02', title: 'Strategy', description: 'Custom marketing strategy tailored to your needs.', icon: '💡' },
    { step: '03', title: 'Execution', description: 'Implementation of campaigns and optimizations.', icon: '🚀' },
    { step: '04', title: 'Optimization', description: 'Continuous monitoring and improvement of results.', icon: '⚡' },
  ];

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
            Our Services
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Comprehensive marketing solutions designed to grow your business.
          </p>
        </div>
      </section>

      {/* Service Packages Section - Black Background */}
      <section className="bg-gradient-dark px-4 py-24 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-5xl font-heading text-white sm:text-6xl">
              Service Packages
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the package that fits your business needs. All packages include our core services.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {servicePackages.map((pkg, index) => (
              <ServiceCard
                key={index}
                title={pkg.title}
                description={pkg.description}
                features={pkg.features}
                price={pkg.price}
                ctaText="Select Package"
                ctaLink="/contact"
                featured={pkg.featured}
                variant="dark"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services - White Background */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-5xl font-heading text-foreground sm:text-6xl">
              Additional Services
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Specialized solutions for your unique needs
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {additionalServices.map((service, index) => (
              <Card key={index} className="h-full text-center floating" depth="3">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="mb-3 text-2xl font-heading text-foreground">
                  {service.title}
                </h3>
                <p className="text-secondary">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process/How It Works - Black Background */}
      <section className="bg-gradient-dark px-4 py-24 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-5xl font-heading text-white sm:text-6xl">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our proven process for delivering results
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item, index) => (
              <Card key={index} className="h-full text-center floating" depth="4" variant="dark">
                <div className="text-6xl mb-4">{item.icon}</div>
                <div className="mb-4 text-4xl font-heading text-accent">
                  {item.step}
                </div>
                <h3 className="mb-3 text-xl font-heading text-white">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA
        headline="Ready to Get Started?"
        description="Choose a package or contact us to discuss your specific needs."
        primaryCtaText="Contact Us"
        primaryCtaLink="/contact"
        secondaryCtaText="View Portfolio"
        secondaryCtaLink="/portfolio"
      />
    </main>
  );
}
