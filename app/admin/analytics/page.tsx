import Card from '@/components/Card'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-heading text-foreground">Analytics</h1>
        <p className="mt-2 text-secondary">View website analytics and insights</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-sm text-secondary mb-2">Total Page Views</h3>
          <p className="text-3xl font-heading text-foreground">0</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm text-secondary mb-2">Unique Visitors</h3>
          <p className="text-3xl font-heading text-foreground">0</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm text-secondary mb-2">Conversion Rate</h3>
          <p className="text-3xl font-heading text-foreground">0%</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm text-secondary mb-2">Avg. Session Duration</h3>
          <p className="text-3xl font-heading text-foreground">0m</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-2xl font-heading text-foreground mb-4">Page Views</h2>
        <p className="text-secondary text-center py-8">
          Analytics data will be displayed here once page views are tracked.
        </p>
      </Card>
    </div>
  )
}

