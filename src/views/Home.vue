<template lang="pug">
    .home
        .wrapper
            .kanban
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
      name: "task1",
      isFinished: false
    },
    {
      id: 2,
      name: "task1",
      isFinished: false
    },
    {
      id: 3,
      name: "task1",
      isFinished: false
    }
  ];

  addTask(): void {
    const lastId = Array.from(this.elmList.keys()).reduce(
      (p, c) => Math.max(c, p),
      0
    );
    const newTask: I_elmList = {
      id: lastId + 1,
      name: String(Date.now()),
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
    background-color: red
    border-radius: $radius
    box-sizing: border-box

.button
    display: block
    background-color: blue
    height: 1.5em
    color: #fff
    padding: 0 10px;
    box-sizing: border-box
    border-radius: $radius
</style>
