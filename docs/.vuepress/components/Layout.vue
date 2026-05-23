<script setup>
import { Layout } from 'vuepress-theme-plume/client'
import { useData } from 'vuepress/client'
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #doc-meta-after>
      <p v-if="frontmatter.reprint" class="vp-doc-meta">
        <span class="vpi-post" /> 转载自 <a target="_blank" :href="frontmatter.reprint">{{ frontmatter.reprint }}</a>
      </p>
    </template>
  </Layout>
</template>

<style scoped>
.vp-doc-meta {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
