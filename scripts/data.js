import { getRecords, replaceRecords } from "./state.js";
import { checkImport } from "validator.js";

export function setupImportExport(showRecords){
    let exportButton = document.getElementById("export-btn");
    let importFile =document.getElementById("import-file");
    let message = document.getElementById("settings-message");

    exportButton.addEventListener("click", function(){
    let text =JSON.stringify(getRecords(), null, 2);
    let blob = new Blob([text], { type: "application/json"});
    let url = URL.createObjectURL(blob);

    let link = document.createElement("a");
    link:href = url;
    link.download = "finance-records.json";
    link.click();

    URL.revokeObjectURL(url);
    message.textContent = "Exported" + getRecords().length + "records";
    });

    importFile.addEventListener("change", function(){
        let file = importFile.files[0];
        if(!file){
            return;
        }

        let reader = new FileReader();

        reader.onload = function(){
            let data;

            try{
                data = JSON.parse(reader.result);
            }catch (error){
                message.textContent = "Import stopped: that file is not a valid JSON.";
                importFile.value = "";
                return;
            }

            let problem = checkImport(data);
            if (problem !== ""){
                message.textContent = "Import stopped" + problem;
                importFile.value = "";
                return;
            }

            replaceRecords(data);
            showRecords();
            message.textContent = "Imported" + data.length + "records.";
            importFile.value ="";
        };
        
        reader.readAsText(file);
    });
}