<template>
  <div>
    <h1 id="reviewH1">Reviews</h1>
    <!--join review with product to display correct review with product        sub collection-->
    <div id="wholeReview" v-for="review in reviews" :key="review.id">
      <div>
        <div id="reviewerData">
          <div id="reviewerName">
            {{ review.reviewerName }}
          </div>
          <div id="reviewerLocation">
            {{ review.reviewerLocation }}
          </div>
        </div>
        <div id="review">
          {{ review.review }}
        </div>
      </div>

      <div v-if="userRole === 'admin'">
        <button
          class="deleteButton"
          @click.prevent="deleteProduct(review.reviewId)"
        >
          Delete
        </button>
      </div>
    </div>
    <div id="productReview" v-if="currentUser">
      <AddReview v-bind:id="id" />
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import AddReview from "./addReview.vue";
import firebase from "firebase";

export default {
  props: ["id"],
  components: {
    AddReview,
  },

  data() {
    return {
      reviews: [],
      currentUser: null,
      userRole: null,
    };
  },
  created() {
    db.collection("products")
      .doc(this.id)
      .collection("reviews")
      .get()
      .then((querySnapshot) => {
        this.reviews = [];
        querySnapshot.forEach((doc) => {
          this.reviews.push({
            reviewId: doc.id,
            review: doc.data().review,
            reviewerName: doc.data().reviewerName,
            reviewerLocation: doc.data().reviewerLocation,
          });
        });
      });
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      /*  if (!user) {
        var productReview = document.getElementById("productReview");
        productReview.style.display = "none"
      }else{
        productReview.style.display = "block";
      }*/

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
  },
  methods: {
    deleteProduct(reviewId) {
      if (window.confirm("Do you really want delete?")) {
        db.collection("products")
          .doc(this.id)
          .collection("reviews")
          .doc(reviewId)
          .delete()
          .then(() => {
            console.log("Document deleted!");
            this.$router.go();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    getUserDocument(userId) {
      console.log("GETTING USER DOCUMENT...", userId);
      const db = firebase.app().firestore();
      db.collection("users")
        .doc(userId)
        .get()
        .then((doc) => {
          if (doc.exists == false) {
            console.log("THE USER DOCUMENT DOES NOT EXIST...");
            this.createUserDocument();
          } else {
            console.log("User document:", doc.data());
            this.userRole = doc.data().role;
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.deleteButton {
  margin-top: 9px;
  background-color: tomato;
  padding: 10px;
  border-radius: 15px;
}
#reviewerData {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 15px;
}
#reviewH1 {
  text-align: center;
  margin-bottom: 30px;
  margin-top: 30px;
}
#wholeReview:nth-child(odd) {
  background-color: #242124;
  color: white;
}
#wholeReview {
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
}
#wholeReview:nth-child(even) {
  background-color: rgba(36, 33, 36, 0.5);
  color: white;
}
@media (min-width: 1100px) {
  #review {
    margin-left: 60px;
  }

  #wholeReview {
    width: 100%;

    margin-bottom: 15px;
  }
}
@media screen and (max-width: 1099px) and (min-width: 803px) {
  #wholeReview {
    margin-left: 30px;
    margin-right: 30px;
  }
  #review {
    margin-left: 30px;
  }
}
</style>