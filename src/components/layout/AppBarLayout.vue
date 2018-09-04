<template lang="html">
  <div class="jb-top-app-bar">
    <span class="jb-top-app-bar__title">News Feed</span>
    <div class="jb-flex-spacer"></div>
    <a href="https://www.linkedin.com/in/jeevan-mb-580905106/" class="jb-top-app-bar__link">
      <span>@jforcode</span>
    </a>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.jb-top-app-bar {
  display: flex;
  align-items: center;
  height: 64px;
  padding-left: 32px;
  padding-right: 32px;
  background-color: var(--primary-color);
  color: var(--primary-text-color-on-dark-bg);
}

.jb-top-app-bar__title {
  font-size: 1.4em;
}

.jb-top-app-bar__link {
  color: var(--primary-text-color-on-dark-bg);
  font-size: 1.2em;
}

</style>
