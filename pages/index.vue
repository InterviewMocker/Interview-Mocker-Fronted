<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const placeholderCards = [
  { id: 1, title: '功能卡片 1' },
  { id: 2, title: '功能卡片 2' },
  { id: 3, title: '功能卡片 3' },
  { id: 4, title: '功能卡片 4' },
  { id: 5, title: '功能卡片 5' },
  { id: 6, title: '功能卡片 6' }
]
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)]">
    <div class="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div class="space-y-8">
          <div class="space-y-4">
            <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              AI 驱动的
              <br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                模拟面试系统
              </span>
            </h1>
            <p class="text-gray-400 text-lg lg:text-xl max-w-lg leading-relaxed">
              通过 AI 数字人进行真实面试模拟，提升你的面试技能。
              智能评估、精准反馈、持续提升。
            </p>
          </div>

          <div class="flex flex-wrap gap-4">
            <UButton 
              to="/interview" 
              color="primary" 
              size="lg"
              class="font-semibold"
            >
              去面试
            </UButton>
            <UButton 
              to="/positions" 
              color="neutral" 
              variant="outline" 
              size="lg"
              class="font-semibold"
            >
              浏览岗位
              <template #trailing>
                <UIcon name="i-heroicons-arrow-right" />
              </template>
            </UButton>
          </div>

          <div class="flex items-center gap-8 pt-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-white">1000+</div>
              <div class="text-sm text-gray-500">面试题库</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-white">50+</div>
              <div class="text-sm text-gray-500">热门岗位</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-white">AI</div>
              <div class="text-sm text-gray-500">智能评估</div>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <div 
              v-for="card in placeholderCards" 
              :key="card.id"
              class="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <div class="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                <UIcon name="i-heroicons-cube" class="w-8 h-8 text-gray-600" />
              </div>
              <h3 class="text-white font-medium">{{ card.title }}</h3>
              <p class="text-gray-500 text-sm mt-1">功能描述内容</p>
            </div>
          </div>
          
          <div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  </div>
</template>
