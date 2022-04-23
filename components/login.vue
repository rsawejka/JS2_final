<template>
  <!--NOT USING THIS FILE ANYMORE, JUST KEPT FOR REFRENCE-->
  <div>
    <input type="text" name="txtEmail" id="txtEmail" />
    <input type="text" name="txtPassword" id="txtPassword" />
    <button
      type="button"
      name="btnLogin"
      id="btnLogin"
      value="login"
      @click="login()"
    >
      login
    </button>

    <input
      type="button"
      name="btnLogout"
      id="btnLogout"
      value="logout"
      @click="logout()"
    />
    <input
      type="button"
      id="btnLoginCheck"
      value="login check"
      @click="watchforlogin()"
    />
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      //if logged in
      var txtEmail = document.querySelector("#txtEmail");
      var txtPassword = document.querySelector("#txtPassword");
      var btnLogin = document.querySelector("#btnLogin");

      //if not logged in

      var btnLogout = document.getElementById("btnLogout");

      if (user) {
        txtEmail.style.display = "none";
        txtPassword.style.display = "none";
        btnLogin.style.display = "none";
        btnLogout.style.display = "inline";
      } else {
        txtEmail.style.display = "inline";
        txtPassword.style.display = "inline";
        btnLogin.style.display = "inline";
        btnLogout.style.display = "none";
      }
    });
  },
  methods: {
    login() {
      var email = document.querySelector("#txtEmail").value;
      var password = document.querySelector("#txtPassword").value;

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((obj) => {
          console.log("done!" + obj);
        })
        .catch((error) => {
          console.log(error);
          alert("unable to log in");
        });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            alert("you have signed out!");
          },
          (error) => {
            console.log(error);
          }
        );
    },
    watchforlogin() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("Logged in", user);
        } else {
          console.log("logged out");
        }
      });
    },
  },
};
</script>

<style>
</style>