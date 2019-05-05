<template lang="pug">
    .home
        .wrapper
            .group
                p.goal
                    | {{topTask.name}}と
                    br
                    | しぬゾンビ
                .monster
                    img(src="@/assets/img/monster_pic_1.png")
                .kanban
                    .kanban-title 案件A
                    draggable.list(v-model="elmList")
                        template(v-for="element in elmList")
                            task-item(:element="element" :key="element.id" @update="updateTaskList")
                    button.button(@click="addTask") + さらにカードを追加
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";
import { I_elmList } from "@/types";
import TaskItem from "@/components/TaskItem.vue";

@Component({
  components: {
    draggable,
    TaskItem
  }
})
export default class Home extends Vue {
  elmList = [
    {
      id: 1,
      name: "メールをおくる",
      isFinished: false
    },
  ];

  get topTask():I_elmList {
      return this.elmList[0]
  }

  addTask(): void {
    const lastId = this.elmList.map(elm => elm.id).reduce(
      (p, c) => Math.max(c, p),
      1
    );
    const newTask: I_elmList = {
      id: lastId + 1,
      name: '',
      isFinished: false
    };
    this.elmList.push(newTask);
  }

  updateTaskList(obj: I_elmList): void {
    const index = this.elmList.findIndex(elm => elm.id === obj.id);
    // 参照渡しはバグのもとなので、コピーして代入する
    const newList = [...this.elmList];
    newList[index].name = obj.name;
    this.elmList = newList;
  }
}
</script>

<style lang="stylus" scoped>
@import "../assets/stylus/base.styl"

.wrapper
    display grid
    grid-template-columns repeat(auto-fit, $width)
    grid-template-rows auto
    grid-gap $gap

.kanban
    width: $width
    padding: 10px
    box-sizing: border-box
    background-color: #444;
    border-radius: 4px;

.kanban-title
    color white
    margin-bottom: 5px

.goal
    margin-bottom: 20px;
    padding: 10px 0;
    text-align: center
    color #fff
    font-size: 32px;
    border: 2px solid white
    border-radius: 4px;
.monster
    margin-bottom: 20px;
    height: 300px;
    text-align: center
    > img
        height: 100%
.button
    display: block
    height: 1.5em
    color: #fff
    padding: 0 10px;
    box-sizing: border-box
    border-radius: $radius
</style>
