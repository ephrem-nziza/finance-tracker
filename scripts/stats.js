function pad(number){
    if (number < 10){
        return "0" + nummber;
    }
    return String(number);
}

function dateText(daysAgo){
    let day = new Date();
    day.setDate(day.getDate() - daysAgo);
    return day.getFullYear() + "-" + pad(day.getMonth() + 1) + "-" + pad(day.getDate());
}

function lastSevenDays(records){
    let days = [];
    for (let i = 6; i > 0; i --){
        let date = dateText(i);
        let total = 0;
        for (let j = 0; j < records.length; j++){
            if(records[j].date === date){
                total = total + records[j].amount;
            }
        }
        days.push({date: date, total: total});
    }
    return days;
}

function drawTrend(records){
    let chart = document.getElementById("trend-chart");
    chart.innerHTML = "";

    let days = lastSevenDays(records);
    let biggest = 0;
    for (let i = 0; i < days.length; i++){
        if (days[i].total > biggest){
            biggest = days[i].total; 
        }
    }

    for (let i = 0; i < days.length; i++){
        let row = document.createElement("div");
        row.className = "trend-row";

        let label = document.createElement("span");
        label.textContent = days[i].date.slice(5);

        let track = document.createElement("span");
        track.className = "trend-track";

        let bar = document.createElement("span");
        bar.className = "trend-bar";
        if (biggest > 0){
            bar.style.width = (days[i].total/biggest*100) + "%";
        }else {
            bar.style.width = "0%";
        }
        track.appendChild(bar);

        let value = document.createElement("span");
        value.textContent = days[i].total.toFixed(2);

        row.appendChild(label);
        row.appendChild(track);
        row.appendChild(value);
        chart.appendChild(row);
    }
}

function showCap(total, cap){
    let message = document.getElementById("cap-message");

    if (cap === null){
        message.textContent = "No cap set. You can set one in Settings";
        message.className = "";
        message.setAttribute("role", "status");
        message.setAttribute("aria-live", "polite");
        return;
    }

    let difference = Math.round((cap - total) * 100) / 100;

    if(difference >= 0){
        message.textContent = "You have" + difference.toFixed(2) + "left of your" + cap.toFixed(2) + "cap";
        message.className = "";
        message.setAttribute("role", "status");
        message.setAttribute("aria-live", "polite");        
    }else{
        message.textContent = "You are over your cap by " + Math.abs(difference).toFixed(2) + ".";
        message.className = "cap-over";
        message.setAttribute("role", "alert");
        message.setAttribute("aria-live", "assertive");
    }
}

export function renderStats(records, cap){
    let total = 0;
    let totals = {};

    for (let i= 0; i < records.length; i++){
        total = total + records[i].amount;
        if (totals[records[i].category] === undefined){
            totals[records[i].category] = 0;
        }
        totals[records[i].category] = totals[records[i].category] + records[i].amount;
    }

    let top = "None";
    let topAmount = 0;
    for (let name in totals){
        if(totals[name] > topAmount){
            top = name;
            topAmount = totals[name];
        }
    }

    document.getElementById("stat-count").textContent = records.length;
    document.getElementById("stat-total").textContent = total.toFixed(2);
    document.getElementById("stat-top").textContent = top;

    drawTrend(records);
    showCap(total, cap);
}