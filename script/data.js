"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// variable declaration

const importBtn = $("#import-btn");
const exportBtn = $("#export-btn");
let inputFile = $("#input-file");

let blobItem = [];
let blob;

const data = {
  // hàm xuất file ra
  exportFile: function () {
    // lấy các object cần xuất từ localstorage
    for (const [key, value] of Object.entries(localStorage)) {
      if (key.slice(0, 2) === "id") {
        blobItem.push(JSON.parse(value));
      }
      blob = new Blob([JSON.stringify(blobItem)], {
        type: "text/plain;charset=utf-8",
      });
    }
    saveAs(blob, "static.txt");
  },
  // Hàm import object từ nguoi dung
  importFile: function () {
    let file = inputFile.files[0];

    let reader = new FileReader();
    reader.onload = function () {
      let petToImport = JSON.parse(this.result);
      for (let i = 0; i < petToImport.length; i++) {
        localStorage.setItem(
          `id${petToImport[i].id}`,
          JSON.stringify(petToImport[i])
        );
      }
    };
    reader.readAsText(file);
  },

  handeler: function () {
    exportBtn.addEventListener("click", function () {
      data.exportFile();
    });

    importBtn.addEventListener("click", function () {
      if (inputFile.value === "") {
        alert("Please choose file to import");
      } else {
        data.importFile();
        inputFile.value = "";
        alert("Your data has been successfully imported ");
      }
    });
  },

  start: function () {
    this.handeler();
  },
};

data.start();
