<template>
  <div>
    <h1>cart</h1>
    <div v-for="item in cart" :key="item.id">
      <div class="cartItem">
        <div id="itemName">
          {{ item.name }}
        </div>
        <div id="itemPrice">${{ item.price }}</div>
        <div id="itemDelete">
          <button id="remove" @click.prevent="deleteCartItem(item.id)">
            Remove
          </button>
        </div>
      </div>
    </div>

    <button id="checkOut" @click="checkOut">Check out</button>
    <div id="paymentInfo">
      <GetPayment />
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import firebase from "firebase";
import GetPayment from "./editProfile";

export default {
  components: {
    GetPayment,
  },
  data() {
    return {
      cart: [],
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection("users")
        .doc(user.uid)
        .collection("cart")
        .onSnapshot((snapshotChange) => {
          this.cart = [];
          snapshotChange.forEach((doc) => {
            this.cart.push({
              id: doc.id,
              name: doc.data().name,
              price: doc.data().price,
            });
          });
        });
    });
  },
  methods: {
    checkOut() {
      this.getUserPayment();
    },
    getUserPayment() {
      firebase.auth().onAuthStateChanged((user) => {
        const db = firebase.app().firestore();
        db.collection("users")
          .doc(user.uid)
          .collection("paymentInfo")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists == false) {
              console.log("THE USER payment DOES NOT EXIST...");
              alert("you need to add payment info to check out");
              var paymentInfo = document.getElementById("paymentInfo");
              paymentInfo.style.display = "block";
            } else {
              console.log("User payment:");
              this.$router.push("/confirmOrder");
            }
          })
          .catch((error) => console.log(error));
      });
    },
    deleteCartItem(id) {
      var user = firebase.auth().currentUser;

      if (window.confirm("Do you really want to delete?")) {
        db.collection("users")
          .doc(user.uid)
          .collection("cart")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Document deleted!");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
</script>



<style scoped>
#itemName {
  width: 33%;
}
#checkOut {
  margin-top: 10px;
  background-color: tomato;
  color: white;
  padding: 8px;
  border-radius: 8px;
}
#remove {
  background-color: tomato;
  color: white;
  padding: 8px;
  border-radius: 8px;
}
.cartItem {
  padding: 15px;
  border-bottom: 2px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#paymentInfo {
  display: none;
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
