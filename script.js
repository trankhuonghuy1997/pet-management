"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// variable declaration
const inputId = $("#input-id");
const inputName = $("#input-name");
const inputAge = $("#input-age");
const inputType = $("#input-type");
const inputWeight = $("#input-weight");
const inputLength = $("#input-length");
const inputColor = $("#input-color-1");
const inputBreed = $("#input-breed");
const inputDewormed = $("#input-dewormed");
const inputVaccinated = $("#input-vaccinated");
const inputSterilized = $("#input-sterilized");
const calBMIBtn = $("#calBMI-btn");
let date;
// const alertEl = $(".alert");

const submitBtn = $("#submit-btn");
const healthyBtn = $("#healthy-btn");
const tBody = $("#tbody");
let dangerBtn = $$(".danger-btn");
// console.log(dangerBtn);
let healthyCheck = false;
let id,
  name,
  age,
  type,
  weight,
  length,
  color,
  breed,
  isVaccinated,
  isDewormed,
  isSterilized,
  infor,
  dateOfSubmit;

let htmls;
let deletePet;
let isValidate;
let petArr = [];
let petArrId = [];
let healthyPetArr = [];
let countPet;

const app = {
  // Khoi tao
  init: function () {
    for (const [key, value] of Object.entries(localStorage)) {
      if (key.slice(0, 2) === "id") {
        isValidate = true;
        app.genderOnload(JSON.parse(value));
        petArrId.push(JSON.parse(value).id);
        petArr.push(JSON.parse(value));
      }
    }

    dangerBtn = $$(".btn-danger");
    date = new Date();
  },
  // Hàm lấy dữ liệu nhập vào
  getdata: function () {
    infor = {
      id: inputId.value,
      name: inputName.value,
      age: Number(inputAge.value),
      type: inputType.value,
      weight: Number(inputWeight.value),
      length: Number(inputLength.value),
      color: inputColor.value,
      breed: inputBreed.value,
      isDewormed: inputDewormed.checked,
      isSterilized: inputSterilized.checked,
      isVaccinated: inputVaccinated.checked,
      dateOfSubmit:
        date.getDate() +
        "/" +
        (Number(date.getMonth()) + Number(1)) +
        "/" +
        date.getFullYear(),
    };
  },

  // hàm kiểm tra các giá trị nhập vào có hợp lệ chưa
  validate: function () {
    isValidate = true;
    if (isValidate === true && infor.id === "") {
      alert("Please input for ID");
      isValidate = false;
    } else {
      petArrId.push(infor.id);
      for (let i = 0; i < petArrId.length - 1; i++) {
        if (petArrId[i] === petArrId[petArrId.length - 1]) {
          alert("ID must unique!");
          // alertEl.classList.remove("hidden");
          petArrId.pop();
          isValidate = false;
        }
      }
    }

    if (isValidate === true && infor.name === "") {
      alert("Please input for Name");
      isValidate = false;
      petArrId.pop();
    }

    if (
      isValidate === true &&
      (infor.age === "" || infor.age < 1 || infor.age > 15)
    ) {
      alert("Age must be between 1 and 15!");
      isValidate = false;
      petArrId.pop();
    }

    if (
      isValidate === true &&
      (infor.weight === "" || infor.weight < 1 || infor.weight > 15)
    ) {
      alert("Weight must be between 1 and 15!");
      isValidate = false;
      petArrId.pop();
    }

    if (
      isValidate === true &&
      (infor.length === "" || infor.length < 1 || infor.length > 100)
    ) {
      alert("Lenth must be between 1 and 100!");
      isValidate = false;
      petArrId.pop();
    }

    if (isValidate === true && infor.type === "Select Type") {
      alert("Please select Type!");
      isValidate = false;
      petArrId.pop();
    }

    if (isValidate === true && infor.breed === "Select Breed") {
      alert("Please select Breed!");
      isValidate = false;
      petArrId.pop();
    }
  },
  genderOnload: function (infor) {
    htmls = `
              <th scope="row" class="idvalue">${infor.id}</th>
              <td>${infor.name}</td>
              <td>${infor.age}</td>
              <td class="type">${infor.type}</td>
              <td><span class="weight">${infor.weight}</span> kg</td>
              <td><span class="length">${infor.length}</span> cm</td>
              <td>${infor.breed}</td>
              <td>
                  <i class="bi bi-square-fill" style="color: ${
                    infor.color
                  }"></i>
              </td>
              <td><i class="bi bi-${
                infor.isVaccinated ? "check-circle" : "x-circle"
              }-fill"></i></td>
              <td><i class="bi bi-${
                infor.isDewormed ? "check-circle" : "x-circle"
              }-fill"></i></td>
              <td><i class="bi bi-${
                infor.isSterilized ? "check-circle" : "x-circle"
              }-fill"></i></td>            
              <td>${infor.dateOfSubmit}</td>
              <td><button type="button" id=${
                infor.id
              } class="btn btn-danger">Delete</button>
              </td>           
          `;
    let newPet = document.createElement("tr");
    newPet.innerHTML = htmls;
    tBody.appendChild(newPet);
  },
  // Hàm thêm thú cưng vào danh sách và reset dữ liệu nhập
  gender: function (infor) {
    if (isValidate) {
      htmls = `
              <th scope="row" class="idvalue">${infor.id}</th>
              <td>${infor.name}</td>
              <td>${infor.age}</td>
              <td class="type">${infor.type}</td>
              <td><span class="weight">${infor.weight}</span> kg</td>
              <td><span class="length">${infor.length}</span> cm</td>
              <td>${infor.breed}</td>
              <td>
                  <i class="bi bi-square-fill" style="color: ${
                    infor.color
                  }"></i>
              </td>
              <td><i class="bi bi-${
                infor.isVaccinated ? "check-circle" : "x-circle"
              }-fill"></i></td>
              <td><i class="bi bi-${
                infor.isDewormed ? "check-circle" : "x-circle"
              }-fill"></i></td>
              <td><i class="bi bi-${
                infor.isSterilized ? "check-circle" : "x-circle"
              }-fill"></i></td>            
              <td>${infor.dateOfSubmit}</td>
              <td><button type="button" id=${
                infor.id
              } class="btn btn-danger">Delete</button>
              </td>           
          `;
      let newPet = document.createElement("tr");
      newPet.innerHTML = htmls;
      tBody.appendChild(newPet);

      inputId.value = "";
      inputName.value = "";
      inputAge.value = "";
      inputWeight.value = "";
      inputLength.value = "";
      inputType.value = "Select Type";
      inputBreed.value = "Select Breed";
      inputDewormed.checked = false;
      inputSterilized.checked = false;
      inputVaccinated.checked = false;
      inputColor.value = "#000000";
    }
  },

  // delete function
  deletePet: function () {
    dangerBtn = $$(".btn-danger");
    for (let i = 0; i < dangerBtn.length; i++) {
      dangerBtn[i].addEventListener("click", function (e) {
        if (confirm("Are you sure?")) {
          e.target.parentElement.parentElement.remove();
          for (const [key, value] of Object.entries(localStorage)) {
            // remove from local storage
            if (
              JSON.parse(value).id ===
              dangerBtn[i].closest(".btn").getAttribute("id")
            ) {
              localStorage.removeItem(key);
              petArrId = petArrId.filter((el) => el !== JSON.parse(value).id);
            }
          }
        }
      });
    }
  },
  // hàm lấy các nút delete có trước khi nhập

  handleEvent: function () {
    // Lắng nghhe sự kiện nút submit
    submitBtn.addEventListener("click", function () {
      app.getdata();
      app.validate();
      if (isValidate) {
        if (confirm("Are you want to save")) {
          app.gender(infor);
          console.log(petArrId);
          saveToStorage(`id${infor.id}`, JSON.stringify(infor));
        }
      }
      // Thêm sự kiện delete cho dữ liệu mới nhập vào
      app.deletePet();
      genderBreed();
    });

    // Lắng nghe sự kiện nút show heathy pet hay ko
    healthyBtn.addEventListener("click", function () {
      const idvalue = $$(".idvalue");
      if (!healthyCheck) {
        healthyCheck = true;
        healthyBtn.textContent = "Show All Pet";
        for (let i = 0; i < idvalue.length; i++) {
          if (
            idvalue[i].parentElement.querySelectorAll(".bi-check-circle-fill")
              .length !== 3
          ) {
            idvalue[i].parentElement.classList.add("hidden");
          }
        }
      } else {
        healthyBtn.textContent = "Show Healthy Pet";
        healthyCheck = false;
        for (let i = 0; i < idvalue.length; i++) {
          idvalue[i].parentElement.classList.remove("hidden");
        }
      }
    });
  },

  start: function () {
    this.init();
    this.handleEvent();
    this.deletePet();
  },
};
app.start();

// Kiểm tra các id đầu vào có sẵn

// gender breed
const genderBreed = function () {
  if (inputType.value === "Select Type") {
    inputBreed.innerHTML = `<option class="option">Select Breed</option>`;
  } else if (inputType.value === "Dog") {
    inputBreed.innerHTML = `<option class="option">Select Breed</option>`;
    for (let i = 0; i < localStorage.length; i++) {
      if (
        Object.keys(localStorage)[i].slice(0, 2) === "br" &&
        JSON.parse(getFromStorage(Object.keys(localStorage)[i])).type === "Dog"
      ) {
        // const addEl = Object.keys(localStorage)[i];
        const addEl = JSON.parse(
          getFromStorage(Object.keys(localStorage)[i])
        ).breed;

        const html = `
            <option>${addEl}</option>
          `;

        inputBreed.insertAdjacentHTML("beforeend", html);
      }
    }
  } else {
    inputBreed.innerHTML = `<option class="option">Select Breed</option>`;
    for (let i = 0; i < localStorage.length; i++) {
      if (
        Object.keys(localStorage)[i].slice(0, 2) === "br" &&
        JSON.parse(getFromStorage(Object.keys(localStorage)[i])).type === "Cat"
      ) {
        // const addEl = Object.keys(localStorage)[i];
        const addEl = JSON.parse(
          getFromStorage(Object.keys(localStorage)[i])
        ).breed;

        const html = `
            <option>${addEl}</option>
          `;

        inputBreed.insertAdjacentHTML("beforeend", html);
      }
    }
  }
};
