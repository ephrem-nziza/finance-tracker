import { loadRecords, saveRecords } from "./storage.js";

let records = loadRecords();

export function getRecords(){
    return records;
}

function makeId(){
    let highest = 0;
    for (let i = 0; i < records.length; i++){
        let number = Number(records[i].id.replace("rec_", ""));
        if(number > highest){
            highest = number;
    }
}
let next = String(highest + 1);
while(next.length < 4){
    next = "0" + next;
    }
    return "rec_" + next;
}

export function addRecord(description, amount, category, date){
    let now = new Date().toISOString();
    let record = {
        id: makeId(),
        description: description,
        amount: Number(amount),
        category: category,
        date: date,
        createdAt: now,
        updatedAt: now
    };
    records.push(record);
    saveRecords(records);
    return record;
}

export function findRecord(id){
    for (let i = 0; i < records.length; i++){
        if(records[i].id === id){
            return records[i];
        }
    }
    return null;
}

export function updateRecord(id. description, amount, category, date){
    let record = findRecord(id);
    if(record === null){
        return;
    }
    record.description = description;
    record.amount = Number(amount);
    record.category = category;
    record.date = date;
    record.updateAt = new Date().toISOString();
    saveRecords(records);
}

export function deleteRecord(id){
    let kept = [];
    for (let i = 0; i < records.length; i++){
        if(records[i].id !== id){
            kept.push(records[i]);
        }
    }
    records = kept;
    saveRecords(records);
}

export function sortRecords(list, how){
    let copy = list.slice();

    if(how === "date-desc"){
        copy.sort(function(a,b){
            if(a.date < b.date) return 1;
            if(a.date > b.date) return -1;
            return 0;
        });
    }else if (how === "date-asc"){
        copy.sort(function(a, b){
            if(a.date < b.date) return -1;
            if(a.date > b.date) return 1;
            return 0;
        });
    }else if (how === "description-asc"){
        copy.sort(function(a, b){
            return a.description.toLowerCase().localeCompare(b.description.toLowerCase());
        });
    }else if (how === "description-desc"){
        copy.sort(function(a, b){
            return b.description.toLowerCase().localeCompare(a.description.toLowerCase());
        });
    }else if(how === "amount-asc"){
        copy.sort(function(a, b){
            return a.amount - b.amount;
        });
    }else if (how === "amount-desc"){
        copy.sort(function(a, b){
            return b.amount - a.amount;
        });
    }
    return copy;
}

export function replaceRecords(list){
    records = list;
    saveRecords(records);
}