<template>
  <div>
    <!--make picture show up with product-->
    <h1 class="homeHeader">Shop</h1>
    <table>
      <tr v-for="product in products" :key="product.id">
        <td id="productName">
          <router-link
            :to="{ name: 'indevidualProduct', params: { id: product.id } }"
            >{{ product.name }}</router-link
          >
        </td>
        <td>${{ product.price }}</td>
        <td class="shopBtn">
          <span v-if="userRole == 'admin'">
            <div class="editButton">
              <router-link
                :to="{ name: 'editProduct', params: { id: product.id } }"
                >Edit</router-link
              >
            </div>
          </span>
        </td>
        <td class="shopBtn">
          <span v-if="userRole == 'admin'">
            <button
              class="deleteButton"
              @click.prevent="deleteProduct(product.id)"
            >
              Delete
            </button>
          </span>
        </td>
        <!--<img width="300px" height="150px" src="" class="imgFromFirebase">-->

        <!--{{product.imgName}}-->
      </tr>

      <span v-if="userRole == 'admin'">
        <div id="addProductButton">
          <router-link to="addProduct">Add product</router-link>
        </div>
      </span>
    </table>
  </div>
</template>

<script>
import { db } from "../firebase";
import firebase from "firebase";
export default {
  data() {
    return {
      products: [],
      images: [],
      currentUser: null,
      userRole: null,
    };
  },
  created() {
    db.collection("products").onSnapshot((snapshotChange) => {
      this.products = [];

      snapshotChange.forEach((doc) => {
        /* const storageRef = firebase.storage().ref();
    const fileName = doc.data().imgName + ".png";
    const imgRef = storageRef.child(fileName);


//add images to a images array and then loop throght that array in the template  || add the url to the database instead of the img name
        imgRef.getDownloadURL().then(url => {
            console.log(url)
             this.images.push({
              url: url
             })
             
            
        });
console.log(this.images)*/

        this.products.push({
          id: doc.id,
          name: doc.data().name,
          imgName: doc.data().imgName,
          price: doc.data().price,
        });
      });
    });
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
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
  updated() {
    /*firebase.auth().onAuthStateChanged((user) => {
      var deletebutton = document.getElementsByClassName("deleteButton");
      var editButton = document.getElementsByClassName("editButton");
      var addProductButton = document.querySelector("#addProductButton");

      if (user) {
        for (var i = 0; i < deletebutton.length; i++) {
          deletebutton[i].style.display = "inline";
        }
        for (var u = 0; u < editButton.length; u++) {
          editButton[u].style.display = "inline";
        }
        addProductButton.style.display = "inline";
      } else {
        for (var y = 0; y < deletebutton.length; y++) {
          deletebutton[y].style.display = "none";
        }
        for (var a = 0; a < editButton.length; a++) {
          editButton[a].style.display = "none";
        }
        addProductButton.style.display = "none";
      }
    });*/
  },
  destroyed() {},
  methods: {
    deleteProduct(id) {
      if (window.confirm("Do you really want delete?")) {
        db.collection("products")
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

<style>
.homeHeader {
  color: tomato;
}
.editButton a {
  background-color: tomato;
  color: white !important;
}
#productName a {
  color: tomato;
}
table tr {
  border-bottom: 2px solid #242124;
}
#addProductButton a {
  background-color: tomato;
  color: white !important;
}
table {
  border-collapse: collapse;
  width: 100%;
}
.editButton a {
  text-align: center;
}
@media (min-width: 1100px) {
  .editButton a {
    text-align: center;
    border-radius: 15px;

    padding: 8px;
  }
  .homeHeader {
    margin-top: 25px;
  }
  .shopBtn {
    width: 6%;
  }
  table {
    margin-top: 30px;
  }
  #productName {
    width: 45%;
    font-size: 1.2em;
    padding-bottom: 15px;
    padding-top: 15px;
  }

  #addProductButton {
    margin-top: 15px;
  }
  #addProductButton a {
    border-radius: 15px;

    padding: 8px;
    width: 30%;
  }
}
@media screen and (max-width: 1099px) and (min-width: 803px) {
  table {
    margin: 10px;
    padding-left: 10px;
  }
  .editButton a {
    text-align: center;
    border-radius: 15px;

    padding: 8px;
  }
  #productName {
    padding-bottom: 8px;
    padding-top: 8px;
  }
  #addProductButton {
    margin-top: 10px;
  }
  #addProductButton a {
    text-align: center;
    border-radius: 15px;

    padding: 8px;
    width: 30%;
  }
}
@media screen and (max-width: 802px) and (min-width: 481px) {
  #productName {
    padding-bottom: 8px;
    padding-top: 8px;
  }
  #addProductButton {
    margin-top: 10px;
  }
  #addProductButton a {
    text-align: center;
    border-radius: 15px;

    padding: 8px;
    width: 30%;
  }
  .editButton a {
    text-align: center;
    border-radius: 15px;

    padding: 8px;
  }
}
@media screen and (max-width: 480px) and (min-width: 0px) {
  #productName {
    padding-bottom: 8px;
    padding-top: 8px;
  }
  #addProductButton {
    margin-top: 10px;
  }
  #addProductButton a {
    text-align: center;
    border-radius: 15px;

    padding: 8px;
    width: 30%;
  }
  .editButton a {
    text-align: center;
    border-radius: 15px;

    padding: 8px;
  }
}
</style>