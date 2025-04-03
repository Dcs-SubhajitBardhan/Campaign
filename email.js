// Show popup and populate fields with current data
function showUpdatePopup(button) {
    const row = button.parentNode.parentNode;
    const name = row.cells[0].innerText;
    const email = row.cells[1].innerText;
    const subject = row.cells[2].innerText;

    document.getElementById('updateName').value = name;
    document.getElementById('updateEmail').value = email;
    document.getElementById('updateSubject').value = subject;

    document.getElementById('updatePopup').style.display = 'block';
}

// Close the popup
function closePopup() {
    document.getElementById('updatePopup').style.display = 'none';
}

// Save updated data (example functionality)
function saveUpdate() {
    alert('Changes have been saved successfully.');
    closePopup();
}

// Function to delete an email
function deleteEmail(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    alert('Email successfully deleted.');
}

// Search functionality
function filterEmails() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('emailTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        let matches = false;

        for (let j = 0; j < cells.length - 1; j++) {
            if (cells[j].innerText.toLowerCase().includes(filter)) {
                matches = true;
                break;
            }
        }

        row.style.display = matches ? '' : 'none';
    }
}
