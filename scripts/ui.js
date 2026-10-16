export function renderRecords(records, re){
    let body = document.getElementById("records-body");
    let emptyMessage = document.getElementById("empty-message");

    body.innerHTML = "";

    if(records.length === 0){
        emptyMessage.hidden = false;
        if (re !== null){
            emptyMessage.textContent = "No records that match your search";
        }else {
            emptyMessage.textContent = "No records yet. Please add your first record below";
        }
        return;
    }

    emptyMessage.hidden = true;

    for (let i = 0; i < records.length; i++){
        let record = records[i];
        let row = document.createElement("tr");

        addCell(row, "Date", record.date, re);
        addCell(row, "Description", record.description, re);
        addCell(row, "Category", record.category, re);
        addCell(row, "Amount", record.amount.toFixed(2), re);
        addActions(row, record);

        body.appendChild(row);
    }
}

function addCell(row, label, text, re){
    let cell = document.createElement("td");
    cell.setAttribute("data-label", label);
    fillCell(cell, text, re);
    row.appendChild(cell);
}

function makeButton(text, action, record){
    let button = document.createElement("button");
    button.type = "button";
    button.textContent = text;
    button.setAttribute("data-action", action);
    button.setAttribute("data-id", record.id);
    button.setAttribute("aria-label", text + " " + record.description);
    return button;
}

function addActions(row, record){
    let cell = document.createElement("td");
    cell.setAttribute("data-label", "Actions");
    cell.appendChild(makeButton("Edit", "edit", record));
    cell.appendChild(makeButton("Delete", "delete", record));
    row.appendChild(cell);
}

function fillCell(cell, text, re){
    if(re === null){
        cell.textContent = text;
        return;
    }

    let safe = text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    let globalRe = new RegExp(re.source, re.flags+ "g");

    cell.innerHTML = safe.replace(globalRe, function(match){
        return "<mark>" + match + "</mark>"
    });
}