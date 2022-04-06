<template>
  <div>
    <h1>Intervention Home Page</h1>
    <h3>Firestore data parsing....</h3>
    <h3 class="my-8">{{ displayNames }}</h3>
    <h3 @click="createUser()" style="cursor: pointer">Click to add user</h3>
  </div>
</template>

<script>
import { firestoreDB, userRef } from "../../firebase/init.js";
import {
  query,
  where,
  getDocs,
  getDoc,
  doc,
  collection,
  setDoc,
} from "firebase/firestore";
import { getters, mapGetters, mapState } from "vuex";

export default {
  name: "Intervention",

  data() {
    return {
      uid: "H2s6rpQiMHNj4pvHVPkU",
      displayNames: [],
    };
  },
  // middleware: "authentication"

  methods: {
    createUser() {
      //-----create a document

      // init collection ref
      const colRef = collection(firestoreDB, "Users");
      setDoc(doc(colRef), {
        displayName: "Sze Tyng",
        isDHP: true,
      }).then(() => {
        this.initialize();
      });

      const userData = {
        type: "dummy",
        displayName: "test",
      };
    },

    initialize() {
      this.displayNames = [];
      //-----using query for firebase modular SDK
      const q = query(
        collection(firestoreDB, "Users"),
        where("isDHP", "==", true)
      );

      getDocs(q).then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          console.log(doc.data().displayName);

          this.displayNames.push(doc.data().displayName);
        });
      });

      //-----reading a single docucment with firebase modular SDK
      const docRef = doc(firestoreDB, "Users", this.uid);

      getDoc(docRef).then((doc) => {
        console.log("read data once");
        let data = doc.data();
        console.log(data.displayName);
      });
    },
  },

  created() {
    this.initialize();
    // old firestore function
    // userRef
    //   .collection("Users")
    //   .doc(this.uid)
    //   .get()
    //   .then((doc) => {
    //     this.displayName = doc.data().displayName;
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  },

  computed: {
    ...mapGetters[("user/isAuthenticated", "user/isEmailVerifired")],
  },
};
</script>

<style scoped>
</style>
