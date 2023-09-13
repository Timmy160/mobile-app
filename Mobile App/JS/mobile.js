// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// import {
//   getDatabase,
//   ref,
//   push,
//   onValue,
//   remove,
// } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// const appSettings = {
//   databaseURL:
//     "https://real-time-database-afaae-default-rtdb.europe-west1.firebasedatabase.app/",
// };
// const app = initializeApp(appSettings);
// const database = getDatabase(app);
// const shopPingListInDB = ref(database, "shoppingList");

// const inputFieldEl = document.getElementById("input-field");
// const addBtn = document.getElementById("add-button");
// let shoppingListEl = document.getElementById("shopping-list");

// addBtn.addEventListener("click", function () {
//   let inputValue = inputFieldEl.value;
//   push(shopPingListInDB, inputValue);

//   shoppingListFun(inputValue);

//   inputFieldFun();
// });

// onValue(shopPingListInDB, function (snapShot) {
//   let shoppingListInDBArr = Object.entries(snapShot.val());
//   for (let i = 0; i < shoppingListInDBArr.length; i++) {
//     let currentItem = shoppingListInDBArr[i];

//     let shoppingListForLoopID = currentItem[0];
//     let currentItemValue = currentItem[1];

//     shoppingListFun(currentItem);

//     clearShoppingListEl();
//   }
// });

// function clearShoppingListEl() {
//   shoppingListEl.innerHTML += "";
// }

// function inputFieldFun() {
//   inputFieldEl.value = "";
// }

// function shoppingListFun(item) {
//   let itemID = item[0];
//   let itemValue = item[1];

//   let newEl = document.createElement("li");
//   newEl.textContent = itemValue;

//   newEl.addEventListener("click", function () {
//     let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
//     remove(exactLocationOfItemInDB);
//   });
//   shoppingListEl.append(newEl);
// }

// //

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://real-time-database-afaae-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(shoppingListInDB, inputValue);

  clearInputFieldEl();
});

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItemToShoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items here....yet";
  }
});

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);

    remove(exactLocationOfItemInDB);
  });

  shoppingListEl.append(newEl);
}
