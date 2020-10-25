<template>
  <div id="header">
    <h1 class="logo"><a href="/"><img src="@/assets/images/logo.gif"/></a></h1>
    <p class="header-disc m_plus_r_300">簡単自動おしゃべりサービス</p>
  </div>
</template>

<script lang="ts">
</script>

<style scoped lang="scss">
  #header {
    width: 100%;
    background: $primary;
    color: #FFF;
    padding: $size-s $size-m;
    box-sizing: border-box;
    display: flex;
    align-items: baseline;

    .logo {
      height: 24px;

      img {
        width: 120px;
      }
    }

    .header-disc {
      font-size: $font-size-xs;
      margin-left: $size-s;
    }
  }
</style>
