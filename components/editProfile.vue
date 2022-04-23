<template>
  <div id="wrapperTwo">
    <h1 id="paymentInfoH1">Payment Information</h1>
    <h3>We accept Visa, Mastercard, Discovery, and American Express</h3>
    <form @submit.prevent="addPaymentInfo">
      <div id="nameOnCard">
        <label for="cardName">Name on Card: </label><br />
        <input
          id="cardName"
          name="cardName"
          type="text"
          v-model="paymentInfo.cardName"
        />
        <span class="errorMessage" id="cardNameError"></span>
      </div>

      <div id="flexOne">
        <div id="cardNumberDiv">
          <label>Card Number: </label><br />
          <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            v-model="paymentInfo.cardNumber"
          />
          <span class="errorMessage" id="cardNumberError"></span>
        </div>

        <div id="cardCVV">
          <label>CVV: </label><br />
          <input id="paymentCVV" type="text" v-model="paymentInfo.cvv" />
          <span class="errorMessage" id="paymentCVVError"></span>
        </div>

        <div id="cardExpo">
          <label>Expo Date: </label><br />
          <input id="experationDate" type="text" v-model="paymentInfo.expo" />
          <span class="errorMessage" id="experationDateError"></span>
        </div>
      </div>
      <div id="streetAddress">
        <label>Street Address: </label><br />
        <input id="street" type="text" v-model="paymentInfo.street" />
        <span class="errorMessage" id="streetError"></span>
      </div>
      <div id="flexTwo">
        <div id="country">
          <label>Country: </label><br />
          <input
            id="paymentCountry"
            type="text"
            v-model="paymentInfo.country"
          />
          <span class="errorMessage" id="paymentCountryError"></span>
        </div>

        <div id="stateDiv">
          <label>State: </label><br />
          <input id="state" type="text" v-model="paymentInfo.state" />
          <span class="errorMessage" id="stateError"></span>
        </div>

        <div id="zipDiv">
          <label>Zip Code: </label><br />
          <input id="zip" type="text" v-model="paymentInfo.zip" />
          <span class="errorMessage" id="zipError"></span>
        </div>
      </div>

      <div id="btnUpateProfileDiv">
        <button id="btnUpdateProfile">Update profile</button><br />
        <div id="routerLinkBackHome">
          <router-link to="/">Back Home</router-link>
        </div>
      </div>
    </form>
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
        cvv: "",
        expo: "",
        state: "",
        street: "",
        zip: "",
      },
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
          this.paymentInfo.cvv = doc.data().cvv;
          this.paymentInfo.expo = doc.data().expo;
          this.paymentInfo.state = doc.data().state;
          this.paymentInfo.street = doc.data().street;
          this.paymentInfo.zip = doc.data().zip;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  methods: {
    addPaymentInfo() {
      //validation

      var cardName = document.getElementById("cardName");
      var cardNameError = document.getElementById("cardNameError");
      var cardNameBool = false;

      if (cardName.value == "") {
        cardNameError.innerHTML = "You must enter a product name";
      } else {
        cardNameBool = true;
        cardNameError.innerHTML = "";
      }

      //note for Niall if you are trying to test this just get rid of the "cardNumberBool" from the if statement below there will be another comment by it
      // or just delete all card number validation
      //im assuming you dont want to put your card info in here
      var visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
      var mastPattern = /^(?:5[1-5][0-9]{14})$/;
      var amexPattern = /^(?:3[47][0-9]{13})$/;
      var discPattern = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

      var ccNum = document.getElementById("cardNumber").value;
      var cardNumberError = document.getElementById("cardNumberError");
      var cardNumberBool = false;
      var isVisa = visaPattern.test(ccNum) === true;
      var isMast = mastPattern.test(ccNum) === true;
      var isAmex = amexPattern.test(ccNum) === true;
      var isDisc = discPattern.test(ccNum) === true;

      if (ccNum.value == "") {
        cardNumberError.innerHTML = "You must enter a card number";
      } else {
        if (isVisa || isMast || isAmex || isDisc) {
          if (isVisa) {
            alert("is Visa");
            cardNumberBool = true;
            cardNumberError.innerHTML = "";
          } else if (isMast) {
            alert("is master");
            cardNumberBool = true;
            cardNumberError.innerHTML = "";
          } else if (isAmex) {
            alert("is american");
            cardNumberBool = true;
            cardNumberError.innerHTML = "";
          } else if (isDisc) {
            alert("is disocver");
            cardNumberBool = true;
            cardNumberError.innerHTML = "";
          }
        } else {
          cardNumberError.innerHTML = "you must enter a valid card number";
        }
      }

      var paymentCountry = document.getElementById("paymentCountry");
      var paymentCountryError = document.getElementById("paymentCountryError");
      var paymentCountryBool = false;

      if (paymentCountry.value == "") {
        paymentCountryError.innerHTML = "You must enter you country";
      } else {
        paymentCountryBool = true;
        paymentCountryError.innerHTML = "";
      }

      var cvvRegX = /^[0-9]{3,4}$/;
      var paymentCVV = document.getElementById("paymentCVV").value;
      var isCVV = cvvRegX.test(paymentCVV) === true;
      var paymentCVVError = document.getElementById("paymentCVVError");
      var paymentCVVBool = false;

      if (isCVV) {
        paymentCVVBool = true;
        paymentCVVError.innerHTML = "";
      } else {
        paymentCVVError.innerHTML = "you must enter a valid CVV";
      }

      var dateRegX = /^(0[1-9]|1[0-2])\/\d{2}$/;
      var experationDate = document.getElementById("experationDate").value;
      var isDate = dateRegX.test(experationDate) === true;
      var experationDateError = document.getElementById("experationDateError");
      var experationDateBool = false;

      if (isDate) {
        experationDateError.innerHTML = "";
        experationDateBool = true;
      } else {
        experationDateError.innerHTML =
          "you must enter a date in the format DD/YY";
      }

      var state = document.getElementById("state");
      var stateError = document.getElementById("stateError");
      var stateBool = false;

      if (state.value == "") {
        stateError.innerHTML = "You must enter your state";
      } else {
        stateBool = true;
        stateError.innerHTML = "";
      }

      var street = document.getElementById("street");
      var streetError = document.getElementById("streetError");
      var streetBool = false;

      if (street.value == "") {
        streetError.innerHTML = "You must enter your street";
      } else {
        streetBool = true;
        streetError.innerHTML = "";
      }

      var zip = document.getElementById("zip");
      var zipError = document.getElementById("zipError");
      var zipBool = false;

      if (zip.value == "") {
        zipError.innerHTML = "You must enter your zip code";
      } else {
        zipBool = true;
        zipError.innerHTML = "";
      }

      //here delete the cardNumberBool if trying to test
      if (
        cardNameBool &&
        cardNumberBool &&
        paymentCountryBool &&
        paymentCVVBool &&
        experationDateBool &&
        stateBool &&
        streetBool &&
        zipBool === true
      ) {
        var user = firebase.auth().currentUser;
        if (user) {
          console.log(user.uid);
          let newPayment = {
            cardName: this.paymentInfo.cardName,
            cardNumber: this.paymentInfo.cardNumber,
            cvv: this.paymentInfo.cvv,
            expo: this.paymentInfo.expo,
            street: this.paymentInfo.street,
            zip: this.paymentInfo.zip,
            country: this.paymentInfo.country,
            state: this.paymentInfo.state,
          };
          db.collection("users")
            .doc(user.uid)
            .collection("paymentInfo")
            .doc(user.uid)
            .set(newPayment)
            .then(() => {
              this.$router.go();
            });
        } else {
          alert("nothing happend you must sign in");
        }
      }
    },
  },
};
</script>
<style scoped>
.errorMessage {
  color: red;
}
#routerLinkBackHome a {
  color: tomato;
}
#paymentInfoH1 {
  color: tomato;
}
#paymentInfoH1 {
  margin-top: 10px;
}
#zipDiv {
  width: 20%;
}
#zipDiv input[type="text"] {
  width: 100%;
}
#stateDiv {
  width: 40%;
}
#stateDiv input[type="text"] {
  width: 100%;
}
#country {
  width: 40%;
}
#country input[type="text"] {
  width: 100%;
}

#streetAddress input[type="text"] {
  width: 100%;
}
#cardCVV {
  width: 15%;
}
#cardNumberDiv {
  width: 70%;
}

#cardExpo {
  width: 15%;
}
#cardCVV input[type="text"] {
  width: 100%;
}
#cardNumberDiv input[type="text"] {
  width: 100%;
}

#cardExpo input[type="text"] {
  width: 100%;
}
label {
  font-weight: bold;
}
#zipDiv {
  width: 100%;
}
#stateDiv {
  width: 100%;
}
#country {
  width: 100%;
}
#cardCVV {
  width: 100%;
}
#cardNumberDiv {
  width: 100%;
}
#cardExpo {
  width: 100%;
}
input[type="text"] {
  border-bottom: 2px solid black;
}
form {
  width: 100%;
  margin-top: 50px;
}
#btnUpdateProfile {
  border-radius: 10px;
  color: white;
  padding: 9px;
  width: 40%;
  background-color: tomato;
}
#btnUpateProfileDiv {
  margin-top: 50px;
  text-align: center;
}
@media (max-width: 1099px) {
  #wrapperTwo {
    margin: 0 auto;
    width: 50%;
  }
  input[type="text"] {
    margin-bottom: 15px;
  }
}
@media (min-width: 803px) {
  #flexTwo {
    display: flex;
  }

  #flexOne {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  #nameOnCard input[type="text"] {
    width: 100%;
  }
  input[type="text"] {
    padding-top: 8px;
    width: 50%;
    border-bottom: 2px solid black;
    margin-bottom: 10px;
    font-size: 1em;
  }

  label {
    font-size: 1.2em;
    font-weight: bold;
  }
}
@media screen and (max-width: 802px) and (min-width: 481px) {
  input[type="text"] {
    width: 100%;
  }
}
@media screen and (max-width: 480px) and (min-width: 0px) {
}
</style>