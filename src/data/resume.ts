export const profile = {
  name: "郭佩琦",
  romanized: "Guo Peiqi",
  email: "2576593778@qq.com",
  phone: "18621617386",
  wechat: "2576593778",
  location: "上海",
  targetCities: "上海、南京",
  origin: "山西太原",
  travel: "可适应出差与驻场",
  school: "上海海事大学",
  degree: "工业工程 · 本科",
  studyPeriod: "2022.09 — 2026.06",
  education: "大一学年专业前 5%，转入工业工程。获国家三等奖学金及 APMCM 亚太地区大学生数学建模竞赛三等奖。",
};

export const focus = [
  {
    title: "AI 产品经理",
    description: "我用 GeoPulse 追踪同一组问题在不同模型中的回答，保留每条判断的原文证据。",
    project: "geo",
    action: "查看 GeoPulse",
  },
  {
    title: "AI 售前 / FDE",
    description: "我为制造业客户搭建仿真 Demo，也把 948 页产品资料整理成可检索的建模助手。",
    project: "rag",
    action: "查看建模助手",
  },
  {
    title: "AI 运营",
    description: "我把选题、脚本、分镜和质量检查串进口播工作台，让每一步都能回看、修改。",
    project: "film",
    action: "查看口播工作台",
  },
];

export const experience = [
  {
    period: "2026.07 — 至今",
    company: "上海泰珂玛信息技术有限公司",
    role: "售前工程师 & 讲师 · Minitab 中国总代",
    details: [
      "从 0 到 1 推进 Simul8 仿真软件中国市场产品线，协同销售与市场开展客户拓展、产品演示与公开课。",
      "围绕产能瓶颈、产线布局、物流和 ROI 进行需求澄清与方案设计。累计演示 20+ 次，推动 15+ 家客户进入下一阶段，独立交付 10+ 个场景化 Demo 模型。",
      "支持东风本田 AGV 投入评估，帮助客户避免多投 8 台设备，潜在节省测算超过 400 万元。",
      "整理 948 页产品资料，搭建 RAG + Prompt 建模助理，沉淀售前 SOP、FAQ 与培训材料，持续收集 Bad Case 并优化团队答疑流程。",
    ],
  },
  {
    period: "2026.04 — 2026.06",
    company: "上汽安吉物流股份有限公司",
    role: "市场开发实习生 · 整车物流",
    details: [
      "配合商务对接、招投标资料准备与报价协同。",
      "使用 AI 工具归集、清洗质损数据并识别异常，维护台账，定位高发环节并提出改善建议。",
    ],
  },
  {
    period: "2026.01 — 2026.03",
    company: "上港集团",
    role: "码头营运实习生",
    details: [
      "在中控室协调码头靠离泊、装卸箱及跨环节异常响应。",
      "归集调度与异常记录，梳理园区、仓储、运输流程及成本构成。",
    ],
  },
];

export const capabilities = [
  {
    title: "产品规划",
    items: ["用户与竞品研究", "产品定位", "MVP 范围", "PRD 与用户流程", "指标与实验"],
  },
  {
    title: "方案与交付",
    items: ["需求澄清", "场景拆解", "POC / Demo", "ROI 论证", "培训与交付复盘"],
  },
  {
    title: "AI 运营",
    items: ["知识整理", "检索优化", "Prompt", "FAQ / SOP", "Bad Case 归因", "工作流与质检"],
  },
  {
    title: "工具与技术",
    items: ["Python", "LLM API", "RAG", "Agent / Workflow", "Coze / Dify", "Streamlit", "SQL / Excel", "Simul8 / Minitab"],
  },
];

export const categories = ["全部", "AI 产品", "工业软件", "Agent 与工作流"] as const;
export type Category = (typeof categories)[number];

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<Category, "全部">;
  role: string;
  status: string;
  summary: string;
  challenge: string;
  contribution: string[];
  outcome: string;
  tags: string[];
  image: string;
  alt: string;
  caption: string;
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    id: "geo",
    title: "GeoPulse",
    subtitle: "AI 品牌回答监测与 GEO 实验工具",
    category: "AI 产品",
    role: "产品负责人",
    status: "本地单用户 MVP",
    summary: "记录品牌在不同模型回答中的表现，支持原文复核与多轮对照。",
    challenge: "品牌在 AI 回答中是否被提及、模型描述是否准确？需要把重复采样和原文证据放在同一套流程里。",
    contribution: [
      "完成公开需求信号与竞品研究、产品定位、MVP PRD、用户流程、数据字典和指标设计。",
      "定义提及数、提及率、问句范围与回答完整性，提供原文证据和人工复核，将监测与优化实验分开。",
      "接入 DeepSeek Flash 与豆包 Lite，实现问句管理、采样、结果持久化、平台与轮次筛选、报告导出、备份恢复和优化假设台账。",
    ],
    outcome: "交付本地 MVP。用 10 条固定问句、2 个 API、3 轮条件一致的实验采集 60 条真实回答，验证采集链路、问句级证据与轮次对照。",
    tags: ["GEO", "DeepSeek Flash", "豆包 Lite"],
    image: "geopulse.png",
    alt: "GeoPulse 品牌可见度总览，显示实验采样、指标和筛选选项",
    caption: "本地 MVP 总览 · 60 条真实 API 实验回答",
  },
  {
    id: "rag",
    title: "AI 建模助手与知识库",
    subtitle: "Simul8 售前交付与团队赋能",
    category: "工业软件",
    role: "售前工程师",
    status: "工作场景实践",
    summary: "把分散的 Simul8 资料整合成售前知识库与中文建模辅助流程。",
    challenge: "948 页产品资料分散，客户的技术问题重复出现，售前需要更容易复用的资料与建模流程。",
    contribution: [
      "清洗和切分资料，优化检索召回并编排 Prompt，收集 Bad Case 持续迭代。",
      "将中文业务描述转成仿真建模流程，设计四步流水线、失败重试与校验兜底。",
      "构建 30 套场景测试用例，用模型通过率跟踪迭代。",
    ],
    outcome: "交付 Streamlit 演示页面，沉淀客户场景、FAQ、售前 SOP 和培训材料，支持客户演示、技术答疑和团队知识复用。",
    tags: ["Simul8", "RAG", "Streamlit"],
    image: "simul8.webp",
    alt: "Simul8 售前工作台截图，展示客户背景、案例推荐与建模辅助",
    caption: "Simul8 售前工作台 · 客户背景、案例推荐、Demo 方案与建模辅助",
  },
  {
    id: "health",
    title: "栖心 · 主动健康管理助手",
    subtitle: "面向家庭的健康管理产品",
    category: "AI 产品",
    role: "产品负责人",
    status: "本机 Web MVP",
    summary: "围绕家庭健康记录与共享，设计清晰的隐私授权与 AI 使用边界。",
    challenge: "家庭成员有睡眠、运动、饮食和体检等管理需求，健康记录的共享还需要明确授权与保护规则。",
    contribution: [
      "推进需求研究、路线图、PRD、用户流程、MVP Backlog、数据字典、API 契约和交互原型。",
      "设计家庭共享权限、知情同意、健康数据生命周期和模型调用边界。",
      "规划健康内容安全边界、AI 评测与数据保护流程。",
    ],
    outcome: "形成可本机运行的 Web MVP、产品流程和数据安全设计。",
    tags: ["健康产品", "权限设计", "AI 评测"],
    image: "health.png",
    alt: "栖心家庭健康管理助手本机 MVP 的首页",
    caption: "本机 Web MVP 入口 · 家庭健康与隐私授权",
  },
  {
    id: "film",
    title: "中文动画 / 口播视频工作台",
    subtitle: "AI 内容生产工作流",
    category: "Agent 与工作流",
    role: "个人项目",
    status: "可预览工作台",
    summary: "把选题、脚本、分镜、渲染与质检串成可回看、可返工的生产流程。",
    challenge: "长视频生产跨越多种内容资产和工具，返工时需要定位单个镜头，并追踪素材的来源与许可。",
    contribution: [
      "规划并实现选题、资料、脚本、分镜、素材、配音、渲染、质量检查与发布包装工作台。",
      "支持镜头总览、逐镜审阅与返工，记录素材来源和许可，迭代脚本与画面质量规则。",
    ],
    outcome: "实现工作台和长视频预览。原作品记录的生成成果覆盖 5—8 分钟、72 镜、720P，并包含素材许可记录与质量检查流程。",
    tags: ["内容工作流", "分镜", "质量检查"],
    image: "film.webp",
    alt: "中文动画工作台生成视频的预览画面，保留原片素材来源标记",
    caption: "生成视频预览 · 画面保留原片的素材来源标记",
  },
  {
    id: "cost",
    title: "ModelSpend Hub",
    subtitle: "模型成本与预算治理",
    category: "AI 产品",
    role: "产品原型实践",
    status: "本机产品原型",
    summary: "用模型目录、预算和调用记录探索多模型费用归因。",
    challenge: "多模型调用费用难以归因，团队也需要统一的预算视图和策略管理。",
    contribution: [
      "完成机会研究、产品策略、SaaS 蓝图、PRD、用户流程、指标实验和风险台账。",
      "搭建模型目录、策略、预算与团队视图、调用记录和账单格式导入的本机原型。",
    ],
    outcome: "实现本机成本管理原型。团队预算和建议使用模拟数据，部分路径经假网关验证，并完成有限的 DeepSeek API 连通性验证。",
    tags: ["模型预算", "账单导入", "DeepSeek API"],
    image: "cost.png",
    alt: "ModelSpend Hub 成本治理原型的演示数据说明界面",
    caption: "本机产品界面 · 团队预算与建议使用模拟数据",
  },
  {
    id: "agent",
    title: "自媒体 Agent",
    subtitle: "选题、创作与发布辅助",
    category: "Agent 与工作流",
    role: "个人实践",
    status: "自用工具",
    summary: "把热点追踪、选题与运营技能归到一个个人内容工作台。",
    challenge: "个人内容运营需要在热点、选题、运营技能和多平台账号之间切换，相关资料也需要集中管理。",
    contribution: ["围绕内容工作流程整理运营技能、热点追踪、选题管理和多平台账号管理。"],
    outcome: "形成支持内容策划与创作的自用工作台。",
    tags: ["Agent", "运营技能库", "内容策划"],
    image: "media-agent.webp",
    alt: "自媒体 Agent 技能库页面，展示运营技能与创作流程",
    caption: "自媒体 Agent · 运营技能与创作流程界面",
  },
];

export const evidence = [
  { value: "60", label: "条真实 API 回答", href: "#geo" },
  { value: "948", label: "页 Simul8 资料整理", href: "#rag" },
  { value: "10+", label: "个独立交付的仿真 Demo", href: "#experience" },
];

export const asset = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`;
