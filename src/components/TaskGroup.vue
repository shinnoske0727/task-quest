<template lang="pug">
    .task-group
        p.goal
            template(v-if="topTask && topTask.name")
                | 「{{topTask.name}}」
                | と死ぬ{{monster.name}}
            template(v-else)
                | タスクを追加して
                br
                | 敵を倒そう
        p.hit-point {{ monster.hitPoint }}
        monster(:pic="pic" :finish-count="finishCount")
        .kanban
            .title {{title}}
            draggable.list
                template(v-for="element in elmList")
                    task-item(:element="element" :key="element.id" @update="updateTaskList" @finishTask="finishTask")
            button.button(@click="addTask") + さらにカードを追加

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import draggable from "vuedraggable";
import { I_elmList } from "@/types";
import TaskItem from "@/components/TaskItem.vue";
import Monster from "@/components/Monster.vue";

@Component({
  components: {
    draggable,
    TaskItem,
    Monster
  }
})
export default class TaskGroup extends Vue {
  finishCount = 0;
  @Prop({
    default: ""
  })
  readonly title!: string;
  @Prop({
    default: ""
  })
  readonly pic!: string;
  @Prop({
    default: []
  })
  readonly elmList: I_elmList[] | undefined;
  @Prop({
    default: null
  })
  readonly index!: number | null;
  @Prop({
    default: ""
  })
  readonly monster!: string;

  get topTask(): I_elmList | null {
    if (!(this.elmList && this.elmList.length)) return null;
    return this.elmList.filter(elm => !elm.isFinished)[0];
  }

  addTask(): void {
    if (!(this.elmList && this.elmList.length)) return;
    const lastId = this.elmList
      .map(elm => elm.id)
      .reduce((p, c) => Math.max(c, p), 1);
    const newTask: I_elmList = {
      id: lastId + 1,
      name: "",
      isFinished: false
    };
    this.elmList.push(newTask);
    this.$emit("addTask", this.index, this.elmList);
  }

  updateTaskList(obj: I_elmList): void {
    console.log(obj);
    if (!(this.elmList && this.elmList.length)) return;
    const index = this.elmList.findIndex(elm => elm.id === obj.id);
    // 参照渡しはバグのもとなので、コピーして代入する
    console.log(index);
    const newList = [...this.elmList];
    console.log(newList);
    newList[index] = obj;
    console.log(newList);
    this.$emit("editTask", this.index, newList);
  }

  finishTask(): void {
    console.log("タスクが終わったよ");
    this.finishCount++;
  }
}
</script>

<style scoped lang="stylus">
.kanban
    width: $width
    padding: 10px
    box-sizing: border-box
    background-color: #444;
    border-radius: 4px;

.title
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
    white-space pre-wrap

.button
    display: block
    height: 1.5em
    color: #fff
    padding: 0 10px;
    box-sizing: border-box
    border-radius: $radius
</style>
