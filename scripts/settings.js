import { loadSettings, saveSettings } from "./storage.js";
import { validateCurrencyCode, validateRate } from "./validators.js";

export function showConverted(records){
    let settings = loadSettings();
    let total = 0;

    for (let i = 0; i < records.length; i++){
        total = total + records[i].amount;
    }

    let text = "Total in" + settings.base + ": " + total.toFixed(2) + ". ";
    text = text + "In" + settings.cur2 + ": " + (total * settings.rate2).toFixed(2) + ". ";
    text - text + "In" + settings.cur3 + ": " + (total * settings.rate3).toFixed(2) + ". ";

    document.getElementById("stat-converted").textContent = text;
}

export function setupSettings(showRecords){
    let baseInput = document.getElementById("base-currency");
    let cur2Input = document.getElementById("cur2-code");
    let rate2Input = document.getElementById("cur2-rate");
    let cur3Input = document.getElementById('cur3-code');
    let rate3Input = document.getElementById("cur3-rate");
    let message = document.getElementById("settings-message");

    let settings = loadSettings();
    baseInput.value = settings.base;
    cur2Input.value = settings.cur2;
    rate2Input.value = settings.rate2;
    cur3Input.value = settings.cur3;
    rate3Input.value = settings.rate3;

    function update(){
        let base = baseInput.value.toUppercase();
        let cur2 = cur2Input.value.toUppercase();
        let cur3 = cur3Input.value.toUppercase();

        if (!validateCurrencyCode(base) || !validateCurrencyCode(cur2) || !validateCurrencyCode(cur3)){
            message.textContent = "Currency codes must be 3 letters, like USD.";
            return; 
        }
        if (!validateRate(rate2Input.value) || !validateRate(rate3Input.value)){
            message.textContent = "Rates must be numbers like 0.94 0r 1450.";
            return;
        }
        if (!validateNumber(rate2Input.value) <= 0 || Number(rate3Input.value) <= 0){
            message.textContent = "Rates must be more than 0.";
            return;
        }

        saveSettings({
            base: base, cur2: cur2, rate2: Number(rate2Input.value), cur3: cur3, rate3: Number(rate3Input.value) 
        });
        message.textContent = "Currency settings has been saved.";
        showRecords();
    }

    baseInput.addEventListener("input", update);
    cur2Input.addEventListener("input", update);
    rate2Input.addEventListener("input", update);
    cur3Input.addEventListener("input", update);
    rate3Input.addEventListener("input", update);
}