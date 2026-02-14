# 模拟面试系统前端

基于 Nuxt3 + Nuxt UI 构建的 AI 模拟面试系统前端。

## 技术栈

- **框架**: Nuxt 3
- **UI 组件**: Nuxt UI 3
- **状态管理**: Pinia
- **样式**: Tailwind CSS

## 开发环境

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:3000`

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

## 项目结构

```
├── app.vue                 # 应用入口
├── assets/css/             # 全局样式
├── composables/            # 组合式函数
├── layouts/                # 布局组件
│   ├── default.vue         # 默认布局（带导航栏）
│   └── auth.vue            # 认证布局（登录/注册）
├── middleware/             # 路由中间件
│   └── auth.ts             # 认证中间件
├── pages/                  # 页面
│   ├── index.vue           # 首页
│   ├── login.vue           # 登录页
│   ├── register.vue        # 注册页
│   ├── knowledge.vue       # 知识库
│   ├── positions.vue       # 岗位
│   ├── interview.vue       # 面试
│   └── review.vue          # 复盘提升
├── public/                 # 静态资源
├── stores/                 # Pinia 状态管理
│   └── auth.ts             # 认证状态
├── types/                  # TypeScript 类型定义
│   └── auth.ts             # 认证相关类型
├── nuxt.config.ts          # Nuxt 配置
└── package.json
```

## 环境变量

在 `.env.development` 中配置：

```env
NUXT_PUBLIC_API_BASE_URL=http://localhost:8000
NUXT_PUBLIC_API_PREFIX=/api/v1
```

## 功能说明

### 已完成功能

- [x] 首页布局
- [x] 导航栏
- [x] 登录/注册功能
- [x] 权限验证（未登录自动跳转）

### 待开发功能

- [ ] 知识库模块
- [ ] 岗位管理
- [ ] 面试模块
- [ ] 复盘提升

## 后端服务

请确保后端服务已启动：

```bash
# 在后端项目目录
cd Interview-Mocker-Backend
uv run python run.py
```

- 主服务: `http://localhost:8000`
- 数字人服务: `http://localhost:8001`
