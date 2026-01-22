import { nextMode } from './perf.js';

const TRANSLATIONS = {
  zh: {
    'nav.overview': '概览',
    'nav.capability': '能力矩阵',
    'nav.timeline': '里程碑',
    'nav.team': '团队与合规',
    'nav.clients': '客户案例',
    'nav.contact': '联系',
    'hero.eyebrow': '风电运维可信服务商',
    'hero.title': '以工程纪律与数据化响应，守护风机全生命周期健康',
    'hero.subtitle': 'RoyalWind Energy 专注风电设备维护与改造，覆盖海上与陆上场景，为业主与OEM提供可审计、可追溯、可验证的服务体系。',
    'hero.cta': '立即咨询',
    'hero.download': '下载公司介绍 (PDF)',
    'hero.adv1.title': '响应承诺',
    'hero.adv1.desc': '24小时内远程诊断，72小时内派发现场团队（可替换）',
    'hero.adv2.title': 'HSE 体系',
    'hero.adv2.desc': '零重大事故纪录，双重许可与作业票闭环',
    'hero.adv3.title': '工程数据化',
    'hero.adv3.desc': '设备健康档案 + 工单闭环，关键指标可追溯',
    'core.title': '能量核心',
    'core.subtitle': '旋转视角 · 点击触发能量爆发',
    'core.meta1': '状态：实时监测',
    'core.meta2': '输入：风场遥测',
    'capability.title': '能力矩阵',
    'capability.subtitle': '服务类型 × 场景 × 响应机制',
    'capability.col1': '服务类型',
    'capability.col2': '场景',
    'capability.col3': '响应机制',
    'capability.col4': '工具与能力',
    'capability.row1.type': '机组例行维护',
    'capability.row1.scene': '陆上/海上全容量风场',
    'capability.row1.response': '7×24 值守 + 预检清单',
    'capability.row1.tools': '扭矩工具、液压拉伸、主控诊断',
    'capability.row2.type': '主部件维修',
    'capability.row2.scene': '齿轮箱、主轴、叶片',
    'capability.row2.response': '专家级评估 + 备件联动',
    'capability.row2.tools': '无损检测、振动分析、吊装协调',
    'capability.row3.type': '性能提升改造',
    'capability.row3.scene': '控制策略升级、功率曲线修正',
    'capability.row3.response': '远程调参 + 效果验证',
    'capability.row3.tools': '数据建模、SCADA 接口',
    'capability.row4.type': '专项安全检查',
    'capability.row4.scene': '大风季、台风季、冰冻季',
    'capability.row4.response': '专项巡检 + 风险闭环',
    'capability.row4.tools': '高空救援、LOTO 管控',
    'metrics.title': '关键指标（可替换）',
    'metrics.subtitle': '让可信度落在数字上',
    'metrics.item1': '年度作业工单',
    'metrics.item2': '覆盖省份/海域',
    'metrics.item3': '首访解决率',
    'metrics.item4': '平均故障闭环',
    'timeline.title': '里程碑',
    'timeline.subtitle': '以工程积累验证可信度',
    'timeline.item1': '公司成立，建立风电运维人才库',
    'timeline.item2': '完成首个海上风场整场维保',
    'timeline.item3': '引入数字工单与远程诊断体系',
    'timeline.item4': '完成跨区域应急响应网络布局',
    'team.title': '团队与安全合规',
    'team.subtitle': '工程师文化 + HSE 纪律',
    'team.card1.title': '团队画像',
    'team.card1.item1': '核心工程师平均从业 8 年',
    'team.card1.item2': '具备高空作业、海上作业双资质',
    'team.card1.item3': '典型工种覆盖机械、电气、控制、复材',
    'team.card2.title': '安全与质量',
    'team.card2.item1': 'HSE 管理体系 + LOTO 流程',
    'team.card2.item2': 'ISO 9001/14001/45001 体系对标',
    'team.card2.item3': '作业前风险评估 + 复盘闭环',
    'clients.title': '客户与项目案例（匿名示例）',
    'clients.subtitle': '可替换为真实客户',
    'clients.case1.title': '华北某 300MW 陆上风场',
    'clients.case1.desc': '年度计划检修 + 响应式故障处理，减少停机 18%',
    'clients.case1.tag': '维护与改造',
    'clients.case2.title': '沿海 200MW 海上风场',
    'clients.case2.desc': '台风季专项巡检，建立叶片健康档案',
    'clients.case2.tag': '海上专项',
    'clients.case3.title': '西北高寒风场集群',
    'clients.case3.desc': '低温工况优化与零部件寿命评估',
    'clients.case3.tag': '性能提升',
    'contact.title': '准备好提升风场可用率了吗？',
    'contact.subtitle': '留下需求，我们将在 24 小时内响应。',
    'contact.cta': '预约咨询',
    'contact.download': '下载公司介绍',
    'contact.email.label': '邮箱',
    'contact.phone.label': '电话',
    'contact.region.label': '服务区域',
    'contact.region.value': '中国沿海与内陆风场',
    'footer.copy': '© 2025 RoyalWind Energy. 风电设备维护服务 · All Rights Reserved.',
    'perf.mode': '模式',
    'perf.particles': '粒子',
    'perf.blur': '模糊'
  },
  en: {
    'nav.overview': 'Overview',
    'nav.capability': 'Capability Matrix',
    'nav.timeline': 'Milestones',
    'nav.team': 'Team & Compliance',
    'nav.clients': 'Clients',
    'nav.contact': 'Contact',
    'hero.eyebrow': 'Trusted Wind O&M Partner',
    'hero.title': 'Engineering discipline and data-driven response to protect turbine lifecycle health',
    'hero.subtitle': 'RoyalWind Energy delivers wind turbine maintenance and retrofit services across onshore and offshore sites, with auditable, traceable, and verifiable workflows for owners and OEMs.',
    'hero.cta': 'Start a Consultation',
    'hero.download': 'Download Company PDF',
    'hero.adv1.title': 'Response SLA',
    'hero.adv1.desc': 'Remote diagnosis within 24h, field team dispatched within 72h (replaceable)',
    'hero.adv2.title': 'HSE Governance',
    'hero.adv2.desc': 'Zero major incidents, dual-permit and work order closure',
    'hero.adv3.title': 'Engineering Data',
    'hero.adv3.desc': 'Asset health files + work order loop, traceable KPIs',
    'core.title': 'Energy Core',
    'core.subtitle': 'Rotate the view · Click to release energy',
    'core.meta1': 'Status: Live Monitoring',
    'core.meta2': 'Input: Wind Farm Telemetry',
    'capability.title': 'Capability Matrix',
    'capability.subtitle': 'Service Type × Scenario × Response',
    'capability.col1': 'Service Type',
    'capability.col2': 'Scenario',
    'capability.col3': 'Response',
    'capability.col4': 'Tools & Skills',
    'capability.row1.type': 'Routine Maintenance',
    'capability.row1.scene': 'Onshore/offshore utility-scale farms',
    'capability.row1.response': '24/7 watch + pre-check lists',
    'capability.row1.tools': 'Torque tools, hydraulic tension, controller diagnostics',
    'capability.row2.type': 'Major Component Repair',
    'capability.row2.scene': 'Gearbox, main shaft, blades',
    'capability.row2.response': 'Expert assessment + spares linkage',
    'capability.row2.tools': 'NDT, vibration analysis, lifting coordination',
    'capability.row3.type': 'Performance Retrofit',
    'capability.row3.scene': 'Control strategy upgrade, power curve tuning',
    'capability.row3.response': 'Remote tuning + verification',
    'capability.row3.tools': 'Data modeling, SCADA integration',
    'capability.row4.type': 'Safety Campaign',
    'capability.row4.scene': 'Typhoon, high-wind, icing seasons',
    'capability.row4.response': 'Targeted inspection + risk closure',
    'capability.row4.tools': 'Rescue at height, LOTO governance',
    'metrics.title': 'Key Metrics (replaceable)',
    'metrics.subtitle': 'Credibility backed by numbers',
    'metrics.item1': 'Annual Work Orders',
    'metrics.item2': 'Provinces / Offshore Zones',
    'metrics.item3': 'First-visit Fix Rate',
    'metrics.item4': 'Avg. Closure Time',
    'timeline.title': 'Milestones',
    'timeline.subtitle': 'Experience that proves reliability',
    'timeline.item1': 'Founded with a dedicated wind O&M talent pool',
    'timeline.item2': 'Delivered first offshore full-farm service program',
    'timeline.item3': 'Launched digital work orders and remote diagnostics',
    'timeline.item4': 'Built a cross-region emergency response network',
    'team.title': 'Team & Safety Compliance',
    'team.subtitle': 'Engineer culture with HSE discipline',
    'team.card1.title': 'Team Profile',
    'team.card1.item1': 'Core engineers average 8 years in service',
    'team.card1.item2': 'Dual-certified for height and offshore operations',
    'team.card1.item3': 'Trades cover mechanical, electrical, control, composites',
    'team.card2.title': 'Safety & Quality',
    'team.card2.item1': 'HSE management system + LOTO process',
    'team.card2.item2': 'Aligned with ISO 9001/14001/45001',
    'team.card2.item3': 'Pre-job risk assessment + post-job closure',
    'clients.title': 'Client & Project Examples (anonymous)',
    'clients.subtitle': 'Replace with real references',
    'clients.case1.title': '300MW Onshore Farm in North China',
    'clients.case1.desc': 'Planned maintenance + responsive fault handling, 18% downtime reduction',
    'clients.case1.tag': 'Maintenance & Retrofit',
    'clients.case2.title': '200MW Offshore Farm on the Coast',
    'clients.case2.desc': 'Typhoon season inspection and blade health profiles',
    'clients.case2.tag': 'Offshore Campaign',
    'clients.case3.title': 'High-altitude Cold Climate Cluster',
    'clients.case3.desc': 'Low-temperature optimization and component lifespan assessment',
    'clients.case3.tag': 'Performance Lift',
    'contact.title': 'Ready to lift availability?',
    'contact.subtitle': 'Share your needs and we will respond within 24 hours.',
    'contact.cta': 'Book a Call',
    'contact.download': 'Download Profile',
    'contact.email.label': 'Email',
    'contact.phone.label': 'Phone',
    'contact.region.label': 'Coverage',
    'contact.region.value': 'Onshore & offshore wind farms in China',
    'footer.copy': '© 2025 RoyalWind Energy. Wind turbine maintenance services · All Rights Reserved.',
    'perf.mode': 'Mode',
    'perf.particles': 'Particles',
    'perf.blur': 'Blur'
  }
};

const MODE_LABELS = {
  experimental: { zh: '实验', en: 'Experimental' },
  balanced: { zh: '平衡', en: 'Balanced' },
  eco: { zh: '省电', en: 'Eco' }
};

export function initUI(state, perf) {
  const reveals = document.querySelectorAll('.reveal');
  const counters = document.querySelectorAll('[data-count]');
  const fpsEl = document.getElementById('fps');
  const modeEl = document.getElementById('mode');
  const particlesEl = document.getElementById('particles');
  const blurEl = document.getElementById('blur');
  const modeToggle = document.getElementById('mode-toggle');
  const langToggle = document.getElementById('lang-toggle');
  let currentLang = 'zh';

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach((el) => observer.observe(el));

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = Number(counter.dataset.count || 0);
      const suffix = counter.dataset.suffix || '';
      let value = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const tick = () => {
        value = Math.min(target, value + step);
        counter.textContent = `${value}${suffix}`;
        if (value < target) requestAnimationFrame(tick);
      };
      tick();
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id === 'metrics') {
          animateCounters();
        }
      });
    },
    { threshold: 0.4 }
  );

  const metrics = document.getElementById('metrics');
  if (metrics) sectionObserver.observe(metrics);

  const applyTranslations = () => {
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.dataset.i18n;
      const value = TRANSLATIONS[currentLang][key];
      if (value) node.textContent = value;
    });
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    langToggle.textContent = currentLang === 'zh' ? 'EN' : '中文';
    updateModeLabel();
  };

  const updateModeLabel = () => {
    const label = MODE_LABELS[perf.mode][currentLang];
    modeToggle.textContent = label;
    modeEl.textContent = label;
  };

  const updatePerfPanel = () => {
    fpsEl.textContent = perf.fps;
    particlesEl.textContent = Math.round(60 * perf.settings.particleMultiplier);
    blurEl.textContent = `${perf.settings.blur}px`;
    updateModeLabel();
    requestAnimationFrame(updatePerfPanel);
  };

  modeToggle.addEventListener('click', () => {
    perf.setMode(nextMode(perf.mode));
    state.syncMode(perf.mode);
  });

  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    applyTranslations();
  });

  applyTranslations();
  updatePerfPanel();
}
