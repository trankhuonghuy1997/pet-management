"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputBreed = $("#input-breed");
const inputType = $("#input-type");
const tBody = $("#tbody");
const submit = $("#submit-btn");

const arrBreed = [];
let breeds, htmls;
let isValidate;

const breed = {
  // Haàm khởi tạo
  init: function () {
    // Duyệt các key và value trong local storage có dữ liệu là breed và thêm vào mảng
    const createArrBreed = function () {
      for (const [key, value] of Object.entries(localStorage)) {
        if (key.slice(0, 2) === "br") {
          arrBreed.push(JSON.parse(value));
        }
      }
      // gender các breed có sẵn trong local storage ra màn hình
      for (let i = 0; i < arrBreed.length; i++) {
        const newBreed = arrBreed[i];
        isValidate = true;
        const genderOnLoaD = function () {
          if (isValidate) {
            htmls = `
                  <th scope="row" class="idvalue">${i + 1}</th>
                  <td>${arrBreed[i].breed}</td>
                  <td>${arrBreed[i].type}</td>
                  <td><button type="button" id=${
                    i + 1
                  } class="btn btn-danger">Delete</button>
                    </td>
                  `;
            let newbreed = document.createElement("tr");
            newbreed.innerHTML = htmls;
            tBody.appendChild(newbreed);
          }
        };
        inputBreed.value = "";
        inputType.value = "Select Type";
        genderOnLoaD(newBreed);
      }
    };
    createArrBreed();
  },
  // hàm lấy giá trị breed nhập vào
  getBreedData: function () {
    breeds = {
      breed: inputBreed.value,
      type: inputType.value,
    };
  },
  // Validate breed
  validate: function () {
    isValidate = true;
    if (isValidate && inputBreed.value === "") {
      alert("Please input Breed");
      isValidate = false;
    }
    if (isValidate && inputType.value === "Select Type") {
      alert("Please select Type");
      isValidate = false;
    }
  },
  // hàm gennder breed nhập mới
  gender: function (breeds) {
    if (isValidate) {
      htmls = `
        <th scope="row" class="idvalue">${arrBreed.length + 1}</th>
        <td>${breeds.breed}</td>
        <td>${breeds.type}</td>
        <td><button type="button" id=${
          arrBreed.length + 1
        } class="btn btn-danger">Delete</button>
          </td>   
        `;
      let newbreed = document.createElement("tr");
      newbreed.innerHTML = htmls;
      tBody.appendChild(newbreed);

      inputBreed.value = "";
      inputType.value = "Select Type";
      breed.deleteBreeds();
    }
  },
  // hàm xóa breed
  deleteBreeds: function () {
    const btnDelete = $$(".btn-danger");
    btnDelete.forEach((element) => {
      element.addEventListener("click", function (e) {
        if (confirm("Are you want to delete this breed?")) {
          e.target.parentElement.parentElement.remove();
          console.log(e.target.parentElement.parentElement);
          for (const [key, value] of Object.entries(localStorage)) {
            if (key.slice(0, 2) === "br") {
              const deleteItem =
                e.target.parentElement.parentElement.querySelectorAll("td");
              if (
                JSON.parse(value).breed === deleteItem[0].textContent &&
                JSON.parse(value).type === deleteItem[1].textContent
              ) {
                localStorage.removeItem(key);
              }
            }
          }
        }
      });
    });
  },

  handeler: function () {
    submit.addEventListener("click", function () {
      breed.getBreedData();
      breed.validate();
      breed.deleteBreeds();

      // luu vao storage
      if (isValidate) {
        if (confirm("Are you want to save")) {
          breed.gender(breeds);
          arrBreed.push(breeds);
          saveToStorage(
            `br${breeds.breed + breeds.type}`,
            JSON.stringify(breeds)
          );
        }
      }
    });
  },

  start: function () {
    this.init();
    this.handeler();
    this.deleteBreeds();
  },
};

breed.start();
