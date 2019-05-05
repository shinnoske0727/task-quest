<template lang="pug">
    .task-item
        .check(:data-is-checked="taskStatus" @click="toggleTaskStatus")
            img(src="@/assets/img/common/icn_check.png")
        input.text(type='text' v-model='taskValue' @change="updateTask" :data-is-checked="taskStatus")
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { I_elmList } from "@/types";

@Component
export default class TaskItem extends Vue {
  @Prop({
    default: () => {}
  })
  readonly element!: I_elmList;

  taskValue = this.element.name;
  taskStatus = this.element.isFinished;

  updateTask(): void {
    const obj: I_elmList = {
      id: this.element.id,
      name: this.taskValue,
      isFinished: this.taskStatus
    };
    this.$emit("update", obj);
  }

  toggleTaskStatus(): void {
    this.taskStatus = !this.taskStatus;
    this.updateTask();
  }
}
</script>

<style lang="stylus" scoped>
@import "../assets/stylus/base.styl"

.task-item
    display: flex
    width: 100%
    margin-bottom: 0.5em

input[type="text"]
    flex 1
    width: 100%
    line-height: 1.5
    padding: 0 10px;
    border: none;
    border-radius: $radius
    outline: none;
    background-color: #000;
    box-sizing: border-box
    color #fff
    &[data-is-checked='true']
        pointer-events none
        color #666

.check
    width: 24px
    height: 24px
    cursor: pointer
    img
        width: 100%
        height: 100%
    &[data-is-checked='true']
        filter grayscale(1)
</style>
