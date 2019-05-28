<template lang="pug">
    .home
        header.header
        .wrapper
            task-group(:title="'案件A'" :pic="require('@/assets/img/monster_pic_1.png')")
            task-group(:title="'案件B'" :pic="require('@/assets/img/monster_pic_2.png')")
            task-group(:title="'案件C'" :pic="require('@/assets/img/monster_pic_3.png')")
            task-group(:title="'案件D'" :pic="require('@/assets/img/monster_pic_4.png')")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TaskGroup from "@/components/TaskGroup.vue";
import * as firebase from 'firebase/app';
import 'firebase/firestore';
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
console.log(db)

@Component({
  components: {
    TaskGroup,
  }
})
export default class Home extends Vue {
    data:any = null;
    created() {
        db.collection("users").get().then((querySnapshot:any) => {
            querySnapshot.forEach((doc:any) => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                this.data = doc.data()
            });
        });
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
