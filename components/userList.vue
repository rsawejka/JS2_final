<template>
  <div>
    <h1>User List</h1>
    <!-- <b>{{ $route.params.userRole }} -->
    <b>Current User Role: {{ userRole }}</b>
    <table border="1">
      <tr>
        <th>Email</th>
        <th>Role</th>
      </tr>
      <tr v-for="u in users" :key="u.uid">
        <td>{{ u.email }}</td>
        <td>
          <select @change="roleChanged($event, u)">
            <option v-for="r in roles" :key="r" :selected="r == u.role">
              {{ r }}
            </option>
          </select>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      userRole: "",
      users: [],
      roles: ["admin", "user"],
    };
  },
  mounted() {
    //console.log("ROUTE PARAMS: ", this.$route.params);
    this.userRole = this.$route.params.userRole;
    if (!this.userRole || this.userRole != "admin") {
      // if the user trying to access this page is not an admin,
      //then redirect them to the home page
      this.$router.push("/");
    } else {
      this.getAllUsers();
    }
  },
  methods: {
    getAllUsers() {
      const db = firebase.app().firestore();
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          this.users = [];
          querySnapshot.forEach((doc) => {
            const user = {};
            user.uid = doc.id;
            user.email = doc.data().email;
            user.role = doc.data().role;
            this.users.push(user);
          });
        })
        .catch((error) =>
          console.log("ERROR GETTING ALL USERS", error.message)
        );
    },
    roleChanged(evt, user) {
      const newRole = evt.target.value;
      //console.log(newRole, user.uid);
      const db = firebase.app().firestore();
      db.collection("users")
        .doc(user.uid)
        .update({ role: newRole })
        .then()
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
</style>