<template lang="pug">
    footer.footer
        .result
            p.all これまでに倒した敵 :  {{ allRepel }} 体
            p.daily 今日倒した敵 : {{ repelPerDate }} 体
            p.rank 今日の頑張り度 : {{ todayRank }}
        a.twitter-share-button(href='https://twitter.com/share?ref_src=twsrc%5Etfw', data-show-count='false') 冒険の記録をシェア

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class TaskFooter extends Vue {
  @Prop({
    default: 0
  })
  readonly allRepel!: number;
  @Prop({
    default: 0
  })
  readonly repelPerDate!: number;

  get todayRank(): string {
    if (!this.repelPerDate) return "さあ、はじめよう！";
    let word = "";
    switch (this.repelPerDate) {
      case 0:
        word = "さあ、はじめよう！";
        break;
      case 1:
        word = "いい感じ！";
        break;
      case 2:
        word = "まだまだいける！！";
        break;
      case 3:
        word = "もっといけるはず！！";
        break;
      case 4:
        word = "頑張った！！！";
        break;
      case 5:
        word = "すごく頑張った！！！";
        break;
      case 6:
        word = "とてつもなく頑張った！！！";
        break;
      case 7:
        word = "ありえないくらい頑張った！！！";
        break;
      case 8:
        word = "うわっ･･･私の頑張り、凄すぎ･･･？";
        break;
      case 9:
        word = "頑張り半端ない...まじ半端ないって...";
        break;
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
        word = "頑張りすぎ！今日はもう寝よう。";
        break;
      default:
        word = "チートしないで！（怒）";
        break;
    }

    return word;
  }
}
</script>

<style scoped lang="stylus">
.footer
    display: flex
    justify-content: flex-start
    align-items center
    position absolute
    left: 0
    background-color: #000;
    bottom: 10px
    width: 100%
    padding: 0 30px;
    box-sizing border-box


.result
    display: flex
    justify-content space-between
    margin-right: 1.5em;
    min-width: 700px;
    padding: 15px 10px;
    border: 1px solid #fff;
    border-radius: 4px;
.all
    margin-right: 3em
    color: #fff;
    font-size: 16px;
    font-weight: bold
.daily
    margin-right: 3em
    color: #fff;
    font-size: 16px;
    font-weight: bold
.rank
    color: #fff;
    font-size: 16px;
    font-weight: bold
</style>
