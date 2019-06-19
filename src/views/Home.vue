<template lang="pug">
    .home
        header.header
        .wrapper
            template(v-for='(project, index) in projects')
                task-group(:title="project.title" :pic="monsterList[index]" :elm-list="project.tasks"
                :index="index"
                @addTask="updateTasks"
                @editTask="updateTasks"
                )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TaskGroup from "@/components/TaskGroup.vue";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { I_UserData, I_Project, I_Task } from "../types";
import { DocumentReference } from "@firebase/firestore-types";
const firebaseConfig = {
  apiKey: "AIzaSyBZKvokIkAHSe_DyyFCzBjOJPo-zhrIcT4",
  authDomain: "task-quest-31d58.firebaseapp.com",
  databaseURL: "https://task-quest-31d58.firebaseio.com",
  projectId: "task-quest-31d58",
  storageBucket: "task-quest-31d58.appspot.com",
  messagingSenderId: "872983845084",
  appId: "1:872983845084:web:5f03a422d3bf2a79"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const hoge: I_UserData = {
  user: "anonymous",
  projects: [
    {
      id: 1,
      name: "案件1",
      tasks: [
        { id: 1, isFinished: false, name: "新しいタスクを追加してください" }
      ]
    },
    {
      id: 2,
      name: "案件2",
      tasks: [
        { id: 1, isFinished: false, name: "新しいタスクを追加してください" }
      ]
    },
    {
      id: 3,
      name: "案件3",
      tasks: [
        { id: 1, isFinished: false, name: "新しいタスクを追加してください" }
      ]
    },
    {
      id: 4,
      name: "案件4",
      tasks: [
        { id: 1, isFinished: false, name: "新しいタスクを追加してください" }
      ]
    }
  ]
};
const db = firebase.firestore();

@Component({
  components: {
    TaskGroup
  }
})
export default class Home extends Vue {
  userData: I_UserData | null = null;
  monsterList = [
    require("@/assets/img/monster_pic_1.png"),
    require("@/assets/img/monster_pic_2.png"),
    require("@/assets/img/monster_pic_3.png"),
    require("@/assets/img/monster_pic_4.png")
  ];
  elmList = [
    {
      id: 1,
      name: "メールをおくる",
      isFinished: false
    }
  ];

  get projects(): I_Project[] {
    return this.userData ? this.userData.projects : [];
  }

  updateTasks(index: number, tasks: I_Task[]): void {
    const id = localStorage.getItem("taskQuestId");
    if (!id) return;
    this.projects[index].tasks = tasks;
    const ref = db.collection("users").doc(id);
    ref
      .update({
        projects: this.projects
      })
      .then(() => {
        console.log("success");
      })
      .catch(e => {
        throw new Error(e);
      });
  }

  async fetchData() {
    const id = localStorage.getItem("taskQuestId");
    if (id) {
      // 既存のものを取得
      await db
        .collection("users")
        .doc(id)
        .get()
        .then(docSnapshot => {
          if (docSnapshot) {
            this.userData = docSnapshot.data() as I_UserData;
          } else {
            throw new Error("Don't exist data");
          }
        });
    } else {
      // 新しく生成
      const ref = db.collection("users");
      await ref
        .add(hoge)
        .then((docRef: DocumentReference) => {
          localStorage.setItem("taskQuestId", docRef.id);
        })
        .catch(e => {
          throw new Error(e);
        });
    }
  }

  created() {
    this.fetchData();
  }
}
</script>

<style lang="stylus" scoped>
@import "../assets/stylus/base.styl"

.home
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    white-space nowrap
    display: flex
    flex-direction: column
    justify-content: flex-start
    align-items: flex-start

.header
    position: fixed
    width: 100%
    height: 100px
    background-color: #fff

.wrapper
    margin-top: 100px
    flex: 1
    display grid
    grid-template-columns repeat(auto-fit, $width)
    grid-auto-flow column
    grid-template-rows auto
    grid-gap $gap
    justify-content: flex-start
    box-sizing: border-box
    padding: 0 30px
</style>
