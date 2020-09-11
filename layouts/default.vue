<template>
  <div class="two-columns">
    <div class="side-nav is-one-quarter">
      <side-nav/>
    </div>
    <div class="content">
      <Nuxt/>
    </div>
  </div>
</template>

<style lang="scss">
  html {
    font-family: 'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  html,body{
    height: 100vh;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }

  #navbarBasicExample {
    a {
      font-size: 14px;
    }
  }

  .two-columns{
    display: flex;
    min-height: 100vh;
    .side-nav{
      padding: 0;
      width: 200px;
    }
    .content {
      flex: 1;
    }
  }

</style>
<script>
  import SideNav from "../components/SideNav";

  export default {
    components: {SideNav}
  }
</script>