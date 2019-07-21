<template lang="pug">
    .home
        .wrapper
            template(v-for='(project, index) in projects')
                task-group(
                    :index="index"
                    :project="project"
                    @addTask="updateProjects"
                    @updateTask="updateProjects"
                )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TaskGroup from "@/components/TaskGroup.vue";
import * as firebase from "firebase/app";
import "firebase/firestore";
import {I_UserData, I_Project, I_Task, I_Monster, UpdateOption} from "../types";
import { DocumentReference } from "@firebase/firestore-types";
import { sortBy } from "lodash";
import { INITIAL_DATA } from "@/assets/data";
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

const db = firebase.firestore();


@Component({
  components: {
    TaskGroup
  }
})
export default class Home extends Vue {
  userData: I_UserData | null = null;
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

  updateProjects(option: UpdateOption): void {
    const id = localStorage.getItem("taskQuestId");
    if (!id) return;
    if (option.tasks && option.tasks.length) {
      this.updateTasks(option.index, option.tasks);
    }
    if (option.monster) {
      this.updateMonster(option.index, option.monster);
    }
    this.update(id);
  }

  updateTasks(index: number, tasks: I_Task[]): void {
    this.projects[index].tasks = tasks;
  }

  updateMonster(index: number, monster: I_Monster): void {
    this.projects[index].monster = monster;
  }

  update(id: string): void {
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

      const monsterRef = db.collection("monsters");
      const monsters = await monsterRef
        .get()
        .then(querySnapshot =>
          querySnapshot.docs.map(elem => elem.data() as I_Monster)
        );
      const sortedMonsters = sortBy(monsters, ["id"]);
      const initialData = { ...INITIAL_DATA };
      initialData.projects = initialData.projects.map((project, index) => {
        project.monster = sortedMonsters[index];
        return project;
      });
      const userRef = db.collection("users");
      await userRef
        .add(INITIAL_DATA)
        .then((docRef: DocumentReference) => {
          localStorage.setItem("taskQuestId", docRef.id);
          this.userData = INITIAL_DATA;
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
