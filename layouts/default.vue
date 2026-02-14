<script setup lang="ts">
const authStore = useAuthStore()
const route = useRoute()

const navItems = [
  { label: '知识库', to: '/knowledge' },
  { label: '岗位', to: '/positions' },
  { label: '面试', to: '/interview' },
  { label: '复盘提升', to: '/review' }
]

const handleLogout = async () => {
  await authStore.logout()
  navigateTo('/auth/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-950">
    <header class="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 lg:px-8">
        <nav class="flex items-center justify-between h-16">
          <div class="flex items-center gap-8">
            <NuxtLink to="/" class="flex items-center gap-2">
              <span class="text-xl font-bold text-white">模拟面试系统</span>
            </NuxtLink>
            
            <div class="hidden md:flex items-center gap-6">
              <NuxtLink 
                v-for="item in navItems" 
                :key="item.to" 
                :to="item.to"
                class="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                :class="{ 'text-white': route.path.startsWith(item.to) }"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <template v-if="authStore.isLoggedIn">
              <span class="text-gray-400 text-sm hidden sm:block">
                {{ authStore.username }}
              </span>
              <UButton 
                color="neutral" 
                variant="ghost" 
                size="sm"
                @click="handleLogout"
              >
                退出
              </UButton>
            </template>
            <template v-else>
              <UButton 
                to="/auth/login" 
                color="neutral" 
                variant="ghost" 
                size="sm"
              >
                登录
              </UButton>
            </template>
          </div>
        </nav>
      </div>
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>
