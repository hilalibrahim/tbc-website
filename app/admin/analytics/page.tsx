export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C] bg-clip-text text-transparent">Analytics</h1>
        <p className="mt-2 text-[#8C8C8C]">View website analytics and insights</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
          <h3 className="text-sm text-[#8C8C8C] mb-2">Total Page Views</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-[#D9D9D9] to-[#BFBFBF] bg-clip-text text-transparent">0</p>
        </div>
        <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
          <h3 className="text-sm text-[#8C8C8C] mb-2">Unique Visitors</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-[#D9D9D9] to-[#BFBFBF] bg-clip-text text-transparent">0</p>
        </div>
        <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
          <h3 className="text-sm text-[#8C8C8C] mb-2">Conversion Rate</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-[#D9D9D9] to-[#BFBFBF] bg-clip-text text-transparent">0%</p>
        </div>
        <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
          <h3 className="text-sm text-[#8C8C8C] mb-2">Avg. Session Duration</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-[#D9D9D9] to-[#BFBFBF] bg-clip-text text-transparent">0m</p>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <h2 className="text-2xl font-bold text-[#D9D9D9] mb-4">Page Views</h2>
        <p className="text-[#8C8C8C] text-center py-8">
          Analytics data will be displayed here once page views are tracked.
        </p>
      </div>
    </div>
  )
}

