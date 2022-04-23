<template>
  <div>
    <h1>Sign Up</h1>
    <label for="">Email</label>
    <br />
    <input type="text" ref="email" id="emailField" v-model="email" /><br />
    <span class="errorMessage" id="emailError"></span>
    <br />
    <label for="">Password</label>
    <br />
    <input
      type="password"
      ref="password"
      id="passwordField"
      v-model="password"
    /><br />
    <span class="errorMessage" id="passwordError"></span>

    <br />
    <button @click="emailSignUp">Sign Up</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    emailSignUp() {
      var emailRegX = /\S+@\S+\.\S+/;
      var emailField = document.getElementById("emailField").value;
      var emailError = document.getElementById("emailError");
      var emailBool = false;
      var isEmail = emailRegX.test(emailField) === true;

      if (emailField.value == "") {
        emailError.innerHTML = "you must enter a email";
      } else {
        if (isEmail) {
          emailError.innerHTML = "";
          emailBool = true;
        } else {
          emailError.innerHTML = "you must enter a valid email";
        }
      }
      var passRegX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      var passwordField = document.getElementById("passwordField").value;
      var passwordError = document.getElementById("passwordError");
      var passwordBool = false;
      var isPassword = passRegX.test(passwordField) === true;

      if (passwordField.value == "") {
        passwordError.innerHTML = "you must enter a password";
      } else {
        if (isPassword) {
          passwordError.innerHTML = "";
          passwordBool = true;
        } else {
          passwordError.innerHTML =
            "your pass word must be atleast 7 characters long with one number, one uppercase and one lowercase.";
        }
      }

      if (emailBool && passwordBool === true) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((params) => {
            console.log("SUCCESS", params);
            this.$router.push("/editProfile");
          })
          .catch((error) => {
            console.log("SIGN UP ERROR:", error.message);
            // The account could aleady exist,
            // or the password may not be strong enough
          });
      }
    },
  },
};
</script>
<style scoped>
.errorMessage {
  color: red;
  margin-top: 7px;
}
#emailField {
  border: 2px solid black;
}
#passwordField {
  border: 2px solid black;
}
@media (min-width: 1100px) {
}
@media screen and (max-width: 1099px) and (min-width: 803px) {
}
@media screen and (max-width: 802px) and (min-width: 481px) {
}
@media screen and (max-width: 480px) and (min-width: 0px) {
}
</style>
