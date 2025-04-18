const data = [
    { id: 1, name: "Launch A", type: "Email", date: "2025-04-01" },
    { id: 2, name: "Promo B", type: "SMS", date: "2025-04-02" },
    { id: 3, name: "Event C", type: "WhatsApp", date: "2025-04-03" },
    { id: 4, name: "Newsletter", type: "Email", date: "2025-04-04" },
    { id: 5, name: "Flash Sale", type: "SMS", date: "2025-04-05" },
    { id: 6, name: "Reminder", type: "WhatsApp", date: "2025-04-06" },
    { id: 7, name: "Survey", type: "Email", date: "2025-04-07" },
    { id: 8, name: "Follow-up", type: "SMS", date: "2025-04-08" },
];

let currentPage = 1;
const rowsPerPage = 3;

function displayTable(page) {
    const tbody = document.querySelector("#data-table tbody");
    tbody.innerHTML = "";

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = data.slice(start, end);

    paginatedData.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.type}</td>
            <td>${row.date}</td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById("page-info").innerText = `Page ${currentPage} of ${Math.ceil(data.length / rowsPerPage)}`;
}

function nextPage() {
    if (currentPage < Math.ceil(data.length / rowsPerPage)) {
        currentPage++;
        displayTable(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayTable(currentPage);
    }
}

function exportToCSV() {
    let csv = "ID,Campaign Name,Type,Date\n";
    data.forEach(row => {
        csv += `${row.id},${row.name},${row.type},${row.date}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "campaign_data.csv";
    a.click();
}

document.addEventListener("DOMContentLoaded", () => displayTable(currentPage));
