
import React from 'react';
import { 
  Database, 
  Search, 
  Plus, 
  FileText, 
  ShieldCheck, 
  RefreshCw,
  ExternalLink,
  Tag
} from 'lucide-react';

const KNOWLEDGE_BASES = [
  { id: 'kb1', name: '国家信创目录 (2024版)', count: 1240, type: 'Official', lastSync: '2小时前' },
  { id: 'kb2', name: '政企招采红线库', count: 85, type: 'Internal', lastSync: '1天前' },
  { id: 'kb3', name: '历史废标案例集', count: 450, type: 'Case', lastSync: '3天前' },
  { id: 'kb4', name: '行业技术标准 (能源/金融)', count: 2100, type: 'Standard', lastSync: '5小时前' },
];

export const KnowledgeBase: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">合规知识库 (RAG)</h2>
          <p className="text-gray-500 text-sm mt-1">管理用于 AI 审计对标的私有知识库与行业标准</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          导入新规章
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {KNOWLEDGE_BASES.map((kb) => (
          <div key={kb.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-[10px] font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded-full uppercase tracking-wider">
                {kb.type}
              </span>
            </div>
            <h4 className="font-bold text-gray-900">{kb.name}</h4>
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3" /> {kb.count} 条目
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> {kb.lastSync}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="font-bold text-gray-900 text-sm">实时检索与对标预览</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input 
                type="text" 
                placeholder="搜索知识点..."
                className="pl-8 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { tag: '信创合规', title: '关于加强政企采购中关键信息基础设施自主可控的指导意见', date: '2024-01-15', source: '工信部' },
            { tag: '废标红线', title: '投标函签字盖章不全或未按要求密封的判定标准', date: '2023-11-20', source: '财政部87号令' },
            { tag: '技术指标', title: '分布式数据库性能测试标准与信创适配要求', date: '2024-02-10', source: '行业协会' },
          ].map((item, i) => (
            <div key={i} className="p-4 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4 text-blue-400" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{item.tag}</span>
                    <h5 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h5>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-[11px] text-gray-400">
                    <span>发布单位: {item.source}</span>
                    <span>发布日期: {item.date}</span>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <button className="text-xs font-bold text-blue-600 hover:underline">查看全部 3,825 条知识点</button>
        </div>
      </div>
    </div>
  );
};
