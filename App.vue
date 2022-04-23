<template>
  <v-app>
    <div>
      <header>
        <div id="loginControls">
          <span id="navImg"></span>
          <div id="loginRouterLink">
            <v-row>
              <v-btn id="loginButton" @click.stop="dialog = true">
                Login
              </v-btn>

              <v-dialog v-model="dialog" max-width="290">
                <v-card>
                  <v-card-title class="headline"> Login </v-card-title>

                  <v-card-text>
                    <label>Email: </label>
                    <input type="text" name="txtEmail" id="txtEmail" /><br />
                    <span id="emailLoginError"></span>
                    <label>Password: </label>
                    <input
                      type="password"
                      name="txtPassword"
                      id="txtPassword"
                    /><br />
                    <span id="passwordLoginError"></span><br />
                    <span id="loginError"></span><br />
                    <button
                      type="button"
                      name="btnLogin"
                      id="btnLogin"
                      value="login"
                      @click="login()"
                    >
                      Login
                    </button>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-row>
          </div>
          <div id="signUp">
            <router-link to="/signUp">Sign Up</router-link>
          </div>
        </div>
        <div id="mainNav">
          <ul>
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/shop">Shop</router-link>
            </li>
            <li id="ifAdmin" v-if="userRole == 'admin'">
              <router-link :to="{ name: 'users', params: { userRole } }"
                >Users</router-link
              >
            </li>
          </ul>
        </div>

        <div id="ifLoggedin">
          <span v-if="currentUser">
            <span id="cart">
              <router-link to="/cart"
                ><img src="./icons/shopping_cart-white-24dp.svg" alt=""
              /></router-link>
            </span>
            <span id="editProfile">
              <router-link to="/editProfile">Edit Profile</router-link>
            </span>
          </span>
        </div>
        <div id="loginBar">
          <input
            type="button"
            name="btnLogout1"
            id="btnLogout1"
            value="logout"
            @click="logout()"
          />
        </div>
      </header>
      <div id="wrapper">
       <router-view v-slot="{ Component }">
  <transition>
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </transition>
</router-view>
      </div>
      <footer>
        <div id="footerNav">
          <ul>
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/shop">Shop</router-link>
            </li>
            <li id="ifAdmin" v-if="userRole == 'admin'">
              <router-link :to="{ name: 'users', params: { userRole } }"
                >Users</router-link
              >
            </li>
          </ul>
        </div>
        &copy;Ryan Sawejka
      </footer>
    </div>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  name: "App",

  components: {},

  data() {
    return {
      dialog: false,
      currentUser: null,
      userRole: null,
    };
  },
  mounted() {
    ////////////////

    // listen for when a user logs in or logs out
    // When a user logs in fetch their data from the users collection
    // If the user is loggin in for the first time, then we need to add a document for them to the users collection
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
        // a user has just logged in, so we need to get his/her document
        // from our users collection
        this.getUserDocument(user.uid);
      } else {
        this.currentUser = null;
        this.userRole = null;
      }
    });

    /////////////////////

    firebase.auth().onAuthStateChanged((user) => {
      var logOutButton1 = document.getElementById("btnLogout1");
      var loginRouterLink = document.getElementById("loginRouterLink");
      var signUp = document.getElementById("signUp");

      if (!user) {
        logOutButton1.style.display = "none";
        loginRouterLink.style.display = "inline";
        signUp.style.display = "inline";
      } else {
        logOutButton1.style.display = "inline";
        loginRouterLink.style.display = "none";
        signUp.style.display = "none";
      }
    });
  },
  methods: {
    ////////////////////

    getUserDocument(userId) {
     
      const db = firebase.app().firestore();
      db.collection("users")
        .doc(userId)
        .get()
        .then((doc) => {
          if (doc.exists == false) {
            this.createUserDocument();
          } else {
            this.userRole = doc.data().role;
          }
        })
        .catch((error) => console.log(error));
    },
    createUserDocument() {
      const user = firebase.auth().currentUser;
      if (user) {
        // Note, you may want to store more info in the users collection
        // (I am just adding email and role, but your app may call for more fields)
        const db = firebase.app().firestore();
        this.userRole = "user"; // when a new user is created they default to the 'user' role
        db.collection("users")
          .doc(user.uid)
          .set({ email: user.email, role: this.userRole }, { merge: true })
          .catch((e) => console.log(e));
      } else {
        console.log("cannot create user doc!");
      }
    },
    ///////////////////////

    login() {
      var loginError = document.getElementById("loginError");
      var email = document.querySelector("#txtEmail").value;
      var emailLoginError = document.getElementById("emailLoginError");
      var emailLoginBool = false;

      if (email == "") {
        emailLoginError.innerHTML = "You must enter a email";
      } else {
        emailLoginBool = true;
        emailLoginError.innerHTML = "";
      }

      var password = document.querySelector("#txtPassword").value;
      var passwordLoginError = document.getElementById("passwordLoginError");
      var passwordLoginBool = false;

      if (password == "") {
        passwordLoginError.innerHTML = "You must enter a password";
      } else {
        passwordLoginBool = true;
        passwordLoginError.innerHTML = "";
      }

      if (passwordLoginBool && emailLoginBool) {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((obj) => {
            this.dialog = false;
            console.log("done!" + obj);
            this.$router.go();
          })
          .catch((error) => {
            console.log(error);
            loginError.innerHTML = "wrong email or password";
          });
      }
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
  },
};
</script>
<style scoped>
#btnLogin {
  background-color: tomato;
  color: white;
  padding: 8px;
  border-radius: 8px;
}
#txtEmail {
  border: 2px solid black;
  margin-bottom: 8px;
}
#txtPassword {
  border: 2px solid black;
  margin-bottom: 8px;
}
footer {
  margin-top: 20px;
  background-color: #242124;
  color: white;
}
header {
  background-color: #242124;
}
#loginBar input {
  color: white;
}
#signUp {
  background-color: tomato;
}
#signUp a {
  color: white;
  text-decoration: none;
}
#mainNav ul li a {
  color: tomato;
}
#ifAdmin a {
  color: tomato;
}
#editProfile a {
  color: tomato;
}
footer {
  padding-top: 20px;
  text-align: center;
}
#footerNav {
  text-align: center;
  margin-bottom: 15px;
}
#footerNav ul {
  list-style: none;
}
#footerNav ul a {
  color: white;
  text-decoration: none;
}
@media (min-width: 1100px) {
  #wrapper {
    width: 60%;
    margin: 0 auto;
  }
  #navImg {
    margin-right: 15px;
    height: 36px;
    width: 36px;
    background-image: url("./icons/polymer-white-36dp.svg");
  }
  header {
    padding-top: 15px;
    display: flex;
  }

  #loginControls {
    display: flex;
    width: 38%;
    margin-bottom: 8px;
    margin-left: 20px;
    padding-bottom: 6px;
  }
  #signUp {
    padding-top: 6px;
    width: 25%;
    text-align: center;
    margin-left: 10px;

    border-radius: 0px 10px 10px 0px;
    height: 36px;
    min-width: 20%;
  }

  #mainNav {
    padding-left: 25px;
    width: 40%;
  }
  #mainNav ul {
    list-style: none;
    display: flex;
    flex-direction: row;
  }
  #mainNav ul li {
    margin-right: 30px;
  }
  #mainNav ul li a {
    text-decoration: none;
    font-size: 1.3em;
  }
  #ifLoggedin span {
    margin-left: 10px;
  }
  #loginButton {
    width: 100%;
    margin-left: 4px;
  }
  #loginRouterLink {
    width: 10%;
  }
  #ifAdmin a {
    text-decoration: none;
  }
  #loginBar {
    margin-top: 7px;
  }
  #editProfile {
    margin-right: 7px;
  }
  #editProfile a {
    text-decoration: none;
  }
  #cart {
    padding-top: 7px;
  }
}
@media screen and (max-width: 1099px) and (min-width: 803px) {
  #navImg {
    margin-right: 15px;
    height: 36px;
    width: 36px;
    background-image: url("./icons/polymer-white-36dp.svg");
  }
  header {
    padding-top: 15px;
    display: flex;
  }

  #loginControls {
    display: flex;
    width: 38%;
    margin-bottom: 8px;
    margin-left: 20px;
    padding-bottom: 6px;
  }
  #signUp {
    padding-top: 6px;
    width: 25%;
    text-align: center;
    margin-left: 15px;

    border-radius: 0px 10px 10px 0px;
    height: 36px;
    min-width: 20%;
  }

  #mainNav {
    padding-left: 25px;
    width: 40%;
  }
  #mainNav ul {
    list-style: none;
    display: flex;
    flex-direction: row;
  }
  #mainNav ul li {
    margin-right: 30px;
  }
  #mainNav ul li a {
    text-decoration: none;
    font-size: 1.3em;
  }

  #loginButton {
    width: 100%;
    margin-left: 4px;
  }
  #loginRouterLink {
    width: 10%;
  }
  #ifAdmin a {
    text-decoration: none;
  }
  #loginBar {
    margin-top: 7px;
  }
  #editProfile {
    margin-right: 7px;
  }
  #editProfile a {
    text-decoration: none;
  }
  #cart {
    padding-top: 7px;
  }
}
@media screen and (max-width: 802px) and (min-width: 481px) {
  #signUp {
    background: none;
  }

  #loginControls {
    margin-left: 358px;
    padding-top: 15px;
  }
  #mainNav {
    text-align: center;
  }
  #mainNav ul {
    list-style: none;
  }
  #mainNav ul a {
    text-decoration: none;
    font-size: 1.3em;
  }
  #ifLoggedin {
    justify-content: space-evenly;
    display: flex;
  }
  #loginBar {
    text-align: center;
  }
}
@media screen and (max-width: 480px) and (min-width: 0px) {
  #signUp {
    background: none;
  }

  #loginControls {
    margin-left: 358px;
    padding-top: 15px;
  }
  #mainNav {
    text-align: center;
  }
  #mainNav ul {
    list-style: none;
  }
  #mainNav ul a {
    text-decoration: none;
    font-size: 1.3em;
  }
  #ifLoggedin {
    justify-content: space-evenly;
    display: flex;
  }
  #loginBar {
    text-align: center;
  }
}
</style>
