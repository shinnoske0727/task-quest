<template lang="pug">
    .task-group
        p.name {{ monster.name }}
        .hit-point
            .hit-point-item(v-for="n in monster.hitPoint" :key="n" :data-index="n" :data-active="n <= monster.remaining")
        p.goal
            template(v-if="topTask && topTask.name")
                | 弱点 : {{topTask.name}}
            template(v-else)
                | 弱点 : タスクを追加して敵を倒そう
        monster(:pic="require(`@/assets/img/${monster.nameId}.png`)" :finish-count="finishCount")
        .kanban
            .title {{ project.title }}
            draggable.list
                template(v-for="task in activeTasks")
                    task-item(:element="task" :key="task.id" @update="updateTaskList" @finishTask="finishTask")
            button.button(@click="addTask") + さらにカードを追加

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import draggable from "vuedraggable";
import { I_elmList, I_Monster, I_Project, UpdateOption } from "@/types";
import TaskItem from "@/components/TaskItem.vue";
import Monster from "@/components/Monster.vue";
import { sample } from "lodash";
import wait from "@/assets/utils/wait";

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
    default: null
  })
  readonly project!: I_Project | null;

  @Prop({
    default: null
  })
  readonly index!: number;

  @Prop({
    default: null
  })
  readonly db!: firebase.firestore.Firestore;

  get topTask(): I_elmList | null {
    if (!(this.tasks && this.tasks.length)) return null;
    return this.tasks.filter(task => !task.isFinished)[0];
  }
  get tasks(): I_elmList[] | null {
    if (!this.project) return null;
    return this.project.tasks;
  }
  get activeTasks(): I_elmList[] | null {
    if (!this.tasks) return null;
    return this.tasks.filter(task => !task.isFinished);
  }
  get monster(): I_Monster | null {
    return this.project && this.project.monster ? this.project.monster : null;
  }

  addTask(): void {
    if (!(this.tasks && this.tasks.length)) return;
    const lastId = this.tasks
      .map(task => task.id)
      .reduce((p, c) => Math.max(c, p), 1);
    const newTask: I_elmList = {
      id: lastId + 1,
      name: "",
      isFinished: false
    };
    this.tasks.push(newTask);
    const option: UpdateOption = {
      index: this.index,
      tasks: this.tasks
    };
    this.$emit("addTask", option);
  }

  updateTaskList(obj: I_elmList): void {
    if (!(this.tasks && this.tasks.length)) return;
    const index = this.tasks.findIndex(task => task.id === obj.id);
    // 参照渡しはバグのもとなので、コピーして代入する
    const newTasks = [...this.tasks];
    newTasks[index] = obj;
    const option: UpdateOption = {
      index: this.index,
      tasks: newTasks
    };
    this.$emit("updateTask", option);
  }

  async updateMonster(): Promise<void> {
    if (!this.monster) return;
    let monster: I_Monster | undefined = { ...this.monster };
    monster.remaining -= 1;
    if (monster.remaining <= 0) {
      await wait(500);
      const monsterRef = this.db.collection("monsters");
      const monsters = await monsterRef
        .get()
        .then(querySnapshot =>
          querySnapshot.docs.map(elem => elem.data() as I_Monster)
        );
      monster = sample(monsters);
    }
    const option: UpdateOption = {
      index: this.index,
      monster: monster
    };
    this.$emit("updateTask", option);
  }

  finishTask(): void {
    this.updateMonster();
    this.finishCount++;
  }
}
</script>

<style scoped lang="stylus">
.task-group
    width: 300px

.kanban
    width: $width
    padding: 10px
    box-sizing: border-box
    background-color: #444;
    border-radius: 4px;

.title
    color white
    margin-bottom: 5px

.name
    padding: 10px 0;
    text-align: center
    color #fff
    font-size: 24px;
    font-weight: bold

.hit-point
    width: 100%
    display: flex
    height: 20px
    margin: 10px 0;
    border: 1px solid #fff;
    box-sizing border-box
    text-align: center
    color #fff
    font-size: 20px;
    font-weight: bold

.hit-point-item
    flex: 1;
    background-color: black;
    border-right: 1px solid #fff;
    &:last-of-type
        border-right: none;
    &[data-active="true"]
        background-color: #008a70;


.goal
    height: 3em
    margin-bottom: 20px;
    padding: 10px 0;
    text-align: center
    color #fff
    font-size: 16px;
    font-weight: bold
    white-space pre-wrap

.button
    display: block
    height: 1.5em
    color: #fff
    padding: 0 10px;
    box-sizing: border-box
    border-radius: $radius
</style>
