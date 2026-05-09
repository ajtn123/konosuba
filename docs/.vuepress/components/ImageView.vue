<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
import { withBase } from '@vuepress/client'

const props = withDefaults(defineProps<{
  src?: string
  alt?: string
  collapsed?: boolean
}>(), {
  src: '',
  alt: '',
  collapsed: false,
})

const slots = useSlots()
const hasText = computed(() => !!slots.default)

const isCollapsed = ref(props.collapsed)
const isTextView = ref(false)

const displaySrc = computed(() => withBase(props.src))

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div class="image-view" :class="{ collapsed: isCollapsed }">
    <div class="iv-header">
      <span class="iv-title">{{ alt || '图片' }}</span>
      <div class="iv-actions">
        <div v-if="hasText" class="iv-btn-group">
          <button
            class="iv-btn"
            :class="{ active: !isTextView }"
            @click="isTextView = false"
          >
            图片
          </button>
          <button
            class="iv-btn"
            :class="{ active: isTextView }"
            @click="isTextView = true"
          >
            文本
          </button>
        </div>
        <button class="iv-btn iv-collapse-btn" @click="toggleCollapse">
          <span v-if="isCollapsed">展开</span>
          <span v-else>折叠</span>
          <span class="arrow" :class="{ rotated: isCollapsed }">▼</span>
        </button>
      </div>
    </div>
    <div v-show="!isCollapsed" class="iv-content">
      <div v-show="!isTextView" class="iv-image-view">
        <img :src="displaySrc" :alt="alt" loading="lazy" />
      </div>
      <div v-show="isTextView" class="iv-text-view">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-view {
  border: 1px solid var(--vp-c-border, #d0d7de);
  border-radius: 8px;
  overflow: hidden;
  margin: 16px 0;
  background: var(--vp-c-bg, #ffffff);
}

.image-view.collapsed .iv-content {
  display: none;
}

.image-view.collapsed .iv-header {
  border-bottom: none;
}

.iv-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: var(--vp-c-bg-alt, #f6f8fa);
  border-bottom: 1px solid var(--vp-c-border, #d0d7de);
  font-size: 14px;
  flex-wrap: wrap;
  gap: 8px;
}

.iv-title {
  font-weight: 600;
  color: var(--vp-c-text-1, #24292f);
  font-family: var(--vp-font-family-mono, ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace);
  font-size: 13px;
}

.iv-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.iv-btn-group {
  display: flex;
  border: 1px solid var(--vp-c-border, #d0d7de);
  border-radius: 6px;
  overflow: hidden;
}

.iv-btn-group .iv-btn {
  border: none;
  border-radius: 0;
}

.iv-btn-group .iv-btn + .iv-btn {
  border-left: 1px solid var(--vp-c-border, #d0d7de);
}

.iv-btn-group .iv-btn.active + .iv-btn {
  border-left-color: var(--vp-c-brand-1, #0969da);
}

.iv-btn-group .iv-btn + .iv-btn.active {
  border-left-color: var(--vp-c-brand-1, #0969da);
}

.iv-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border: 1px solid var(--vp-c-border, #d0d7de);
  background: var(--vp-c-bg, #ffffff);
  color: var(--vp-c-text-2, #57606a);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  line-height: 20px;
  transition: all 0.2s ease;
  user-select: none;
}

.iv-btn:hover {
  background: var(--vp-c-bg-soft, #f3f4f6);
  color: var(--vp-c-text-1, #24292f);
}

.iv-btn.active {
  background: var(--vp-c-brand-1, #0969da);
  border-color: var(--vp-c-brand-1, #0969da);
  color: #ffffff;
}

.iv-collapse-btn .arrow {
  font-size: 10px;
  transition: transform 0.2s ease;
}

.iv-collapse-btn .arrow.rotated {
  transform: rotate(-90deg);
}

.iv-content {
  padding: 0;
}

.iv-image-view {
  display: flex;
  justify-content: center;
  padding: 0;
  background: var(--vp-c-bg-soft, #f6f8fa);
}

.iv-image-view img {
  max-width: 100%;
  height: auto;
  display: block;
}

.iv-text-view {
  padding: 1px;
  padding-left: 1em;
  padding-right: 1em;
  background: var(--vp-c-bg-soft, #f6f8fa);
}

[data-theme="dark"] .iv-btn-group {
  border-color: var(--vp-c-border, #30363d);
}

[data-theme="dark"] .iv-btn-group .iv-btn + .iv-btn {
  border-left-color: var(--vp-c-border, #30363d);
}

[data-theme="dark"] .iv-btn-group .iv-btn.active + .iv-btn {
  border-left-color: var(--vp-c-brand-1, #58a6ff);
}

[data-theme="dark"] .iv-btn-group .iv-btn + .iv-btn.active {
  border-left-color: var(--vp-c-brand-1, #58a6ff);
}

[data-theme="dark"] .iv-header {
  background: var(--vp-c-bg-alt, #161b22);
}

[data-theme="dark"] .iv-btn {
  background: var(--vp-c-bg, #21262d);
  border-color: var(--vp-c-border, #30363d);
  color: var(--vp-c-text-2, #8b949e);
}

[data-theme="dark"] .iv-btn:hover {
  background: var(--vp-c-bg-soft, #30363d);
  color: var(--vp-c-text-1, #e6edf3);
}

[data-theme="dark"] .iv-btn.active {
  background: var(--vp-c-brand-1, #58a6ff);
  border-color: var(--vp-c-brand-1, #58a6ff);
  color: #ffffff;
}

[data-theme="dark"] .iv-image-view,
[data-theme="dark"] .iv-text-view {
  background: var(--vp-c-bg-soft, #161b22);
}

[data-theme="dark"] .image-view {
  background: var(--vp-c-bg, #0d1117);
}
</style>
