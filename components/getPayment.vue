<template>
<!--not using this page no more kept for refrence-->
  <div>    
      <h3>Payment and shipping info</h3>
    <form @submit.prevent="addPaymentInfo">
      <div>
        <label>Name on card</label>
        <input type="text" v-model="payment.cardName" />
      </div>

      <div>
        <label>Card number</label>
        <input type="text" v-model="payment.cardNumber" />
      </div>

      <div>
        <label>CVV</label>
        <input type="text" v-model="payment.cvv" />
      </div>
      <div>
        <label>Expiration Data</label>
        <input type="text" v-model="payment.expo" />
      </div>
      <div>
        <label>Your street</label>
        <input type="text" v-model="payment.street" />
      </div>
      <div>
        <label>Your state</label>
        <input type="text" v-model="payment.state" />
      </div>
      <div>
        <label>Your zip</label>
        <input type="text" v-model="payment.zip" />
      </div>
      <div>
        <label>Your country</label>
        <input type="text" v-model="payment.country" />
      </div>

 

      <div>
        <button>Add payment info</button>
        <router-link to="/">Not now</router-link>
      </div>
    </form>
    </div>
</template>

<script>
import { db } from "../firebase";
import firebase from "firebase";

export default {
//if not logged in redirect to home  have to be logged in to be on this page
data() {
    return {
      payment: {},
    };
  },
mounted(){
  
  
 
},
    methods: {
    addPaymentInfo() {
      var user = firebase.auth().currentUser;
        if (user){
           console.log(user.uid);
          let newPayment = {
            cardName: this.payment.cardName,
            cardNumber: this.payment.cardNumber,
            cvv: this.payment.cvv,
            expo: this.payment.expo,
            street: this.payment.street,
            zip: this.payment.zip,
            country: this.payment.country,
            state: this.payment.state,
          };
          db.collection("users")
            .doc(user.uid)
            .collection("paymentInfo")
            .doc(user.uid)
            .set(newPayment)
            .then(() => {
              this.$router.go();
            });
        }else{
          alert("nothing happend you must sign in")
        }
         
      
     
    },
  },

}

</script>

<style>

</style>