import type { LucideIcon } from "lucide-react";
import {
  BadgeDollarSign,
  BookOpenText,
  Building2,
  DatabaseZap,
  Landmark,
  RadioTower,
  Scale,
  ShieldCheck,
} from "lucide-react";
import type {
  IndustryModelId,
  LifecycleModelId,
  ProductModelId,
} from "./visual-types";

export type ProductCategory = {
  id: string;
  index: string;
  label: string;
  eyebrow: string;
  summary: string;
  accent: string;
  products: Array<{
    name: string;
    description: string;
    href: string;
    tag: string;
    visual: ProductModelId;
  }>;
};

export type Industry = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
  metric: string;
  icon: LucideIcon;
  visual: IndustryModelId;
};

export const navigation = [
  { label: "产品与能力", href: "#platform" },
  { label: "行业方案", href: "#industries" },
  { label: "客户实践", href: "#trust" },
  { label: "关于拓尔思", href: "#about" },
  { label: "新闻洞察", href: "#insights" },
];

export const heroMetrics = [
  { value: "1993", label: "始于中文全文检索" },
  { value: "10,000+", label: "企业级客户" },
  { value: "5,000亿+", label: "高质量数据资产" },
  { value: "31", label: "全国分支机构" },
];

export const lifecycle = [
  {
    index: "01",
    title: "全域感知",
    caption: "DATA INGESTION",
    description: "连接公开网络、行业数据与企业知识，让复杂信息持续进入可计算状态。",
    visual: "sensor-array",
  },
  {
    index: "02",
    title: "可信治理",
    caption: "DATA FOUNDATION",
    description: "从采集、整合、检索到知识化治理，构建自主可控的数据基础设施。",
    visual: "governance-vault",
  },
  {
    index: "03",
    title: "语义认知",
    caption: "MODEL INTELLIGENCE",
    description: "以拓天大模型、NLP、知识图谱与多模态能力理解行业语境。",
    visual: "semantic-neuron",
  },
  {
    index: "04",
    title: "场景行动",
    caption: "AGENTIC ACTION",
    description: "将模型能力装进业务流程，用智能体协同让洞察真正转化为行动。",
    visual: "agent-router",
  },
] satisfies Array<{
  index: string;
  title: string;
  caption: string;
  description: string;
  visual: LifecycleModelId;
}>;

export const productCategories: ProductCategory[] = [
  {
    id: "data",
    index: "01",
    label: "大数据",
    eyebrow: "DATA INFRASTRUCTURE",
    summary: "覆盖数据应用、采集、治理、分析与可视化的全链路产品体系。",
    accent: "#5ee7ff",
    products: [
      {
        name: "网察",
        description: "网络舆情态势感知与洞察平台",
        href: "https://www.trs.com.cn/cpfw/dsj/sjyy/wc_yqjc_/",
        tag: "舆情监测",
        visual: "sentiment-radar",
      },
      {
        name: "数家",
        description: "高信源、精加工的资讯数据云服务",
        href: "https://www.trs.com.cn/cpfw/dsj/sjyy/sj_mtzxsjyfw_/",
        tag: "数据云服务",
        visual: "data-cloud",
      },
      {
        name: "海策",
        description: "政策全生命周期管理与智能分析",
        href: "https://www.trs.com.cn/cpfw/dsj/sjyy/hc_zcdn_/",
        tag: "政策大脑",
        visual: "policy-stack",
      },
      {
        name: "数星产业大脑",
        description: "融合内外部数据的产业智慧大脑",
        href: "https://www.trs.com.cn/cpfw/dsj/sjyy/sxcydn/",
        tag: "产业智能",
        visual: "industry-constellation",
      },
      {
        name: "TRS 海贝",
        description: "完全国产自研的搜索型（向量）数据库",
        href: "https://www.trs.com.cn/cpfw/dsj/sjzl/hb_dsjglxt_/",
        tag: "向量数据库",
        visual: "vector-vault",
      },
      {
        name: "海蜘 / 海聚",
        description: "分布式采集与流批一体的数据融合底座",
        href: "https://www.trs.com.cn/cpfw/dsj/sjcj/hz_fbscjxt_/",
        tag: "采集治理",
        visual: "fusion-web",
      },
    ],
  },
  {
    id: "ai",
    index: "02",
    label: "人工智能",
    eyebrow: "SEMANTIC INTELLIGENCE",
    summary: "从行业大模型到知识工程与多模态能力，为复杂业务提供可解释智能。",
    accent: "#7c9cff",
    products: [
      {
        name: "拓天大模型",
        description: "面向媒体、金融、政务等关键行业的场景化大模型",
        href: "https://www.trs.com.cn/",
        tag: "行业大模型",
        visual: "foundation-model",
      },
      {
        name: "智拓",
        description: "企业级人工智能开放平台",
        href: "https://www.trs.com.cn/cpfw/rgzn/aiptfw/zt_rgznkfpt_/",
        tag: "AI 平台",
        visual: "ai-workbench",
      },
      {
        name: "安拓",
        description: "知识图谱建模、融合与应用平台",
        href: "https://www.trs.com.cn/cpfw/rgzn/aiptfw/at_zstppt_/",
        tag: "知识图谱",
        visual: "knowledge-graph",
      },
      {
        name: "智语 CKM",
        description: "面向中文语义理解的自然语言处理平台",
        href: "https://www.trs.com.cn/cpfw/rgzn/zryycl/zy_CKM_NLP_pt/",
        tag: "NLP",
        visual: "semantic-wave",
      },
      {
        name: "TRS 智眼",
        description: "图像与视频内容的智能识别引擎",
        href: "https://www.trs.com.cn/cpfw/rgzn/txfxycl/zy_txspsblj_/",
        tag: "多模态",
        visual: "vision-aperture",
      },
      {
        name: "小思",
        description: "面向行业知识服务的智能对话机器人",
        href: "https://www.trs.com.cn/cpfw/rgzn/zndhjqr/xs/",
        tag: "智能交互",
        visual: "dialogue-agent",
      },
    ],
  },
  {
    id: "security",
    index: "03",
    label: "数据安全",
    eyebrow: "TRUSTED SECURITY",
    summary: "围绕边界安全、大数据安全与物联网安全，建立可信的数据流通通道。",
    accent: "#ff8b5f",
    products: [
      {
        name: "天行 GAP",
        description: "安全隔离与信息交换系统",
        href: "https://www.trs.com.cn/cpfw/aq/bjaq/txaqglyxxjhxtgap/",
        tag: "边界安全",
        visual: "isolation-gate",
      },
      {
        name: "天行 UIS",
        description: "安全单向导入与数据传输系统",
        href: "https://www.trs.com.cn/cpfw/aq/bjaq/txaqdxdrxtuis/",
        tag: "单向导入",
        visual: "one-way-tunnel",
      },
      {
        name: "天行 MTP",
        description: "跨域视频交换与安全传输系统",
        href: "https://www.trs.com.cn/cpfw/aq/bjaq/txaqspjhxtmtp/",
        tag: "视频交换",
        visual: "video-packet",
      },
      {
        name: "天行 DTP",
        description: "安全数据交换系统",
        href: "https://www.trs.com.cn/cpfw/aq/bjaq/txaqsjjhxtdtp/",
        tag: "数据交换",
        visual: "secure-bridge",
      },
      {
        name: "天行 BOP",
        description: "边界安全运维管理平台",
        href: "https://www.trs.com.cn/cpfw/aq/dsjaq/txbjaqywglptbop/",
        tag: "安全运维",
        visual: "operations-orbit",
      },
      {
        name: "天行 DAS",
        description: "数据库安全审计与性能监测",
        href: "https://www.trs.com.cn/cpfw/aq/dsjaq/txsjkaqsjjxnjcsjxtdas/",
        tag: "安全审计",
        visual: "audit-scanner",
      },
    ],
  },
  {
    id: "cloud",
    index: "04",
    label: "云与应用",
    eyebrow: "CLOUD APPLICATIONS",
    summary: "把数据、模型与行业知识封装成开箱即用的云服务与业务应用。",
    accent: "#a6f0bd",
    products: [
      {
        name: "数星风控",
        description: "基于海量数据的金融智能知识云服务",
        href: "https://www.trs.com.cn/cpfw/dsj/sjyy/sxfk/",
        tag: "金融风控",
        visual: "risk-shield",
      },
      {
        name: "数星电报",
        description: "企业、研报、产业与政策的一站式查询",
        href: "https://www.trs.com.cn/cpfw/dsj/sjyy/sxdb/",
        tag: "产业资讯",
        visual: "market-stream",
      },
      {
        name: "天目",
        description: "一体化、智能化的开源情报服务",
        href: "https://www.trs.com.cn/cpfw/dsj/sjyy/tm_kyqb_/",
        tag: "开源情报",
        visual: "intel-telescope",
      },
      {
        name: "网搜",
        description: "安全可靠、智能易用的网站搜索服务",
        href: "https://www.trs.com.cn/cpfw/dsj/sjyy/ws/",
        tag: "智能搜索",
        visual: "search-lens",
      },
      {
        name: "可视化大屏云",
        description: "零代码拖拽式数据可视化大屏制作",
        href: "https://www.trs.com.cn/cpfw/dsj/sjksh/sjkshdpyfwpt/",
        tag: "数据可视化",
        visual: "dashboard-cubes",
      },
      {
        name: "天枢",
        description: "面向企业应用的云原生技术平台",
        href: "https://www.trs.com.cn/cpfw/qt/kfzfw/trstsyysjspt/",
        tag: "云原生底座",
        visual: "cloud-cluster",
      },
    ],
  },
];

export const industries: Industry[] = [
  {
    id: "government",
    index: "01",
    name: "数字政府",
    tagline: "让公共服务更懂需求",
    description: "以数据治理、智能搜索与知识服务支撑政务公开、政务服务和智慧监管。",
    href: "https://www.trs.com.cn/xyfa/szzf/",
    metric: "GOVERNMENT",
    icon: Landmark,
    visual: "civic-tower",
  },
  {
    id: "finance",
    index: "02",
    name: "金融科技",
    tagline: "让风险在发生前被看见",
    description: "覆盖资讯、风控、消保与监管科技，以语义智能提升金融决策效率。",
    href: "https://www.trs.com.cn/xyfa/jrkj/",
    metric: "FINTECH",
    icon: BadgeDollarSign,
    visual: "finance-engine",
  },
  {
    id: "media",
    index: "03",
    name: "媒体融合",
    tagline: "让内容生产进入智能协同",
    description: "连接策采编发评全流程，推动主流媒体内容资产化与传播智能化。",
    href: "https://www.trs.com.cn/xyfa/mtrh/",
    metric: "MEDIA",
    icon: RadioTower,
    visual: "media-broadcast",
  },
  {
    id: "safety",
    index: "04",
    name: "公共安全",
    tagline: "让复杂线索形成行动答案",
    description: "融合开源情报、知识图谱与大数据分析，服务公共安全智能研判。",
    href: "https://www.trs.com.cn/xyfa/ggaq/",
    metric: "PUBLIC SAFETY",
    icon: ShieldCheck,
    visual: "safety-command",
  },
  {
    id: "enterprise",
    index: "05",
    name: "企业数智化",
    tagline: "让组织知识持续生长",
    description: "打通数据、内容与知识资产，构建面向企业流程的智能中枢。",
    href: "https://www.trs.com.cn/xyfa/qyszhzx/",
    metric: "ENTERPRISE",
    icon: Building2,
    visual: "enterprise-twin",
  },
  {
    id: "ip",
    index: "06",
    name: "知识产权",
    tagline: "让创新成果被精准发现",
    description: "以检索、语义分析与专利数据服务支撑知识产权创造、保护与运用。",
    href: "https://www.trs.com.cn/xyfa/zscq/",
    metric: "INTELLECTUAL PROPERTY",
    icon: Scale,
    visual: "patent-balance",
  },
  {
    id: "publishing",
    index: "07",
    name: "出版",
    tagline: "让专业内容抵达更多读者",
    description: "用语义智能重构出版内容生产、知识服务与融合传播链路。",
    href: "https://www.trs.com.cn/xyfa/cb_823/",
    metric: "PUBLISHING",
    icon: BookOpenText,
    visual: "publishing-knowledge",
  },
];

export const clientGroups = [
  {
    id: "enterprise",
    label: "企业用户",
    icon: Building2,
    names: [
      "中国石油",
      "中国建筑",
      "航空工业",
      "中国移动",
      "中国电信",
      "中国联通",
      "南方电网",
      "中国能建",
      "海尔集团",
      "宝马（中国）",
      "佳能（中国）",
      "通用技术",
    ],
  },
  {
    id: "government",
    label: "党政用户",
    icon: Landmark,
    names: [
      "中国政府网",
      "国家企业信用信息公示系统",
      "信用中国",
      "国家知识产权检索系统",
      "人民日报国际传播工程",
      "国家级关键数据基础设施",
    ],
  },
  {
    id: "media",
    label: "媒体用户",
    icon: RadioTower,
    names: [
      "中央级媒体",
      "省级融媒体平台",
      "城市媒体集团",
      "国际传播平台",
      "专业出版机构",
      "全媒体生产中心",
    ],
  },
  {
    id: "finance",
    label: "金融用户",
    icon: DatabaseZap,
    names: [
      "金融监管机构",
      "商业银行",
      "证券机构",
      "保险机构",
      "地方金融平台",
      "产业投资机构",
    ],
  },
];

export const companyMetrics = [
  { value: "2,000+", label: "专业员工" },
  { value: "8", label: "研发机构" },
  { value: "3", label: "省部级重点实验室" },
  { value: "100+", label: "发明专利" },
  { value: "1,000+", label: "软件著作权" },
  { value: "4 / 31", label: "区域中心 / 分支机构" },
];

export const insights = [
  {
    date: "2025.02.10",
    category: "技术进展",
    title: "多维集成融合 DeepSeek，拓尔思以“平台 + 系统 + 服务”领航行业大模型应用",
    href: "https://www.trs.com.cn/ljwm/xwhd/202502/t20250210_10494.html",
  },
  {
    date: "2025.01.24",
    category: "公司动态",
    title: "拓尔思 2025 年新年寄语：回望来时路，眺望新征程",
    href: "https://www.trs.com.cn/ljwm/xwhd/202501/t20250124_10481.html",
  },
  {
    date: "2023.06.29",
    category: "产品发布",
    title: "拓尔思拓天大模型正式发布，聚焦大模型场景化应用和行业落地",
    href: "https://www.trs.com.cn/ljwm/xwhd/202306/t20230629_10053.html",
  },
];

export const officialLinks = {
  home: "https://www.trs.com.cn/",
  about: "https://www.trs.com.cn/ljwm/gsjj/",
  news: "https://www.trs.com.cn/ljwm/xwhd/",
  documents: "https://www.trs.com.cn/fwyzc_755/wdzx/",
  ecosystem: "https://www.trs.com.cn/fwyzc_755/sttx/",
  investor:
    "https://www.cninfo.com.cn/new/disclosure/stock?orgId=9900016933&stockCode=300229#latestAnnouncement",
};
