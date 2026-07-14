# 官网维护指南

这份文档给设计、内容、产品和普通开发者使用。先找到你想改的内容，再进入对应文件；不要从整页搜索后随意改多个位置。

## 一张表找到模块

| 想修改的内容 | 主要文件 | 说明 |
| --- | --- | --- |
| 首页模块顺序 | `app/page.tsx` | 这里只编排模块，不放产品文案和动画细节 |
| 导航、指标、产品、行业、客户、新闻、外链 | `app/data/site-content.ts` | 全站唯一的结构化内容源 |
| 品牌首屏与全域感知 | `app/components/sections/HeroSection.tsx` | 首屏文字、指标和四段能力链路的布局 |
| 产品平台 | `app/components/sections/PlatformSection.tsx`、`app/components/site/ProductExplorer.tsx` | 前者负责模块外壳，后者负责四类产品切换 |
| 行业方案 | `app/components/sections/IndustriesSection.tsx` | 七个行业卡片及场景呈现 |
| 客户实践 | `app/components/sections/TrustSection.tsx`、`app/components/site/ClientConstellation.tsx` | 客户分类切换与客户名称展示 |
| 公司与证据入口 | `app/components/sections/AboutSection.tsx` | 公司指标、一手来源入口和时间线 |
| 新闻与页脚 | `app/components/sections/InsightsSection.tsx`、`Footer.tsx` | 新闻列表、联系信息和底部导航 |
| 首屏 WebGL 动画 | `app/components/site/DataCoreScene.tsx` | Three.js 相机、轨道、指针与滚动响应 |
| 35 套小型 3D 原型 | `app/components/visuals/mini-3d-blueprints.ts` | 每个产品、行业和链路模型的几何蓝图 |
| 小型 3D 渲染规则 | `app/components/visuals/Mini3DScene.tsx`、`app/mini-3d.css` | 通用渲染器、透视、原语和动效 |
| 颜色、排版、布局和手机断点 | `app/globals.css` | 全局视觉变量和各模块样式 |
| 页面标题、分享卡片、站点地址 | `app/layout.tsx` | SEO 与按构建目标切换的站点地址 |
| GitHub Pages 构建路径 | `next.config.ts` | 静态导出和 `/trs-future-site` 子路径 |
| 预览站自动发布 | `.github/workflows/pages.yml` | 主分支更新后构建并发布 GitHub Pages 预览 |
| 终稿下载与替换官网 | `docs/PRODUCTION-HANDOFF.md`、`.github/workflows/handoff.yml` | 部门会签、终稿冻结、下载、上线和回滚 |

## 常见改法

### 改一段文案、链接或新闻

1. 打开 `app/data/site-content.ts`。
2. 在对应数组里只修改目标字段。
3. 外部事实继续使用拓尔思官方页面或法定披露渠道。
4. 如果来源发生变化，同步更新 `docs/CONTENT-SOURCES.md`。

### 增加或替换一个产品

1. 在 `productCategories` 对应分类中修改产品数据。
2. 给产品填写唯一的 `visual` ID。
3. 在 `app/data/visual-types.ts` 登记该 ID。
4. 在 `mini-3d-blueprints.ts` 增加同名蓝图。
5. 如果产品总数变化，更新测试、README 和架构文档里的数量。

### 增加或替换一个行业

流程与产品相同：行业数据、视觉 ID、3D 蓝图必须一起更新。每个行业应保留一句价值主张、三项典型场景和一个官方方案链接。

### 只调整视觉

- 改颜色和间距：先改 `app/globals.css` 顶部变量，再改对应模块分区。
- 改小型 3D：优先组合现有环、球、节点、面板和光束，不在行业或产品组件里另写一套动画。
- 改首屏 3D：只进入 `DataCoreScene.tsx`，保持它对页面仍是无参数组件。

## 本地查看与检查

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

提交前执行：

```bash
npm run lint
npm test
npm audit
```

`npm test` 会分别生成 GitHub Pages 子路径预览版和官网根路径终稿版，检查 HTML、Logo、CSS、JavaScript、3D 映射、终稿清单和交付结构。

## 发布方式

公开预览站是 <https://oukeming64-tech.github.io/trs-future-site/>。

合并到 `main` 后，GitHub Actions 会自动执行 `npm run build:pages`，上传 `out/` 并更新 GitHub Pages。不要手工提交 `out/`，也不要再使用旧的 Sites 配置发布正式版本。

如果发布失败，先查看仓库 Actions 中的 `Deploy GitHub Pages`，确认失败发生在安装、静态构建、上传还是部署阶段；修复源文件后重新运行，不直接改线上产物。

GitHub Pages 只用于会签预览，不能直接覆盖 `www.trs.com.cn`。各部门确认终稿后，按 [官网终稿会签、下载与替换指南](./PRODUCTION-HANDOFF.md) 手动生成正式官网终稿包，再由官网运维在备份和预发布验收完成后上线。

## 修改完成后同步什么

- 用户能看到的功能或文案变化：更新 README 或内容来源文档。
- 模块职责、目录或发布方式变化：更新 `ARCHITECTURE.md`、本指南和 `AGENTS.md`。
- 会签、终稿下载、现网上线或回滚流程变化：更新 `docs/PRODUCTION-HANDOFF.md` 和交付工作流。
- 已形成版本的改动：在 `CHANGELOG.md` 顶部追加版本记录，不改写旧版本历史。
