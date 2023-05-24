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

const submitBtn = $("#submit-btn");
const healthyBtn = $("#healthy-btn");
const tBody = $("#tbody");
let editBtn = $$(".warning-btn");

const editForm = $("#container-form");
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
  date,
  infor;

let htmls;
let deletePet;
let isValidate;
let petArr = [];
let petArrId = [];
let healthyPetArr = [];
let countPet;
let editOb;
let editedPet;

const edit = {
  // Khởi tạo giá trị ban đầu: gender tất cả object pet ra màn hình edit
  init: function () {
    date = new Date();
    for (let i = 0; i < localStorage.length; i++) {
      if (Object.keys(localStorage)[i].slice(0, 2) === "id") {
        const newInfor = JSON.parse(
          getFromStorage(Object.keys(localStorage)[i])
        );
        isValidate = true;
        edit.gender(newInfor);
      }
    }
    // create pet arr
    for (const [key, value] of Object.entries(localStorage)) {
      if (key.slice(0, 2) === "id") {
        petArrId.push(JSON.parse(value).id);
        countPet = petArrId.length;
        petArr.push(JSON.parse(value));
      }
    }

    editBtn = $$(".btn-warning");
  },

  genderBreed: function (infor) {
    if (inputType.value === "Select Type") {
      inputBreed.innerHTML = `<option class="option">Select Breed</option>`;
    } else if (inputType.value === "Dog") {
      inputBreed.innerHTML = `<option class="option">Select Breed</option>`;
      for (let i = 0; i < localStorage.length; i++) {
        if (
          Object.keys(localStorage)[i].slice(0, 2) === "br" &&
          JSON.parse(getFromStorage(Object.keys(localStorage)[i])).type ===
            "Dog"
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
      inputBreed.value = infor.breed;
    } else {
      inputBreed.innerHTML = `<option class="option">Select Breed</option>`;
      for (let i = 0; i < localStorage.length; i++) {
        if (
          Object.keys(localStorage)[i].slice(0, 2) === "br" &&
          JSON.parse(getFromStorage(Object.keys(localStorage)[i])).type ===
            "Cat"
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
      inputBreed.value = infor.breed;
    }
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
              } class="btn btn-warning">Edit</button>
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
  validate: function (infor) {
    isValidate = true;
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
  // hàm lấy các giá trị của pet cần edit
  getEditElement: function () {
    editBtn = $$(".btn-warning");
    editBtn.forEach((btn) =>
      btn.addEventListener("click", function (e) {
        editForm.classList.remove("hide");
        const clicked = e.target.getAttribute("id");
        for (let i = 0; i < petArr.length; i++) {
          editOb = petArr[i];
          if (clicked === editOb.id) {
            inputId.value = editOb.id;
            inputName.value = editOb.name;
            inputAge.value = editOb.age;
            inputType.value = editOb.type;
            inputWeight.value = editOb.weight;
            inputLength.value = editOb.length;
            inputColor.value = editOb.color;
            // inputBreed.value = editOb.breed;
            inputDewormed.checked = editOb.isDewormed;
            inputSterilized.checked = editOb.isSterilized;
            inputVaccinated.checked = editOb.isVaccinated;
            edit.genderBreed(editOb);
          }
        }
      })
    );
  },
  handeler: function () {
    edit.getEditElement();
    // Submit những thay đổi và lưu lại vào local storage
    submitBtn.addEventListener("click", function (e) {
      for (let i = 0; i < petArr.length; i++) {
        editedPet = petArr[i];
        if (inputId.value === editedPet.id) {
          editedPet.name = inputName.value;
          editedPet.age = Number(inputAge.value);
          editedPet.type = inputType.value;
          editedPet.weight = Number(inputWeight.value);
          editedPet.length = Number(inputLength.value);
          editedPet.color = inputColor.value;
          editedPet.breed = inputBreed.value;
          editedPet.isDewormed = inputDewormed.checked;
          editedPet.isSterilized = inputSterilized.checked;
          editedPet.isVaccinated = inputVaccinated.checked;
          editedPet.date =
            date.getDate() +
            "/" +
            (Number(date.getMonth()) + Number(1)) +
            "/" +
            date.getFullYear();
          edit.validate(editedPet);
          if (isValidate) {
            // lưu vào storage và cập nhật thay đổi
            if (confirm("Are you sure")) {
              for (
                let i = 0;
                i < tBody.querySelectorAll(".idvalue").length;
                i++
              ) {
                if (
                  tBody.querySelectorAll(".idvalue")[i].textContent ===
                  editedPet.id
                ) {
                  tBody.querySelectorAll(".idvalue")[i].parentElement.remove();
                  edit.gender(editedPet);
                  for (const [key, value] of Object.entries(localStorage)) {
                    if (
                      key.slice(0, 2) === "id" &&
                      JSON.parse(value).id === editedPet.id
                    ) {
                      localStorage.setItem(key, JSON.stringify(editedPet));

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
                      editForm.classList.add("hide");

                      edit.getEditElement();
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  },

  start: function () {
    this.gender();
    this.init();
    this.handeler();
  },
};

edit.start();
