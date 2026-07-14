# Architecture

## 目标

视觉层允许复杂，代码层保持简单：内容、页面区块、交互和 3D 场景各自拥有清楚边界。后续修改产品文案、增加行业卡片或替换 3D 方案时，不需要改动整页。

## 分层

```text
page.tsx
  ├─ sections/*                页面模块编排
  │   ├─ site/*                复用交互与展示组件
  │   └─ data/site-content.ts  结构化内容
  ├─ globals.css               视觉系统与响应式规则
  └─ layout.tsx                元信息与页面外壳
```

### 1. 内容层：`app/data/site-content.ts`

唯一的结构化内容源，包含：

- 主导航
- 首页指标
- 数据生命周期
- 四类产品与官方链接
- 七大行业方案
- 四类客户实践
- 公司研发指标
- 新闻与官方入口

区块组件只消费数据，不重复维护产品名称和链接。新增产品通常只需向对应数组追加一个对象。

### 2. 区块层：`app/components/sections/`

每个文件对应一个用户可感知的官网模块：

- `HeroSection`：品牌首屏和数据全生命周期
- `PlatformSection`：产品能力入口
- `IndustriesSection`：行业方案
- `TrustSection`：客户实践
- `AboutSection`：公司实力与里程碑
- `InsightsSection`：新闻洞察
- `Footer`：服务合作、联系与官方入口

区块层负责内容组合，不维护复杂浏览器状态。

### 3. 交互层：`app/components/site/`

- `Header`：滚动状态、移动菜单和导航可访问性
- `ProductExplorer`：产品分类状态与键盘左右切换
- `ClientConstellation`：客户类型切换
- `Reveal`：基于 IntersectionObserver 的一次性入场动画
- `BrandMark`、`SectionHeading`：轻量复用展示

需要浏览器状态的组件使用 `"use client"`，其他内容保持服务端渲染。

### 4. 3D 层：`DataCoreScene.tsx`

Three.js 场景完全独立，不向页面其他组件泄漏渲染状态。它负责：

- WebGL renderer、camera、light 和 geometry 生命周期
- 指针响应、滚动联动与动画循环
- 画布尺寸变化
- 离开可视区时暂停渲染
- `prefers-reduced-motion` 静态渲染
- WebGL 不可用时的 CSS 视觉回退
- 卸载时释放 geometry、material 和 renderer

如果以后改成 Spline 或其他 WebGL 引擎，只需保持 `DataCoreScene` 的外部接口不变。

### 5. 视觉层：`app/globals.css`

CSS 按 Header、Hero、Lifecycle、Platform、Industries、Trust、About、Insights、Footer 顺序分区。全局颜色和布局尺度集中在 `:root`，断点集中在文件末尾。

## 数据流

```text
site-content.ts
      ↓
server section components
      ↓
interactive client islands
      ↓
page.tsx composition
```

没有数据库、登录、表单持久化或运行时内容接口。所有 CTA 都是页内导航、电话/邮件链接或拓尔思官方页面外链。

## 性能与可访问性

- 3D 像素比最高限制为 `1.7`，避免高分屏无上限渲染。
- 3D 离开视口后暂停动画；组件卸载时释放 WebGL 资源。
- 减少动态效果偏好下，页面关闭持续动画并保留静态 3D 首帧。
- 产品与客户切换使用 `tablist / tab / tabpanel` 语义。
- 移动菜单支持 Escape 关闭、body 滚动锁定和明确的 `aria-expanded`。
- 主要文字与按钮对比度以深色背景下可读为前提。

## 安全扩展边界

- 新增纯展示内容：只改内容数据与对应区块。
- 新增联系表单：新建独立 client component；确认数据去向和隐私文本后再接接口。
- 新增 CMS：保持 `site-content` 的类型形状，在服务端建立适配层，不让页面组件依赖特定 CMS。
- 新增多个路由：按业务模块建立路由；不要把所有逻辑塞回 `page.tsx`。
