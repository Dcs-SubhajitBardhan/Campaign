function filterEmails() {
    const searchInput = document.getElementById("searchInput");
    const filter = searchInput.value.toUpperCase();
    const table = document.getElementById("emailTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td");
        let txtValue;
        let found = false;
        for (let j = 0; j < td.length - 1; j++) { // Exclude the Actions column
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }
        if (found) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

let currentRow; // To store the row being updated

function showUpdatePopup(button) {
    currentRow = button.parentNode.parentNode; // Get the table row
    const name = currentRow.cells[0].textContent;
    const email = currentRow.cells[1].textContent;
    const subject = currentRow.cells[2].textContent;

    document.getElementById("updateName").value = name;
    document.getElementById("updateEmail").value = email;
    document.getElementById("updateSubject").value = subject;

    document.getElementById("updatePopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("updatePopup").style.display = "none";
}

function saveUpdate() {
    const updatedName = document.getElementById("updateName").value;
    const updatedEmail = document.getElementById("updateEmail").value;
    const updatedSubject = document.getElementById("updateSubject").value;

    currentRow.cells[0].textContent = updatedName;
    currentRow.cells[1].textContent = updatedEmail;
    currentRow.cells[2].textContent = updatedSubject;

    closePopup();
    // In a real application, you would send this updated data to a server.
}

function deleteEmail(button) {
    if (confirm("Are you sure you want to delete this email?")) {
        const row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
        // In a real application, you would send a delete request to a server.
    }
}