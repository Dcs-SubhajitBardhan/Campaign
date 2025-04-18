const data = [
    { id: 1, name: "Launch A", type: "Email", date: "2025-04-01" },
    { id: 2, name: "Promo B", type: "SMS", date: "2025-04-02" },
    { id: 3, name: "Event C", type: "WhatsApp", date: "2025-04-03" },
    { id: 4, name: "Newsletter", type: "Email", date: "2025-04-04" },
    { id: 5, name: "Flash Sale", type: "SMS", date: "2025-04-05" },
    { id: 6, name: "Reminder", type: "WhatsApp", date: "2025-04-06" },
    { id: 7, name: "Survey", type: "Email", date: "2025-04-07" },
    { id: 8, name: "Follow-up", type: "SMS", date: "2025-04-08" },
    { id: 9, name: "Campaign D", type: "Email", date: "2025-04-09" },
    { id: 10, name: "Promo E", type: "SMS", date: "2025-04-10" },
    { id: 11, name: "Event F", type: "WhatsApp", date: "2025-04-11" },
    { id: 12, name: "Launch G", type: "Email", date: "2025-04-12" },
    { id: 13, name: "Offer H", type: "SMS", date: "2025-04-13" },
    { id: 14, name: "Reminder I", type: "WhatsApp", date: "2025-04-14" },
    { id: 15, name: "Survey J", type: "Email", date: "2025-04-15" },
    { id: 16, name: "Promo K", type: "SMS", date: "2025-04-16" },
    { id: 17, name: "Event L", type: "WhatsApp", date: "2025-04-17" },
    { id: 18, name: "Newsletter M", type: "Email", date: "2025-04-18" },
    { id: 19, name: "Flash Sale N", type: "SMS", date: "2025-04-19" },
    { id: 20, name: "Reminder O", type: "WhatsApp", date: "2025-04-20" },
    { id: 21, name: "Survey P", type: "Email", date: "2025-04-21" },
    { id: 22, name: "Follow-up Q", type: "SMS", date: "2025-04-22" },
    { id: 23, name: "Campaign R", type: "WhatsApp", date: "2025-04-23" },
    { id: 24, name: "Offer S", type: "Email", date: "2025-04-24" },
    { id: 25, name: "Event T", type: "SMS", date: "2025-04-25" },
    { id: 26, name: "Promo U", type: "WhatsApp", date: "2025-04-26" },
    { id: 27, name: "Survey V", type: "Email", date: "2025-04-27" },
    { id: 28, name: "Reminder W", type: "SMS", date: "2025-04-28" }

];

let currentPage = 1;
const rowsPerPage = 10;

function filterTable() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const type = document.getElementById("typeFilter").value;
    const date = document.getElementById("dateFilter").value;

    filteredData = data.filter(row => {
        const matchSearch = row.name.toLowerCase().includes(search);
        const matchType = type === "" || row.type === type;
        const matchDate = date === "" || row.date === date;

        return matchSearch && matchType && matchDate;
    });

    currentPage = 1;
    displayTable(filteredData, currentPage);
}

document.addEventListener("DOMContentLoaded", () => {
    filterTable(); // loads table with all data initially
});
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
