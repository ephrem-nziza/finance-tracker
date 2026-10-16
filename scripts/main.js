import {addRecord, getRecords, sortRecords, findRecord, updateRecord, deleteRecord} from "./state.js";
import {setupMenu} from "./menu.js";
import {setupSettings, showConverted} from "./settings.js";
import {setupImportExport, setupUmportExport} from "./data.js";
import {renderRecords} from "./ui.js";
import {compileRegex, filterRecords} from "./search.js";
import {renderStats} from "./stats.js";
import {loadCap, saveCap} from "./storage.js";
import {validateDescription, validateAmount, validateDate, validateCategory, hasDuplicateWords} from "./validators.js";

let form = document.getElementById("record-form");
let descriptionInput = document.getElementById("description");
let amountInput = document.getElementById("amount");
let categoryInput =  document.getElementById("category");
let dateInput = document.getElementById("date");

let descriptionError = document.getElementById("description-error");
let amountError = document.getElementById("amount-error");
let categoryError = document.getElementById("category-error");
let dateError = document.getElementById("date-error");
let formMessage = document.getElementById("form-message");
let cancelButton = document.getElementById("cancel-edit");

let sortSelect = document.getElementById("sort-select");
let searchInput = document.getElementById("search-input");
let caseToggle = document.getElementById("case-toggle");
let searchMessage = document.getElementById("search-message");
let tableBody = document.getElementById("records-body");

let caInput = document.getElementById("cap-input");
let settingsMessage = document.getElementById("settings-message");

let editingId = null;
let currentCap = loadCap();

if (currentCap !== null){
    capInput.value = currentCap;
}

function showRecords(){
    let re = compileRegex(searchInput.value, caseToggle.checked);
    let found = filterRecords(getRecords(), re);
    let sorted = sortRecords(found, sortSelect.value);

    renderRecords(sorted, re);
    renderStats(getRecords(), currentCap);
    showConverted(getRecords());

    if (searchInput.value !== ""&& re === null){
        searchMessage.textContent = "That pattern is not valid yet."; 
    }else if(re !== null){
        searchMessage.textContent = sorted.length + "matching record(s).";
    }else{
        searchMessage.textContent = "";
    }
}

functionclearErrors(){
    descriptionError.textContent = "";
    amountError.textContent = "";
    categoryError.textContent = "";
    dateError.textContent = "";
}

sortSelect.addEventListener("change", showRecords);
searchInput.addEventListener("input", showRecords);
caseToggle.addEventListener("change", showRecords);
showRecords();

capInput.addEventListener("input", function(){
    if(capInput.value === ""){
        currentCap = null;
        saveCap(null);
        settingsMessage.textContent = "Cap removed.";
    }else if(validateAmount(capInput.value)){
        currentCap = Number(capInput.value);
        saveCap(currentCap);
        settingsMessage.textContent = "Cap saved.";
    }else {
        settingsMessage.textContent = "The cap must be a number like 500 or 490.50"
        return;
    }
    renderStats(getRecords(), currentCap);
    showConverted(getRecords());
});

tableBody.addEventListener("click", function(event){
    let action  = event.target.getAttribute("data-action");
    let id = event.target.getAttribute("data-action");

    if(action === "edit"){
        let record = findRecord(id);
        descriptionInput.value = record.description;
        amountInput.value = record.amount;
        categoryInput.value = record.category;
        dateInput.value = record.date;
        editingId = id;
        clearErrors();
        formMessage.textContent = "Editing" + record.description + ".Change it and press Save.";
        descriptionInput.focus();
    }

    if(action === "delete"){
        let record = findRecord(id);
        let sure = confirm("Delete" + record.description + "?");
        if (sure){
            deleteRecord(id);
            showRecords();
            formMessage.textContent = "Delete" + record.description + ".";
            searchInput.focus();
        }
    }
});

cancelButton.addEventListener("click", function(){
    form.reset();
    clearErrors();
    editingId = null;
    formMessage.textContent = "Cancelled.";
});

form.addEventListener("submit", function(event){
    event.preventDefault();
    let ok = true;

    if(!validateDescription(descriptionInput.value)){
        descriptionError.textContent = "No spaces at the start or end , and it can't be empty.";
        ok = false;
    }else{
        descriptionError.textContent = "";
    }


    if(!validateAmount(amountInput.value)){
        amountError.textContent = "Use a number like 12 or 12.5";
        ok = false;

    }else{
        amountError.textContent = "";
    }

    if(!validateCategory(categoryInput.value)){
        categoryError.textContent = "Letters, spaces and hyphens only.";
        ok = false;
    }else{
        categoryError.textContent = "";
    }

    if(!validateDate(dateInput.value)){
        dateError.textContent = "Use the format YYYY-MM-DD.";
        ok = false;
    }else{
        dateError.textContent = "";
    }

    if (ok){
        if (editingId === null){
            addRecord(descriptionInput.value, amountInput.value, categotyInput.value, dateInput.value);
            formMessage.textContent = "Saved";
        }else{
            updateRecord(editingId, descriptionInput.value, amountInput.value, categoryInput.value, dateInput);
            editingId = null;
            formMessage.textContent = "Changes Saved.";
        }
        showRecords();
        form.reset();
    }else{
        formMessage.textContent = "Please fix the errors above.";
    }
});

setupImportExport(showRecords);
setupSettings(showRecords);
setupMenu();