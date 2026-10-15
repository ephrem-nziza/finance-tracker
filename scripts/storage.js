const KEY = "finance:data";
const CAP_KEY = "finance:cap"

export function loadRecords(){
    let saved = localStorage.getItem(KEY);
    if(saved === null){
        return[];
    }
    try{
        returnJSON.parse(saved);
    } catch(error){
        return[];
    }
}

export function saveRecords(records){
    localStorage.setItem(KEY, JSON.stringify(records));
}

export function loadCap(){
    let saved = localStorage.getItem(CAP_KEY);
    if(saved === null){
        return null;
    }
    let number = Number(saved);
    if(isNaN(number)){
        return null;
    }
    return number;
}

export function save Cap(cap){
    if(cap === null){
        localStorage.removeItem(CAP_KEY);
    }
    else{
        localStorage.setItem(CAP_KEY, String(cap));
    }
}

const SETTINGS_KEY = "finance:settings";

export function loadSettings(){
    let defaults = { base: "USD", cur2: "EUR", rate2: 0.92, cur3: "RWF", rate3: 1300 };
    let saved = localStorage.getItem(SETTINGS_KEY);
    if(saved === null){
        return defaults;
    }
    try{
        let settings = JSON.parse(saved);
        if(settings.base && settings.cur2 && settings.cur3 && typeof settings.rate2 === "number"){
            return settings;
        }
        return defaults;
    }catch(error){
        return defaults;
    }
}

export function saveSettings(settings){
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}