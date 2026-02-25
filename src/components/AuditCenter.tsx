
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  FileText, 
  Search, 
  Filter, 
  AlertCircle, 
  CheckCircle, 
  Loader2,
  Cpu,
  Terminal,
  ArrowRight,
  ExternalLink,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { BidDocument, MOCK_BIDS, AuditStep, RiskPoint } from '../types';
import { cn } from '../utils';

export const AuditCenter: React.FC = () => {
  const [bids, setBids] = useState<BidDocument[]>(MOCK_BIDS);
  const [selectedBid, setSelectedBid] = useState<BidDocument | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      // In a real app, this would trigger the AI process
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[calc(100vh-120px)]">
      {/* Left List */}
      <div className="xl:col-span-4 flex flex-col gap-4 overflow-hidden">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索标书编号或名称..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2" onClick={handleUpload}>
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              上传新标书
            </button>
            <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {bids.map((bid) => (
            <button
              key={bid.id}
              onClick={() => setSelectedBid(bid)}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all duration-200",
                selectedBid?.id === bid.id 
                  ? "bg-blue-50 border-blue-200 shadow-sm" 
                  : "bg-white border-gray-200 hover:border-blue-200"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded uppercase">
                  {bid.id}
                </span>
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                  bid.status === 'completed' ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                )}>
                  {bid.status === 'completed' ? '已完成' : '审计中'}
                </span>
              </div>
              <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{bid.name}</h4>
              <div className="flex items-center gap-4 mt-3 text-[11px] text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {bid.uploadDate.split(' ')[0]}
                </span>
                {bid.status === 'completed' && (
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <AlertCircle className="w-3 h-3" /> {bid.riskCount} 风险点
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Detail */}
      <div className="xl:col-span-8 overflow-hidden">
        <AnimatePresence mode="wait">
          {selectedBid ? (
            <motion.div
              key={selectedBid.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col gap-6"
            >
              {/* Header Info */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex-shrink-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedBid.name}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm text-gray-500">审计流水号: {selectedBid.id}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-sm text-gray-500">上传时间: {selectedBid.uploadDate}</span>
                      <span className="text-gray-300">|</span>
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-red-50 border border-red-100 rounded text-[10px] font-bold text-red-600">
                        <ShieldCheck className="w-3 h-3" />
                        全局红线预扫描: 已通过
                      </div>
                    </div>
                  </div>
                  {selectedBid.status === 'completed' && (
                    <div className="text-right">
                      <div className="text-3xl font-black text-blue-600">{selectedBid.score}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">合规评分 (满分100)</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Tabs */}
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                {/* Agent Thinking Process */}
                <div className="bg-[#111827] rounded-xl border border-white/10 overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">AI Agent 决策链执行状态</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] text-emerald-400 font-mono">LIVE_AUDIT_STREAM</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    {(selectedBid.status === 'processing' ? selectedBid.steps : [
                      { id: 'f1', agent: 'DeepSeek', action: '语义拆解：识别关键技术指标', status: 'done', timestamp: '09:00:02' },
                      { id: 'f2', agent: 'GPT-4o-mini', action: '数值核验：计算报价逻辑一致性', status: 'done', timestamp: '09:00:15' },
                      { id: 'f3', agent: 'Python-Script', action: '硬性校验：红线指标预扫描', status: 'done', timestamp: '09:00:45' }
                    ] as AuditStep[]).map((step, idx) => (
                      <div key={step.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10",
                            step.status === 'done' ? "bg-emerald-500 text-white" : 
                            step.status === 'running' ? "bg-blue-500 text-white animate-pulse" : "bg-gray-700 text-gray-400"
                          )}>
                            {step.status === 'done' ? <CheckCircle className="w-3 h-3" /> : idx + 1}
                          </div>
                          {idx < 2 && <div className="w-px h-full bg-gray-700 my-1" />}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">[{step.agent}]</span>
                              <p className="text-sm text-gray-300 mt-1">{step.action}</p>
                            </div>
                            <span className="text-[10px] font-mono text-gray-500">{step.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Points */}
                {selectedBid.status === 'completed' && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      检出风险点 ({selectedBid.risks.length})
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedBid.risks.map((risk) => (
                        <div key={risk.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-amber-200 transition-colors">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded uppercase",
                                risk.severity === 'High' ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                              )}>
                                {risk.severity === 'High' ? '高危' : '中危'}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded uppercase">
                                {risk.category}
                              </span>
                            </div>
                            <span className="text-[11px] text-gray-400 font-medium">{risk.location}</span>
                          </div>
                          <h5 className="font-bold text-gray-900 mt-3">{risk.description}</h5>
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-600 leading-relaxed">
                              <span className="font-bold text-blue-600 mr-2">专家建议:</span>
                              {risk.suggestion}
                            </p>
                          </div>
                          <div className="mt-4 flex justify-end gap-2">
                            <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                              查看原文 <ExternalLink className="w-3 h-3" />
                            </button>
                            <button className="text-xs font-bold text-gray-500 hover:text-gray-700">标记为已处理</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center bg-white rounded-xl border border-dashed border-gray-300 p-12">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">选择一份标书开始审计</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-xs">
                点击左侧列表中的标书，或上传新的PDF/Word文档，AI Agent 将自动执行多维清标流程。
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
