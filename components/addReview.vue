<template>
  <div id="wrapperFive">
    <h3>Add Review</h3>
    <form @submit.prevent="onFormSubmit">
      <div id="reviewFlex">
        <div id="reviewNameDiv">
          <label>Your Name: </label><br />
          <input
            id="reviwerName"
            type="text"
            v-model="review.reviewerName"
          /><br />
          <span class="errorMessage" id="reviewerNameError"></span>
        </div>

        <div id="reviewLocationDiv">
          <label>Your Location: </label><br />
          <input
            id="reviewLocation"
            type="text"
            v-model="review.reviewerLocation"
          /><br />
          <span class="errorMessage" id="reviewerLocationError"></span>
        </div>
      </div>

      <div>
        <label>Your Review: </label><br />
        <textarea id="reviewerReview" v-model="review.review" /><br />
        <span class="errorMessage" id="reviewError"></span>
      </div>

      <div>
        <button id="reviewButton">Add review</button>
      </div>
    </form>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  props: ["id"],
  data() {
    return {
      review: {},
    };
  },
  methods: {
    onFormSubmit(event) {
      event.preventDefault();

      var reviewName = document.getElementById("reviwerName");
      var reviewerNameError = document.getElementById("reviewerNameError");
      var reviewNameBool = false;
      if (reviewName.value == "") {
        reviewerNameError.innerHTML = "You must enter your name";
      } else {
        reviewNameBool = true;
        reviewerNameError.innerHTML = "";
      }

      var reviewLocation = document.getElementById("reviewLocation");
      var reviewerLocationError = document.getElementById(
        "reviewerLocationError"
      );
      var reviewLocationBool = false;
      if (reviewLocation.value == "") {
        reviewerLocationError.innerHTML = "You must enter your city or state";
      } else {
        reviewLocationBool = true;
        reviewerLocationError.innerHTML = "";
      }

      var userReview = document.getElementById("reviewerReview");
      var reviewError = document.getElementById("reviewError");
      var userReviewBool = false;
      if (userReview.value == "") {
        reviewError.innerHTML = "You must enter your review";
      } else {
        userReviewBool = true;
        reviewError.innerHTML = "";
      }
      if (userReviewBool && reviewLocationBool && reviewNameBool === true) {
        let newReview = {
          reviewerName: this.review.reviewerName,
          reviewerLocation: this.review.reviewerLocation,
          review: this.review.review,
        };

        db.collection("products")
          .doc(this.id)
          .collection("reviews")
          .add(newReview)
          .then(() => {
            this.$router.go();
          })
          .catch((error) => {
            console.log(error);
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
#reviewButton {
  background-color: tomato;
  color: white;
  padding: 10px;
  border-radius: 10px;
  width: 30%;
  margin-top: 10px;
}
input[type="text"] {
  border-bottom: 2px solid black;
  width: 50%;
}
textarea {
  width: 100%;
  border-bottom: 2px solid black;
}
@media (min-width: 1100px) {
  #reviewLocationDiv {
    width: 50%;
  }
  #reviewNameDiv {
    width: 50%;
  }
  #reviewFlex {
    display: flex;
    width: 100%;
  }
}
@media screen and (max-width: 1099px) and (min-width: 0px) {
  #wrapperFive {
    width: 80%;
    margin: 0 auto;
  }
}
@media screen and (max-width: 802px) and (min-width: 481px) {
}
@media screen and (max-width: 480px) and (min-width: 0px) {
}
</style>