# RoyalWind Energy · About Page Upgrade

本仓库包含一个可直接部署到 GitHub Pages 的前端页面集合，并新增了风电设备维护企业的 **About 页面**。整个页面仅使用原生 HTML/CSS/JS，无任何第三方库或 CDN。

## About 页面亮点

- **科技感可信呈现**：玻璃拟态卡片、发光描边、克制霓虹，强调专业与可信度。
- **能力矩阵 + 数据化指标**：以可验证字段组织服务能力、响应机制与典型工种。
- **能量核心交互**：Canvas 构建品牌记忆点，支持旋转与点击爆发。
- **滚动触发动画**：模块进入视口淡入上浮，数字指标计数动画。
- **性能治理**：自动检测硬件能力并动态降级，提供实验 / 平衡 / 省电三档模式。
- **状态机驱动**：待机 / 激活 / 深度探索 / 低功耗四种状态，随交互切换主题与动效强度。
- **中英双语切换**：内置翻译表自动生成英文文案，一键切换，零依赖。

## 如何访问 About 页面

- 本地直接打开：`/about/index.html`
- GitHub Pages：`/about/` 路径即可访问。

## 交互与性能说明

- **FPS & 参数面板**：右下角显示 FPS、粒子数量与模糊强度。
- **切换模式**：右上角「实验 / 平衡 / 省电」按钮循环切换。
- **能量爆发**：点击能量核心触发爆发并进入激活状态。
- **状态机触发**：
  - 启动：待机
  - 滚动到内容区：激活
  - 深度滚动：深度探索
  - 省电模式：低功耗

## 项目结构

```
about/
  index.html
  styles.css
  js/
    main.js        # 入口
    render.js      # Canvas 渲染
    interaction.js # 交互逻辑
    state.js       # 状态机
    perf.js        # 性能管理
    ui.js          # UI 与双语
```

## 如何替换真实数据

- **文字内容**：在 `about/js/ui.js` 的 `TRANSLATIONS` 中替换中英文文案。
- **指标数字**：在 `about/index.html` 中更新 `data-count` 与 `data-suffix`。
- **客户案例**：替换 `#clients` 模块的标题与描述。
- **公司介绍 PDF**：将下载按钮链接指向真实文件。

## GitHub Pages 部署

1. 将仓库推送至 GitHub。
2. 进入仓库 **Settings → Pages**。
3. 选择 **Deploy from a branch**。
4. 选择当前分支与根目录（`/root`）。
5. 保存后即可通过 GitHub Pages 访问页面。
