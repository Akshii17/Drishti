import React from 'react'
import {
  BrainCircuit, AlertTriangle, ShieldCheck, CheckCircle2, TrendingUp,
  Building2, Users, Wrench, RefreshCw, ArrowRight, Info, Sparkles
} from 'lucide-react'
import { Panel, SectionHeading } from '../../components/common/Panel'
import { MetricCard } from '../../components/common/MetricCard'
import { Badge } from '../../components/common/Badge'
import { historicalIntelligencePatterns } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

export function IntelligencePage() {
  const { centres, correctiveActions, setSelectedCentreDetail } = useApp()

  const unresolvedActions = correctiveActions.filter((ca) => ca.status !== 'Completed')

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionHeading
        eyebrow="Pattern Synthesis"
        title="Historical Intelligence & Recurring Patterns"
        subtitle="Identifies chronic attendance drops, persistent equipment sightline obstructions, and recurring centre-level compliance bottlenecks."
      />

      {/* Transparent AI Heuristic Disclaimer */}
      <div className="rounded-2xl border border-teal-200 bg-teal-50/70 p-4 text-xs text-teal-950 flex items-start gap-2.5 shadow-xs">
        <Sparkles size={18} className="text-teal-800 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold tracking-wide">
            DEMONSTRATION HEURISTIC NOTICE:
          </span>
          <span className="ml-1 text-slate-700">
            Pattern detections and composite compliance indices shown below represent an illustrative demonstration heuristic. In production systems, these are validated through historical regression against authorized physical field audit logs.
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Recurring Patterns"
          value={historicalIntelligencePatterns.length}
          hint="Systemic trends identified"
          icon={BrainCircuit}
          tone="teal"
        />
        <MetricCard
          label="Unresolved CAs"
          value={unresolvedActions.length}
          hint="Pending corrective tasks"
          icon={AlertTriangle}
          tone="yellow"
        />
        <MetricCard
          label="Chronic Angle Issues"
          value="2 Workshops"
          hint="Persistent sightline blocks"
          icon={Wrench}
          tone="blue"
        />
        <MetricCard
          label="Repeat Attendance Dips"
          value="1 Centre"
          hint="Post-recess vacancy trend"
          icon={Users}
          tone="red"
        />
      </div>

      {/* Identified Pattern Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Detected Longitudinal Patterns
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          {historicalIntelligencePatterns.map((pat) => (
            <Panel key={pat.id} className="p-5 flex flex-col justify-between hover:shadow-card transition">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                    {pat.id}
                  </span>
                  <Badge tone={pat.severity === 'High' ? 'red' : 'yellow'} size="xs">
                    {pat.severity} Pattern
                  </Badge>
                </div>

                <h4 className="text-sm font-bold text-ink">{pat.category}</h4>
                <p className="text-xs text-teal-900 font-semibold mt-1">
                  {pat.centreName}
                </p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {pat.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Recommended Administrative Action:
                </span>
                <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {pat.recommendedAction}
                </p>
                <p className="text-[10px] text-slate-400 mt-2">
                  Corroborated across {pat.evidenceSamples} separate session logs
                </p>
              </div>
            </Panel>
          ))}
        </div>
      </div>

      {/* Centre-level Risk Priority Heuristic Matrix */}
      <Panel className="overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-ink">Centre-Level Review Priority Ranking</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Composite priority weighted by unresolved alerts, camera downtime, and open corrective actions.
            </p>
          </div>
          <Badge tone="yellow" size="xs">
            Demonstration Heuristic
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3">Priority Rank</th>
                <th className="px-5 py-3">Centre Name & ID</th>
                <th className="px-5 py-3">District</th>
                <th className="px-5 py-3">Open CAs</th>
                <th className="px-5 py-3">Audit Score</th>
                <th className="px-5 py-3">Inspection Urgency</th>
                <th className="px-5 py-3 text-right">Drilldown</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { rank: '#1', centre: 'Thane Technical Institute', id: 'MH-03', district: 'Thane', openCAs: 2, score: '78%', urgency: 'High (Camera Drop & Tools)' },
                { rank: '#2', centre: 'Chhatrapati Sambhajinagar ITI', id: 'MH-06', district: 'Chhatrapati Sambhajinagar', openCAs: 1, score: '82%', urgency: 'Medium (Attendance Gap)' },
                { rank: '#3', centre: 'Nashik Training Centre', id: 'MH-08', district: 'Nashik', openCAs: 1, score: '84%', urgency: 'Medium (Equipment SM-04)' },
                { rank: '#4', centre: 'Pune Skills Hub', id: 'MH-04', district: 'Pune', openCAs: 1, score: '88%', urgency: 'Low (Follow-up In Progress)' },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition">
                  <td className="px-5 py-3.5 font-bold font-mono text-teal-800">{row.rank}</td>
                  <td className="px-5 py-3.5">
                    <p className="font-bold text-ink">{row.centre}</p>
                    <p className="text-[10px] font-mono text-slate-400">{row.id}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{row.district}</td>
                  <td className="px-5 py-3.5 font-bold text-amber-700">{row.openCAs}</td>
                  <td className="px-5 py-3.5 font-bold text-ink">{row.score}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={row.urgency.startsWith('High') ? 'red' : 'yellow'} size="xs">
                      {row.urgency}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => {
                        const target = centres.find((c) => c.id === row.id)
                        if (target) setSelectedCentreDetail(target)
                      }}
                      className="text-xs font-bold text-teal-800 hover:underline"
                    >
                      Audit Details &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}
