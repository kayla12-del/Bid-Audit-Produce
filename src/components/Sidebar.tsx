
import React from 'react';
import { 
  LayoutDashboard, 
  FileSearch, 
  Database, 
  ShieldCheck, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '../utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NAV_ITEMS = [
  { id: 'dashboard', label: '控制台概览', icon: LayoutDashboard },
  { id: 'audit', label: '智能清标中心', icon: FileSearch },
  { id: 'rag', label: '合规知识库', icon: Database },
  { id: 'security', label: '审计安全治理', icon: ShieldCheck },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-[#111827] text-white h-screen flex flex-col border-r border-white/10">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">
          A
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-tight">政企招投标审计</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Smart Audit v2.5</p>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group",
              activeTab === item.id 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className={cn("w-4 h-4", activeTab === item.id ? "text-white" : "text-gray-400 group-hover:text-white")} />
            <span className="flex-1 text-left">{item.label}</span>
            {activeTab === item.id && <ChevronRight className="w-3 h-3 opacity-50" />}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-white/5 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors">
          <Settings className="w-4 h-4" />
          <span>系统设置</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 transition-colors">
          <LogOut className="w-4 h-4" />
          <span>退出登录</span>
        </button>
      </div>
    </aside>
  );
};
