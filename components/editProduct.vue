<template>
  <div id="wrapperThree">
    <h1 id="updateProdutH1">Update product {{ product.name }}</h1>
    <form @submit.prevent="onUpdateForm">
      <div>
        <label>Name: </label> <br />
        <input id="productName" type="text" v-model="product.name" /><br />
        <span class="errorMessage" id="productNameError"></span>
      </div>

      <div>
        <label>Description: </label> <br />
        <textarea id="productDiscription" v-model="product.description" /><br />
        <span class="errorMessage" id="productDiscriptionError"></span>
      </div>

      <div>
        <label>Price: </label> <br />
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
        <label>Image Name: </label> <br />
        <input
          id="productImgName"
          type="text"
          v-model="product.imgName"
        /><br />
        <span class="errorMessage" id="productImgNameError"></span>
      </div>

      <div>
        <button id="updateProduct">Update product</button>
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
      product: { name: "", description: "", price: "", imgName: "" },
    };
  },
  created() {
    let dbRef = db.collection("products").doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        this.product.name = doc.data().name;
        this.product.description = doc.data().description;
        this.product.price = doc.data().price;
        this.product.imgName = doc.data().imgName;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onUpdateForm(event) {
      event.preventDefault();

      var productName = document.getElementById("productName");
      var productNameError = document.getElementById("productNameError");
      var productNameBool = false;

      if (productName.value == "") {
        productNameError.innerHTML = "You must enter a product name";
      } else {
        productNameBool = true;
        productNameError.innerHTML = "";
      }

      var productDiscription = document.getElementById("productDiscription");
      var productDiscriptionError = document.getElementById(
        "productDiscriptionError"
      );
      var productDiscriptionBool = false;

      if (productDiscription.value == "") {
        productDiscriptionError.innerHTML =
          "You must enter a product description";
      } else {
        productDiscriptionBool = true;
        productDiscriptionError.innerHTML = "";
      }

      var productPrice = document.getElementById("productPrice");
      var productPriceError = document.getElementById("productPriceError");
      var productPriceBool = false;

      if (productPrice.value == "") {
        productPriceError.innerHTML = "You must enter a product price";
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

      if (productImgName.value == "") {
        productImgNameError.innerHTML = "You must enter a product image name";
      } else {
        productImgNameBool = true;
        productImgNameError.innerHTML = "";
      }

      if (
        productImgNameBool &&
        productPriceBool &&
        productDiscriptionBool &&
        productNameBool
      ) {
        let updatedProduct = {
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
          imgName: this.product.imgName,
        };

        db.collection("products")
          .doc(this.$route.params.id)
          .update(updatedProduct)
          .then(() => {
            this.$router.go(-1);
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
  margin-top: 7px;
  color: red;
}
#updateProdutH1 {
  color: tomato;
  margin-top: 15px;
}
input[type="file"] {
  margin-top: 10px;
  margin-bottom: 10px;
}
#updateProduct {
  background-color: tomato;
  padding: 10px;
  color: white;
  border-radius: 10px;
  margin-top: 15px;
}
label {
  font-weight: bold;
  margin-bottom: 8px;
}
input[type="text"],
textarea {
  border-bottom: 2px solid black;
}
textarea {
  width: 50%;
  height: 100px;
}

@media (min-width: 1100px) {
}
@media screen and (max-width: 1099px) and (min-width: 803px) {
  #wrapperThree {
    margin: 0 auto;
    width: 50%;
  }
}
@media screen and (max-width: 802px) and (min-width: 481px) {
  #wrapperThree {
    margin: 0 auto;
    width: 50%;
  }
}
@media screen and (max-width: 480px) and (min-width: 0px) {
}
</style>