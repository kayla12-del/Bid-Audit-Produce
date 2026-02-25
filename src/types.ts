
export type AuditStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface AuditStep {
  id: string;
  agent: 'DeepSeek' | 'Qwen' | 'GPT-4o-mini' | 'Python-Script';
  action: string;
  status: 'waiting' | 'running' | 'done' | 'error';
  timestamp: string;
  output?: string;
}

export interface RiskPoint {
  id: string;
  category: 'Compliance' | 'Calculation' | 'Xinchuang' | 'RedLine';
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  location: string; // e.g., Page 12, Section 3.2
  suggestion: string;
}

export interface BidDocument {
  id: string;
  name: string;
  uploadDate: string;
  status: AuditStatus;
  score: number;
  riskCount: number;
  steps: AuditStep[];
  risks: RiskPoint[];
}

export const MOCK_BIDS: BidDocument[] = [
  {
    id: 'BID-2024-001',
    name: '某市政务云平台信创改造项目标书',
    uploadDate: '2024-02-24 09:00',
    status: 'completed',
    score: 82,
    riskCount: 3,
    steps: [],
    risks: [
      {
        id: 'R1',
        category: 'Xinchuang',
        severity: 'High',
        description: '核心数据库组件未提供信创适配证明',
        location: '附件4-技术规格偏离表',
        suggestion: '要求投标人补充提供信创目录入围证明或兼容性测试报告'
      },
      {
        id: 'R2',
        category: 'RedLine',
        severity: 'High',
        description: '投标有效期短于招标文件要求的90天',
        location: '投标函-第二条',
        suggestion: '判定为实质性不响应，建议废标'
      },
      {
        id: 'R3',
        category: 'Calculation',
        severity: 'Medium',
        description: '分项报价汇总金额与总价不一致（偏差0.5%）',
        location: '开标一览表 vs 详细报价单',
        suggestion: '启动澄清程序，以总价为准或按招标文件修正规则处理'
      }
    ]
  },
  {
    id: 'BID-2024-002',
    name: '省大数据中心算力调度平台采购',
    uploadDate: '2024-02-24 10:15',
    status: 'processing',
    score: 0,
    riskCount: 0,
    steps: [
      { id: 's1', agent: 'DeepSeek', action: '语义拆解：识别关键技术指标', status: 'done', timestamp: '10:15:02' },
      { id: 's2', agent: 'GPT-4o-mini', action: '数值核验：计算报价逻辑一致性', status: 'running', timestamp: '10:15:10' },
      { id: 's3', agent: 'Python-Script', action: '硬性校验：红线指标预扫描', status: 'waiting', timestamp: '-' }
    ],
    risks: []
  }
];
