<template lang="pug">
    .task-item
        input.text(v-model='taskValue' @change="updateTask")
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { I_elmList } from "@/types";

@Component
export default class TaskItem extends Vue {
  @Prop({ default: () => {} }) readonly element!: I_elmList;

  taskValue = this.element.name;

  updateTask(): void {
    this.$emit("update", this.taskValue);
  }
}
</script>

<style lang="stylus" scoped>
 @import "../assets/stylus/base.styl"

.task-item
    width: 100%
    background-color: #fff
    line-height: 1.5
    margin-bottom:0.5em
    padding: 0 10px;
    box-sizing: border-box
    border-radius: $radius
</style>
