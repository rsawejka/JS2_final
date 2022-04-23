<template>
  <div id="wrapperFour">
    <h1 id="confrmOrderH1">Confirm order</h1>
    <div>Order is placed when you click check out</div>

    <h2 id="confrmOrderH2">Your Card On File:</h2>
    <div>
      <span class="paymentHeader">Card Name: </span>{{ paymentInfo.cardName }}
    </div>
    <div>
      <span class="paymentHeader">Card Number: </span
      >{{ paymentInfo.cardNumber }}
    </div>
    <div>
      <span class="paymentHeader">Country: </span>{{ paymentInfo.country }}
    </div>
    <div><span class="paymentHeader">State: </span>{{ paymentInfo.state }}</div>
    <div>
      <span class="paymentHeader">Street: </span>{{ paymentInfo.street }}
    </div>

    <button id="checkOutButton">
      <router-link to="/">Check Out</router-link>
    </button>
  </div>
</template>

<script>
import { db } from "../firebase";
import firebase from "firebase";
export default {
  data() {
    return {
      paymentInfo: {
        cardName: "",
        cardNumber: "",
        country: "",
        state: "",
        street: "",
      },
      cart: [],
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      let dbRef = db
        .collection("users")
        .doc(user.uid)
        .collection("paymentInfo")
        .doc(user.uid);
      dbRef
        .get()
        .then((doc) => {
          this.paymentInfo.cardName = doc.data().cardName;
          this.paymentInfo.cardNumber = doc.data().cardNumber;
          this.paymentInfo.country = doc.data().country;
          this.paymentInfo.state = doc.data().state;
          this.paymentInfo.street = doc.data().street;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
};
</script>

<style scoped>
#checkOutButton {
  background-color: tomato;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
}
#checkOutButton a {
  color: white;
}
.paymentHeader {
  font-weight: bold;
}
#confrmOrderH1 {
  color: tomato;
  margin-top: 10px;
  margin-bottom: 10px;
}
#confrmOrderH2 {
  margin-top: 10px;
  margin-bottom: 10px;
}
@media (min-width: 1100px) {
}
@media screen and (max-width: 1099px) and (min-width: 481px) {
  #wrapperFour {
    margin: 0 auto;
    width: 50%;
  }
}
@media screen and (max-width: 802px) and (min-width: 481px) {
}
@media screen and (max-width: 480px) and (min-width: 0px) {
}
</style>