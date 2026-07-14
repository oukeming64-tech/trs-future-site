# AGENTS.md

本文件约束在此仓库工作的自动化 Agent。目标是保持页面视觉丰富、代码职责简单，并让每次改动都能通过 GitHub Pages 静态发布。

## 工作范围与事实来源

- `app/data/site-content.ts` 是导航、产品、行业、客户、公司、新闻与外链的唯一结构化内容源。
- 公司事实和产品链接以 `docs/CONTENT-SOURCES.md` 中的拓尔思官方来源为准；不要编造试用入口、客户证言或量化效果。
- `app/page.tsx` 只负责模块顺序。不要把文案、状态或 3D 实现塞进该文件。
- 本站是静态概念官网，没有数据库、登录、表单提交、服务端接口或运行时 CMS。

## 模块所有权

| 目录或文件 | 职责 | 常见改动 |
| --- | --- | --- |
| `app/components/sections/` | 用户可感知的页面模块 | 模块结构与内容组合 |
| `app/components/site/` | 导航、切换、Reveal、品牌标识和首屏 WebGL | 浏览器状态与复用交互 |
| `app/components/visuals/` | 小型 3D 渲染器和蓝图 | 产品、行业、链路的 3D 原型 |
| `app/data/site-content.ts` | 结构化内容与视觉 ID 映射 | 文案、链接、列表、场景映射 |
| `app/data/visual-types.ts` | 合法 3D 模型 ID | 新增或删除模型 ID |
| `app/globals.css` | 页面视觉系统与响应式布局 | 颜色、排版、模块布局、断点 |
| `app/mini-3d.css` | 小型 3D 原语与动画 | 几何、透视、降级与减少动态效果 |
| `app/layout.tsx` | 静态元信息和正式站点地址 | 标题、描述、分享图、URL |
| `next.config.ts` | Next.js 静态导出和 Pages 子路径 | 发布路径与导出行为 |
| `.github/workflows/pages.yml` | GitHub Pages 自动发布 | Node 版本、构建和部署步骤 |
| `tests/rendered-html.test.mjs` | 页面内容、资源路径和架构契约 | 数量、映射或部署规则变化时同步 |

## 不可破坏的边界

1. 产品、行业或链路中的每个 `visual` ID 必须同时存在于 `visual-types.ts` 和 `mini-3d-blueprints.ts`。
2. 当前基线是 4 个链路模型、24 个产品模型、7 个行业模型，共 35 套小型 3D 场景；有意改变数量时，代码、测试和文档一起修改。
3. 首屏 WebGL 继续由 `DataCoreScene.tsx` 独立管理并释放资源；小型场景不得为每张卡片新增 WebGL 上下文。
4. 保留键盘可操作的 `tablist / tab / tabpanel`、移动菜单 Escape 关闭和 `prefers-reduced-motion` 降级。
5. GitHub Pages 部署在 `/trs-future-site/`。新增 `public/` 资源时必须考虑 `NEXT_PUBLIC_BASE_PATH`，不要在 JSX 中新增无法带前缀的根路径资源。
6. 正式发布只走 GitHub Pages。旧 `.openai/hosting.json`、vinext Worker 和 Sites 发布链已退休，不要恢复，除非用户明确要求再次迁移。

## 改动流程

1. 先阅读 `README.md`、本文件，以及任务涉及的具体模块。
2. 只修改与任务对应的内容层、区块层、交互层或 3D 层；避免跨层复制数据。
3. 新增产品或行业时，按“数据 → 类型 ID → 蓝图 → 测试 → 文档”的顺序完成。
4. 提交前运行：

```bash
npm run lint
npm test
npm audit
git diff --check
```

5. `npm test` 必须生成 `out/index.html`，验证 `/trs-future-site/` 资源前缀，并确认引用的本地资源真实存在。
6. 合并到 `main` 后等待 `Deploy GitHub Pages` 成功，再核对正式 URL、页面标题、Logo、3D Canvas、产品切换和手机端横向溢出。

## 文档同步矩阵

- 内容或来源变化 → `docs/CONTENT-SOURCES.md`
- 模块职责或目录变化 → `ARCHITECTURE.md`、`docs/EDITING-GUIDE.md`、本文件
- 构建或部署变化 → README、`ARCHITECTURE.md`、本文件、工作流
- 版本发布 → `CHANGELOG.md` 和 GitHub Release

历史版本说明保持追加式，不把已经发布的旧实现改写成当前状态。
