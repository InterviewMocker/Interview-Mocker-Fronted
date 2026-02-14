export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // 白名单路由
  const whiteList = ['/login', '/register']

  if (whiteList.includes(to.path)) {
    // 如果已登录且访问登录页，跳转到首页
    if (authStore.isLoggedIn && to.path === '/login') {
      return navigateTo('/')
    }
    return
  }

  // 未登录跳转到登录页
  if (!authStore.isLoggedIn) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})
