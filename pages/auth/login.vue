<script setup lang="ts">
import type { LoginRequest } from '~/types/auth'

definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore()
const route = useRoute()
const toast = useToast()

const loading = ref(false)
const showPassword = ref(false)

const loginForm = reactive<LoginRequest>({
  username: '',
  password: '',
  device_type: 'web'
})

const handleLogin = async () => {
  if (!loginForm.username || !loginForm.password) {
    toast.add({
      title: '请输入用户名和密码',
      color: 'error'
    })
    return
  }

  loading.value = true

  try {
    await authStore.login(loginForm)
    toast.add({
      title: '登录成功',
      color: 'success'
    })
    const redirect = route.query.redirect as string
    navigateTo(redirect || '/')
  } catch (error: any) {
    // 处理后端返回的错误格式 {code, message}
    const errorMessage = error?.message || '登录失败，请重试'
    toast.add({
      title: '登录失败',
      description: errorMessage,
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-md">
    <UCard class="bg-gray-900 border-gray-800">
      <template #header>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-white">登录</h2>
          <p class="text-gray-400 mt-2">登录模拟面试系统</p>
        </div>
      </template>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <UFormField label="用户名" required>
          <UInput 
            v-model="loginForm.username"
            placeholder="请输入用户名"
            size="lg"
            :disabled="loading"
            icon="i-heroicons-user"
            class="w-full"
          />
        </UFormField>

        <UFormField label="密码" required>
          <UInput 
            v-model="loginForm.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="请输入密码"
            size="lg"
            :disabled="loading"
            icon="i-heroicons-lock-closed"
            class="w-full"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="ghost"
                size="xs"
                :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <UButton 
          type="submit" 
          color="primary" 
          size="lg" 
          block 
          :loading="loading"
        >
          登录
        </UButton>
      </form>

      <template #footer>
        <div class="text-center text-sm">
          <span class="text-gray-400">还没有账号？</span>
          <NuxtLink to="/auth/register" class="text-primary-400 hover:text-primary-300 ml-1">
            立即注册
          </NuxtLink>
        </div>
      </template>
    </UCard>
  </div>
</template>
