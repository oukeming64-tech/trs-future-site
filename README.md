# TRS Future Site｜拓尔思官网焕新概念

一版面向拓尔思（TRS）的开源官网焕新概念：保留现有官网的完整信息架构，用深色科技视觉、实时 WebGL 数据核心、35 套语义化微型 3D 场景、模块化内容组织和响应式交互重新表达“数据 + 智能”的品牌能力。

> 这是独立制作的概念性设计与技术演示，并非拓尔思官方发布版本。公司事实、产品名称与跳转链接来自 [拓尔思官方网站](https://www.trs.com.cn/)，品牌权利归原权利人所有。

## 在线体验

- [在线预览](https://trs-future-site.kemo64.chatgpt.site/)：当前为站点所有者可访问版本
- [GitHub 开源仓库](https://github.com/oukeming64-tech/trs-future-site)
- [v1.1.0 首版解说视频](https://github.com/oukeming64-tech/trs-future-site/releases/download/v1.1.0/trs-future-site-first-cut.mp4)：55.83 秒，1080p / 30fps，含中文旁白、字幕与原创电子配乐

## 已实现

- 实时 3D 语义核心：数据、知识、模型、智能体四层轨道，支持鼠标响应与滚动联动
- 全域感知链路：感知、治理、认知、行动 4 个环节分别配置独立 3D 模型
- 完整首页模块：主导航、品牌首屏、数据全生命周期、产品能力、七大行业方案、客户实践、公司实力、新闻洞察、服务合作与投资者入口
- 交互式产品矩阵：大数据、人工智能、数据安全、云与应用四类可切换，24 个产品各有符合能力原型的微型 3D 动画语言
- 七大行业方案：每个行业拥有独立的 3D 场景、色彩信号与动态节奏
- 使用拓尔思官网原版品牌标识，并保留概念站与官方品牌权利边界说明
- 客户实践切换：企业、党政、媒体、金融四类公开信息视图
- 桌面与移动端响应式布局、移动全屏导航、键盘焦点与减少动态效果支持
- 官方产品、方案、资讯、文档和投资者关系外链
- Cloudflare Workers 兼容的 vinext 构建与独立服务端渲染测试

## 技术栈

- React 19 + TypeScript
- vinext / Vite / Cloudflare Workers
- Three.js（实时 3D 场景）
- CSS 3D（产品、行业与全域感知微型场景）
- Lucide React（界面图标）
- Tailwind CSS 4 基础层 + 项目语义化 CSS

## 快速开始

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

常用检查：

```bash
npm run build
npm run lint
npm test
npm audit
```

## 目录职责

```text
app/
├── components/
│   ├── sections/       # 页面功能区块；一个文件负责一个官网模块
│   ├── site/           # 可复用交互、主 3D 场景、导航和基础展示组件
│   └── visuals/        # 微型 3D 渲染器与 35 套数据化场景蓝图
├── data/
│   ├── site-content.ts # 产品、行业、客户、公司数据、视觉 ID 和外链
│   └── visual-types.ts # 3D 场景 ID 的类型边界
├── globals.css         # 视觉系统、响应式规则和动效
├── mini-3d.css         # 微型 3D 场景的几何、动画与降级规则
├── layout.tsx          # SEO、语言和页面级元信息
└── page.tsx            # 只负责编排区块，不承载业务细节
```

最常见的后续改动都集中在一处：

- 改产品、行业、客户或新闻：编辑 `app/data/site-content.ts`
- 调整某个页面模块：编辑 `app/components/sections/` 下对应文件
- 替换首屏 WebGL 核心：编辑 `app/components/site/DataCoreScene.tsx`
- 改某个产品或行业的微型 3D 原型：在 `site-content.ts` 调整 `visual`，并在 `app/components/visuals/mini-3d-blueprints.ts` 修改对应蓝图
- 调整颜色、排版和断点：编辑 `app/globals.css` 顶部变量与对应分区

完整边界和扩展方式见 [ARCHITECTURE.md](./ARCHITECTURE.md)。公开信息来源见 [docs/CONTENT-SOURCES.md](./docs/CONTENT-SOURCES.md)。首版视频的规格、章节和制作边界见 [docs/VIDEO.md](./docs/VIDEO.md)。

发布前的基线检查为：构建成功、代码检查通过、2 项服务端渲染与架构测试通过、依赖审计为 0 项已知漏洞。

## 内容与品牌说明

- 页面不抓取或伪造实时股价，只保留股票代码 `300229` 并链接官方投资者关系入口。
- 新闻日期与公司数据按 2026-07-14 可访问的拓尔思官方页面整理。
- MotionSites 仅用于研究构图、空间层次和交互提示；仓库不包含其完整付费提示词、模板代码或素材。
- 本项目使用 MIT 许可证开放源代码；拓尔思名称、商标与官方内容不随代码许可证授权。

## License

[MIT](./LICENSE)
