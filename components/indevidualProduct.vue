<template>
  <div id="whole">
    <h1>{{ product.name }}</h1>
    <div id="product">
      <div id="indevidualProductImg">
        <img src="" id="imgFromFirebase" />
      </div>

      <div id="indevidualProductData">
        <h3>Description:</h3>
        <div id="description">{{ product.description }}</div>
        <div><span id="price">Price:</span> ${{ product.price }}</div>
        <button id="addToCart" @click.prevent="addToCart(product.id)">
          Add to cart
        </button>
      </div>
    </div>

    <ProductReview v-bind:id="id" />
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../firebase";
import ProductReview from "./productReview.vue";
export default {
  components: {
    ProductReview,
  },
  props: ["id"],
  data() {
    return {
      product: { name: "", description: "" },
    };
  },
  created() {
    let dbRef = db.collection("products").doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        this.product.name = doc.data().name;
        this.product.description = doc.data().description;
        this.product.imgName = doc.data().imgName;
        this.product.price = doc.data().price;

        const storageRef = firebase.storage().ref();
        const fileName = doc.data().imgName + ".png";
        console.log(fileName + "filename");
        const imgRef = storageRef.child(fileName);

        imgRef.getDownloadURL().then((url) => {
          console.log(url);
          document.getElementById("imgFromFirebase").setAttribute("src", url);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {},
  methods: {
    addToCart() {
      var user = firebase.auth().currentUser;

      console.log(user.uid);
      let newCartItem = {
        name: this.product.name,
        price: this.product.price,
      };
      db.collection("users")
        .doc(user.uid)
        .collection("cart")
        .add(newCartItem)
        .then(() => {});
    },
  },
};
</script>
<style scoped>
#addToCart {
  margin-top: 20px;
  padding: 8px;
  border-radius: 15px;
  background-color: tomato;
  width: 30%;
  text-align: center;
  color: white;
}
#price {
  font-weight: bold;
}
@media (min-width: 1100px) {
  #imgFromFirebase {
    width: 80%;
  }

  h3 {
    margin-bottom: 7px;
  }
  h1 {
    margin-top: 15px;
    margin-bottom: 30px;
  }
  #product {
    display: flex;
    flex-direction: row;
  }
  #price {
    font-weight: bold;
  }
  #description {
    margin-bottom: 10px;
  }
  #indevidualProductImg {
    width: 40%;
  }
  #indevidualProductData {
    margin-top: 30px;
    width: 60%;
    text-align: left;
    margin-left: 10px;
  }
}
@media screen and (max-width: 1099px) and (min-width: 803px) {
  h1 {
    margin-left: 100px;
    margin-top: 15px;
    margin-bottom: 30px;
  }
  #product {
    display: flex;
    flex-direction: row;
    margin-left: 100px;
  }
  #imgFromFirebase {
    width: 60%;
  }
  #indevidualProductImg {
    width: 40%;
  }
  #indevidualProductData {
    margin-top: 30px;
    width: 60%;
    text-align: left;
    margin-left: 10px;
  }
}
@media screen and (max-width: 802px) and (min-width: 481px) {
  #product {
    display: flex;
    flex-direction: row;
  }
  h1 {
    margin-left: 50px;
    margin-top: 15px;
    margin-bottom: 30px;
  }

  #indevidualProductImg {
    margin-left: 50px;
    width: 60%;
  }
  #imgFromFirebase {
    width: 80%;
  }
  #indevidualProductData {
    width: 100%;
    margin-left: 50px;
  }
  #addToCart {
    width: 50%;
  }
}
@media screen and (max-width: 480px) and (min-width: 0px) {
  #addToCart {
    width: 80%;
  }
  #imgFromFirebase {
    width: 60%;
  }
  #whole {
    margin-left: 20px;
  }
}
</style>