<template>
  <div id="wrapperSix">
    <h1 id="addProductH1">Add Product</h1>
    <form @submit.prevent="onFormSubmit">
      <div>
        <label>Name: </label><br />
        <input id="productName" type="text" v-model="product.name" /><br />
        <span class="errorMessage" id="productNameError"></span>
      </div>

      <div>
        <label>Description: </label><br />
        <textarea id="productDescription" v-model="product.description" /><br />
        <span class="errorMessage" id="productDescriptionError"></span>
      </div>

      <div>
        <label>Price: </label><br />
        <input id="productPrice" type="text" v-model="product.price" /><br />
        <span class="errorMessage" id="productPriceError"></span>
      </div>

      Choose an image to upload:
      <input
        @change="uploadFile"
        type="file"
        name="fileUpload"
        id="fileUpload"
      />

      <div>
        <label>Image Name: </label><br />
        <input
          id="productImgName"
          type="text"
          v-model="product.imgName"
        /><br />
        <span class="errorMessage" id="productImgNameError"></span>
      </div>

      <div>
        <button id="btnAddProduct">Add Product</button>
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
      product: {},
    };
  },
  methods: {
    onFormSubmit(event) {
      event.preventDefault();

      var productName = document.getElementById("productName");
      var productNameError = document.getElementById("productNameError");
      var productNameBool = false;

      if (productName.value == "") {
        productNameError.innerHTML = "You must enter your name";
      } else {
        productNameBool = true;
        productNameError.innerHTML = "";
      }

      var productDescription = document.getElementById("productDescription");
      var productDescriptionError = document.getElementById(
        "productDescriptionError"
      );
      var productDescriptionBool = false;

      if (productDescription.value == "") {
        productDescriptionError.innerHTML = "You must enter a description";
      } else {
        productDescriptionBool = true;
        productDescriptionError.innerHTML = "";
      }

      var productPrice = document.getElementById("productPrice");
      var productPriceError = document.getElementById("productPriceError");
      var productPriceBool = false;

      if (productPrice.value == "") {
        productPriceError.innerHTML = "You must enter a price";
      } else {
        if (!isNaN(productPrice.value)) {
          productPriceError.innerHTML = "";
          productPriceBool = true;
        } else {
          productPriceError.innerHTML = "You must enter a number";
        }
      }

      var productImgName = document.getElementById("productImgName");
      var productImgNameError = document.getElementById("productImgNameError");
      var productImgNameBool = false;

      if (productImgName.value === "") {
        productImgNameError.innerHTML = "You must enter a img name";
      } else {
        productImgNameBool = true;
        productImgNameError.innerHTML = "";
      }
      if (
        productImgNameBool &&
        productPriceBool &&
        productDescriptionBool &&
        productNameBool === true
      ) {
        let newProduct = {
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
          imgName: this.product.imgName,
        };

        db.collection("products")
          .add(newProduct)
          .then(() => {
            this.$router.push("/shop");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    uploadFile(evt) {
      const file = evt.target.files[0];
      const storeageRef = firebase.storage().ref();

      const imgRef = storeageRef.child(file.name);

      const task = imgRef.put(file);

      task.then(() => {
        console.log("uploaded");
      });
    },
  },
};
</script>
<style scoped>
.errorMessage {
  color: red;
}
#btnAddProduct {
  color: white;
  background-color: tomato;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
}
input[type="file"] {
  margin-top: 10px;
  margin-bottom: 10px;
}
textarea {
  border-bottom: 2px solid black;
  width: 50%;
  height: 100px;
}
input[type="text"] {
  border-bottom: 2px solid black;
  width: 50%;
}
label {
  font-weight: bold;
}
#addProductH1 {
  margin-top: 10px;
  color: tomato;
}
@media (min-width: 1100px) {
}
@media screen and (max-width: 1099px) and (min-width: 0px) {
  #wrapperSix {
    margin: 0 auto;
    width: 50%;
  }
}
@media screen and (max-width: 802px) and (min-width: 481px) {
}
@media screen and (max-width: 480px) and (min-width: 0px) {
}
</style>