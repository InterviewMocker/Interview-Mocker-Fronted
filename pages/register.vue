<script setup lang="ts">
import type { RegisterRequest } from '~/types/auth'

definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore()
const toast = useToast()

const loading = ref(false)
const showPassword = ref(false)

const registerForm = reactive<RegisterRequest>({
  username: '',
  password: '',
  email: '',
  real_name: '',
  school: '',
  major: ''
})

const confirmPassword = ref('')

const handleRegister = async () => {
  if (!registerForm.username || !registerForm.password) {
    toast.add({
      title: '请填写用户名和密码',
      color: 'error'
    })
    return
  }

  if (registerForm.password.length < 8) {
    toast.add({
      title: '密码长度至少为 8 位',
      color: 'error'
    })
    return
  }

  if (registerForm.password !== confirmPassword.value) {
    toast.add({
      title: '两次输入的密码不一致',
      color: 'error'
    })
    return
  }

  loading.value = true

  try {
    await authStore.register(registerForm)
    toast.add({
      title: '注册成功！请登录',
      color: 'success'
    })
    navigateTo('/login')
  } catch (error: any) {
    toast.add({
      title: error.message || '注册失败，请重试',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-lg">
    <UCard class="bg-gray-900 border-gray-800">
      <template #header>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-white">注册</h2>
          <p class="text-gray-400 mt-2">创建你的账号</p>
        </div>
      </template>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField label="用户名" required>
            <UInput 
              v-model="registerForm.username"
              placeholder="3-50 个字符"
              size="lg"
              :disabled="loading"
              icon="i-heroicons-user"
            />
          </UFormField>

          <UFormField label="邮箱">
            <UInput 
              v-model="registerForm.email"
              type="email"
              placeholder="example@email.com"
              size="lg"
              :disabled="loading"
              icon="i-heroicons-envelope"
            />
          </UFormField>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField label="密码" required>
            <UInput 
              v-model="registerForm.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="至少 8 位"
              size="lg"
              :disabled="loading"
              icon="i-heroicons-lock-closed"
            />
          </UFormField>

          <UFormField label="确认密码" required>
            <UInput 
              v-model="confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="再次输入密码"
              size="lg"
              :disabled="loading"
              icon="i-heroicons-lock-closed"
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
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField label="真实姓名">
            <UInput 
              v-model="registerForm.real_name"
              placeholder="选填"
              size="lg"
              :disabled="loading"
              icon="i-heroicons-identification"
            />
          </UFormField>

          <UFormField label="学校">
            <UInput 
              v-model="registerForm.school"
              placeholder="选填"
              size="lg"
              :disabled="loading"
              icon="i-heroicons-academic-cap"
            />
          </UFormField>
        </div>

        <UFormField label="专业">
          <UInput 
            v-model="registerForm.major"
            placeholder="选填"
            size="lg"
            :disabled="loading"
            icon="i-heroicons-book-open"
          />
        </UFormField>

        <UButton 
          type="submit" 
          color="primary" 
          size="lg" 
          block 
          :loading="loading"
        >
          注册
        </UButton>
      </form>

      <template #footer>
        <div class="text-center text-sm">
          <span class="text-gray-400">已有账号？</span>
          <NuxtLink to="/login" class="text-primary-400 hover:text-primary-300 ml-1">
            立即登录
          </NuxtLink>
        </div>
      </template>
    </UCard>
  </div>
</template>
