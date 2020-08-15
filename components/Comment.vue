<template>
  <div class="box">
    <div class="field mb_m">
      <label class="label">コメント</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input">
      </div>
    </div>
    <div class="field mb_m">
      <label class="label">声の種類</label>
      <div class="control">
        <div class="select">
          <select>
            <option>男性ぽい声</option>
            <option>女性ぽい声</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field is-grouped btn-group">
      <div class="control">
        <button class="button is-rounded is-outlined">
          <span class="icon is-small"><i class="fas fa-times"></i></span>
          <span>キャンセル</span>
        </button>
      </div>
      <div class="control">
        <button class="button is-rounded is-outlined is-primary">
          <span class="icon is-small"><i class="fas fa-play"></i></span>
          <span>再生</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Comment"
  }
</script>

<style scoped lang="scss">
  .btn-group {
    button {
      width: 150px;
    }
    > *:nth-child(1) {
      margin-left: auto;
    }
  }
</style>