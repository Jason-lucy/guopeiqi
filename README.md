# 郭佩琦｜AI 产品与解决方案作品集

React 18、TypeScript 和 Vite 的静态作品集。基线为 [原站源码](https://github.com/jason-lucy/guopeiqi/tree/45da0290f504fadd096f1fc986cf466228d53d12)，此仓库通过 GitHub Actions 构建并发布到 GitHub Pages。ChatGPT Sites 保留独立的部署记录。

## 运行与部署

需要 Node.js 20.19 或以上，建议用 Node.js 22 LTS。

```sh
npm ci
npm run dev
```

浏览器打开命令行显示的本地地址，默认是 `http://localhost:5173/`。预览生产构建时运行：

```sh
npm run build
npm run preview
```

`dist/` 是可部署产物。Vite 使用相对资源路径，可部署在域名根路径或 GitHub Pages 的项目子路径。GitHub Pages 由现有的 `Deploy portfolio to GitHub Pages` 工作流部署。推送到 `main` 后会自动运行，也支持手动运行。

## 维护内容

| 路径 | 用途 |
| --- | --- |
| `src/data/resume.ts` | 个人信息、经历、教育、能力、案例、成果、截图和联系方式。核实演示与源码地址后可在对应项目的 `links` 中添加。 |
| `src/main.tsx` | 页面区块、锚点、项目详情历史记录与焦点恢复。旧的 `#work` 和六个项目锚点可继续使用。 |
| `src/components/hero.tsx`、`site-nav.tsx` | 首屏职业方向切换、鼠标视差、导航高亮和移动菜单。 |
| `src/components/section/projects-section.tsx`、`project-card.tsx`、`project-dialog.tsx` | 作品筛选、实际项目截图、案例详情和链接复制。 |
| `src/components/magicui/blur-fade.tsx` | Magic UI 渐入组件的适配版，尊重系统的减少动态效果设置。 |
| `src/styles.css` | 色彩、字体、布局、响应式和交互动效。 |
| `public/assets/` | 从原站沿用的数字肖像和项目截图，以及新版图标。 |

## 审计与选型

原版由静态 HTML 负责正文，React 负责首屏角色切换、菜单、复制邮箱和指针控制的视频。继续沿用 React、Vite、静态部署、原始项目资料与联系方式。改造合并了原来分开的项目长文和截图墙，将截图、贡献和交付证据放到同一个可分享案例中。首屏重新编排文字和肖像，经历改为时间轴，技能按实际用途分组。

原站两个外链字体在检查时返回 HTTP 403。首屏视频的响应体标称 810,684 字节，并设置为预加载，桌面端监听全局鼠标移动来切换视频进度。新版使用系统字体、约 28 KB 的本地 WebP 和局部 CSS 变换。六张案例图按需加载。旧站含独立移动样式和减少动态效果样式，新版将它们整合进响应式布局和动效规则。

| 完整模板 | 观察与取舍 |
| --- | --- |
| [Dillion Verma Portfolio](https://github.com/dillionverma/portfolio) · [演示](https://portfolio-magicui.vercel.app/) | MIT。项目数据、区块、媒体卡片和 Motion 动效边界清楚。采用其数据驱动章节、案例网格、媒体卡片结构及 BlurFade 源码。保留原站的 React + Vite，省去模板中的 Next.js、博客与 MDX 依赖。上游基于 `5ef12e4`。 |
| [Corey Chiu Portfolio](https://github.com/iAmCorey/coreychiu-portfolio-template) · [演示](https://coreychiu.com/) | MIT。移动和桌面响应式，博客、作品与社交内容适合更广的创作者主页。Next.js、MDX、社交和分析依赖超出本次范围。调研提交为 `cdb190d`。 |
| [Minimal Next Portfolio](https://github.com/namanbarkiya/minimal-next-portfolio) · [演示](https://nbarkiya.xyz/) | MIT。响应式简历、Motion 入场与主题切换成熟。邮件、表单与博客功能需要额外配置。调研提交为 `263950f`。 |

还查看了 [React Bits](https://reactbits.dev/)、[Magic UI](https://magicui.design/)、[Aceternity UI](https://ui.aceternity.com/) 与 [21st.dev](https://21st.dev/)。React Bits 有成熟的文字和指针动效，当前仓库采用 MIT 加 Commons Clause。Aceternity 的页面、动效和模板有不同的获取方式。21st.dev 汇集多个作者的组件，使用前需核查具体条目的条款。本项目从已选 MIT 模板移植 Magic UI BlurFade，未引入其他三个资源库的源码。

## 许可与素材

Dillion Verma 的 MIT 许可已附在 `LICENSE`。运行时组件包括 Motion 与 React 的 MIT 软件，以及 Lucide 的 ISC 图标及其 Feather MIT 归属。分发版包含 `third-party-notices.txt`。数字肖像和六张项目截图来自原作品集，沿用原有素材来源标记。未引入外部字体、图库、肖像或视频。第三方软件许可不扩展到个人资料或截图。

## 验收记录

- 已用 Chromium 和 Playwright 验证 1440、768、390、320 像素宽的布局。对桌面首页、作品区、案例弹窗和移动端首页做了截图检查。
- 验证了桌面导航与滚动高亮、移动菜单、角色切换、四组筛选、六个案例弹窗和直接链接、Escape 关闭与焦点恢复、邮箱和微信复制、项目链接复制、鼠标视差及减少动效模式。浏览器无脚本错误，静态文件均可成功加载，axe 检查通过。
- 已通过 TypeScript 检查与生产构建。GitHub Pages 子路径用生产文件验证。旧首屏外链视频标称约 811 KB，新版肖像约 28 KB。这是单项资源体积对比，未测量线上加载时间。
