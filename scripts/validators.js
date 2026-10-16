export function validateDescription(value){
    return /^\S(?:.*\S)?$/.test(value);
}

export function validateAmount(value){
    return /^(0|[1-9]\d*(\.\d+)?)$/.test(value);
}

export function validateDate(value){
    return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value);
}

export function validateCategory(value){
    return /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/.test(value);
}

export function hasDuplicateWords(value){
    return /\b(\w+)\s+\1\b/i.test(value);
}

export function checkImport(data){
    if (!Array.isArray(data)) {
        return "The file must hold a list of records.";
    }

let seen =[];
  for (let i = 0; i < data.length; i++) {
    let r = data[i];
    let name = "record " + (i + 1);

    if (typeof r !== "object" || r === null) {
        return name + " is not a valid record.";
        }
        if (typeof r.id !== "string" || !/^rec_\d{4,}$/.test(r.id)) {
            return name + " has an invalid ID.";
        }
        if (seen.indexOf(r.id) !== -1) {
            return name + " has a duplicate ID.";
        }
        seen.push(r.id);

        if (typeof r.description !== "string" || !validateDescription(r.description)) {
            return name + " has an invalid description.";
        }
        if(typeof r.amount !== "number" || !Number.isFinite(r.amount)) {
            return name + " has an invalid amount.";
        }
        if (typeof r.category !== "string" || !validateCategory(r.category)) {
            return name + " has an invalid category.";
        }
        if (typeof r.date !== "string" || !validateDate(r.date)) {
            return name + " has an invalid date.";
        }
        if(typeof r.createdAt !== "string" || !Number.isFinite(Date.parse(r.createdAt))) {
            return name + " It's missing a timestamp.";
        }
    }
    
    return "";
}

  export function validateCurrencyCode(value) {
    return /^[A-Z]{3}$/.test(value);
  }

  export function validateRate(value) {
    return /^(0|[1-9]\d*(\.\d+)?)$/.test(value);
  }


