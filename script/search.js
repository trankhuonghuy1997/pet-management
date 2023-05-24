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

const submitBtn = $("#submit-btn");
const healthyBtn = $("#healthy-btn");
const tBody = $("#tbody");
const findBtn = $("#find-btn");

let searchArr = [];
let infor;
const search = {
  // hàm gender breed vào ô tìm kiếm theo breed
  genderBreed: function () {
    for (const [key, value] of Object.entries(localStorage)) {
      if (key.slice(0, 2) === "br") {
        const htmls = `<option>${JSON.parse(value).breed}</option>`;
        inputBreed.insertAdjacentHTML("beforeend", htmls);
      }
    }
  },
  // Hàm nhận giá trị tìm kiếm nhập vào
  getSearchData: function () {
    infor = {
      id: inputId.value,
      name: inputName.value,
      type: inputType.value,
      breed: inputBreed.value,
      isDewormed: inputDewormed.checked,
      isSterilized: inputSterilized.checked,
      isVaccinated: inputVaccinated.checked,
    };
    return infor;
  },
  // Hàm hiểm tra các giá trị nhập vào và trả về kết quả tìm kiếm
  check: function () {
    search.getSearchData();
    if (
      infor.id === "" &&
      infor.name === "" &&
      infor.type === "Select Type" &&
      infor.breed === "Select Breed" &&
      infor.isVaccinated === false &&
      infor.isDewormed === false &&
      infor.isSterilized === false
    ) {
      for (const [key, value] of Object.entries(localStorage)) {
        if (key.slice(0, 2) === "id") {
          search.gender(JSON.parse(value));
        }
      }
    } else {
      for (const [key, value] of Object.entries(localStorage)) {
        if (key.slice(0, 2) === "id") {
          const searchItem = JSON.parse(value);
          if (
            (infor.id === "" ||
              infor.id === searchItem.id ||
              searchItem.id.toLowerCase().includes(infor.id.toLowerCase())) &&
            (infor.name === "" ||
              infor.name === searchItem.name ||
              searchItem.name
                .toLowerCase()
                .includes(infor.name.toLowerCase())) &&
            (infor.type === "Select Type" || infor.type === searchItem.type) &&
            (infor.breed === "Select Breed" ||
              infor.breed === searchItem.breed) &&
            (infor.isVaccinated === false ||
              infor.isVaccinated === searchItem.isVaccinated) &&
            (infor.isDewormed === false ||
              infor.isDewormed === searchItem.isDewormed) &&
            (infor.isSterilized === false ||
              infor.isSterilized === searchItem.isSterilized)
          ) {
            search.gender(searchItem);
          }
        }
      }
    }
  },
  // Hàm gender pet ra màn hình
  gender: function (infor) {
    let htmls = `
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
          `;
    let newPet = document.createElement("tr");
    newPet.innerHTML = htmls;
    tBody.appendChild(newPet);
  },
  handeler: function () {
    findBtn.addEventListener("click", function () {
      tBody.innerHTML = "";
      search.check();
    });
  },
  start: function () {
    this.handeler();
    this.genderBreed();
  },
};

search.start();
