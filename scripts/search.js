export function compileRegex(input, ignoreCase){
    if (input === ""){
        return null;
    }
    let flags = "";
    if (ignoreCase){
        flags = "i";
    }
    try{
        return new RegExp(input, flags);
    }catch (error){
        return null;
    }
}

export function filterRecords(list, re){
    if (re === null){
        return list;
    }
    let result = [];
    for (let i = 0; i < list.length; i++){
        let record = list[i];
        if (re.test(record.description) || re.test(record.category) || re.test(record.date) || re.test(record.amount.toFixed(2))){
            result.push(record);
        }
    }
    return result;
}