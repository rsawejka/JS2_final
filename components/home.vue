<template>
  <div>
    <div id="tabletBK1">
      <h1 class="homeHeader">Featured Products </h1>
      <div class="homePageFlex">
        <div class="featItem">
          <h2 class="featItemHeader">Gaming Accessories</h2>
          <img src="" id="firstImg" alt="" />
          <div class="featItemText">
            Check out our collection of gaming accessories
          </div>
          <button class="featItemButton">
            <router-link to="/shop">Browse</router-link>
          </button>
        </div>
        <div class="featItem">
          <h2 class="featItemHeader">Screens</h2>
          <img src="" id="secondImg" alt="" />
          <div class="featItemText">Check out our collection of screens</div>
          <button class="featItemButton secondButton">
            <router-link to="/shop">Browse</router-link>
          </button>
        </div>
        <div class="featItem">
          <h2 class="featItemHeader">Hardware</h2>
          <img src="" id="thirdImg" alt="" />
          <div class="featItemText">
            Check out our collection of our hardware
          </div>
          <button class="featItemButton">
            <router-link to="/shop">Browse</router-link>
          </button>
        </div>
      </div>
    </div>
    <div id="tabletBK2">
      <h1 class="homeHeader">Popular Items</h1>
      <div class="homePageFlex">
        <div class="featItem">
          <h2 class="featItemHeader">Nvidia 3080</h2>
          <img src="" id="popImg1" alt="" />
          <div class="featItemText">The best grapics card out there</div>
          <button class="featItemButton">
            <router-link to="/indevidualProductmFFMDk0NXY0sGHODuj74"
              >Check It Out</router-link
            >
          </button>
        </div>
        <div class="featItem">
          <h2 class="featItemHeader">Logitech G403 Mouse</h2>
          <img src="" id="popImg2" alt="" />
          <div class="featItemText">Perfect gaming mouse</div>
          <button class="featItemButton">
            <router-link to="/indevidualProductL6daWte4Lz0mYLgN49hP"
              >Check It Out</router-link
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  created() {
    const storageRef = firebase.storage().ref();
    const imgRef1 = storageRef.child("acc.jpg");

    imgRef1.getDownloadURL().then((url) => {
      document.getElementById("firstImg").setAttribute("src", url);
    });

    const imgRef2 = storageRef.child("mon.jpg");

    imgRef2.getDownloadURL().then((url) => {
      document.getElementById("secondImg").setAttribute("src", url);
    });
    const imgRef3 = storageRef.child("3080.png");

    imgRef3.getDownloadURL().then((url) => {
      document.getElementById("thirdImg").setAttribute("src", url);
      document.getElementById("popImg1").setAttribute("src", url);
    });
    const imgRef4 = storageRef.child("logitechg403.png");

    imgRef4.getDownloadURL().then((url) => {
      document.getElementById("popImg2").setAttribute("src", url);
    });
  },
};
</script>

<style>
a {
  text-decoration: none;
}
@media (min-width: 1100px) {
  .homeHeader {
    margin-top: 25px;
  }
  .homePageFlex {
    margin-top: 30px;
    display: flex;
    justify-content: space-evenly;
    border-bottom: 2px solid tomato;
    padding-bottom: 20px;
  }
  .featItem {
    width: 25%;
  }
  .featItemHeader {
    margin-bottom: 20px;
  }
  .featItemText {
    margin-top: 25px;
  }
  .featItemButton {
    margin-top: 20px;
    margin-left: 60px;
    background-color: tomato;
    width: 50%;
    padding: 9px;
    border-radius: 30px;
  }
  .secondButton {
    margin-top: 33px;
  }
  .featItemButton a {
    color: white !important;
    text-decoration: none;
  }
  #firstImg {
    height: 110px;
    width: 100%;
  }
  #secondImg {
    height: 110px;
    width: 80%;
  }
  #thirdImg {
    height: 110px;
    width: 95%;
  }
  #popImg1 {
    height: 110px;
    width: 95%;
  }
  #popImg2 {
    height: 110px;
    width: 95%;
  }
}
@media screen and (max-width: 1099px) and (min-width: 803px) {
  .homeHeader {
    margin-top: 25px;
    margin-left: 30px;
  }
  .homePageFlex {
    margin-top: 30px;
    display: flex;
    justify-content: space-evenly;
    border-bottom: 2px solid tomato;
    padding-bottom: 20px;
  }
  .featItem {
    width: 25%;
  }
  .featItemHeader {
    margin-bottom: 20px;
  }
  .featItemText {
    margin-top: 25px;
  }
  .featItemButton {
    margin-top: 20px;
    margin-left: 60px;
    background-color: tomato;
    width: 50%;
    padding: 9px;
    border-radius: 30px;
  }
  .secondButton {
    margin-top: 33px;
  }
  .featItemButton a {
    color: white !important;
    text-decoration: none;
  }
  #firstImg {
    height: 110px;
    width: 100%;
  }
  #secondImg {
    height: 110px;
    width: 80%;
  }
  #thirdImg {
    height: 110px;
    width: 95%;
  }
  #popImg1 {
    height: 110px;
    width: 95%;
  }
  #popImg2 {
    height: 110px;
    width: 95%;
  }
}
@media screen and (max-width: 802px) and (min-width: 481px) {
  .homeHeader {
    padding-top: 15px;
    margin-left: 15px;
  }
  #firstImg {
    height: 110px;
    width: 35%;
  }
  #secondImg {
    height: 110px;
    width: 35%;
  }
  #thirdImg {
    height: 110px;
    width: 35%;
  }
  #popImg1 {
    height: 110px;
    width: 35%;
  }
  #popImg2 {
    height: 110px;
    width: 35%;
  }
  .homePageFlex {
    text-align: center;
  }
  .featItemButton {
    margin-top: 20px;
    background-color: tomato;
    width: 30%;
    padding: 9px;
    border-radius: 30px;
  }
  .featItemButton a {
    color: white !important;
    text-decoration: none;
  }
  #tabletBK1 {
    padding-bottom: 20px;
  }
  #tabletBK2 {
    background-color: lightgray;

    padding-bottom: 20px;
  }
}
@media screen and (max-width: 480px) and (min-width: 0px) {
  .homeHeader {
    padding-top: 15px;
    margin-left: 15px;
  }
  #firstImg {
    height: 70px;
    width: 30%;
  }
  #secondImg {
    height: 70px;
    width: 30%;
  }
  #thirdImg {
    height: 70px;
    width: 30%;
  }
  #popImg1 {
    height: 70px;
    width: 30%;
  }
  #popImg2 {
    height: 70px;
    width: 30%;
  }
  .homePageFlex {
    text-align: center;
  }
  .featItemButton {
    margin-top: 20px;
    background-color: tomato;
    width: 30%;
    padding: 9px;
    border-radius: 30px;
  }
  .featItemButton a {
    color: white !important;
    text-decoration: none;
  }
  #tabletBK1 {
    padding-bottom: 20px;
  }
  #tabletBK2 {
    background-color: lightgray;

    padding-bottom: 20px;
  }
}
</style>