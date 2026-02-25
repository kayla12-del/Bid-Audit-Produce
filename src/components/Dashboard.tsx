
import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  CheckCircle2,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const DATA = [
  { name: '02-18', bids: 12, risks: 4 },
  { name: '02-19', bids: 18, risks: 7 },
  { name: '02-20', bids: 15, risks: 3 },
  { name: '02-21', bids: 25, risks: 12 },
  { name: '02-22', bids: 32, risks: 8 },
  { name: '02-23', bids: 28, risks: 5 },
  { name: '02-24', bids: 42, risks: 14 },
];

const STATS = [
  { label: '今日审计标书', value: '42', change: '+12%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: '平均清标耗时', value: '45s', change: '-95%', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: '高危风险检出', value: '14', change: '+4', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: '合规通过率', value: '98.2%', change: '+0.5%', icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">控制台概览</h2>
          <p className="text-gray-500 text-sm mt-1">实时监控政企招投标审计动态与AI Agent运行状态</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            导出报告
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Zap className="w-4 h-4" />
            新建审计任务
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className={cn("p-2 rounded-lg", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <span className={cn("text-xs font-medium px-2 py-1 rounded-full", 
                stat.change.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
              )}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">审计趋势分析</h3>
            <select className="text-xs border-gray-200 rounded-md bg-gray-50 outline-none p-1">
              <option>最近7天</option>
              <option>最近30天</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorBids" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="bids" 
                  stroke="#2563EB" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorBids)" 
                  name="审计标书"
                />
                <Area 
                  type="monotone" 
                  dataKey="risks" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  fillOpacity={0} 
                  name="检出风险"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">AI Agent 资源消耗</h3>
          <div className="space-y-6">
            {[
              { name: 'DeepSeek (语义拆解)', usage: 78, color: 'bg-blue-600' },
              { name: 'GPT-4o-mini (数值计算)', usage: 42, color: 'bg-emerald-500' },
              { name: 'Qwen (信创对标)', usage: 65, color: 'bg-indigo-500' },
              { name: 'Python (硬性校验)', usage: 15, color: 'bg-amber-500' },
            ].map((agent) => (
              <div key={agent.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">{agent.name}</span>
                  <span className="text-gray-900 font-bold">{agent.usage}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${agent.usage}%` }}
                    className={cn("h-full rounded-full", agent.color)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex gap-3">
              <div className="p-2 bg-blue-600 rounded-lg h-fit">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-blue-800 font-bold">成本优化建议</p>
                <p className="text-[11px] text-blue-600 mt-1 leading-relaxed">
                  当前多模型路由机制已将推理成本降低 <span className="font-bold">42%</span>。建议对简单计算任务增加 GPT-4o-mini 权重。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { cn } from '../utils';
