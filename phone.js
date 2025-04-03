const bulkUploadPopup = document.getElementById('bulkUploadPopup');
const overlay = document.getElementById('overlay');
const uploadSelect = document.querySelector('.upload-select');
const bulkUploadInput = document.getElementById('bulkUploadInput');
const singleUpdatePopup = document.getElementById('singleUpdatePopup');
const singleAddPopup = document.getElementById('singleAddPopup');
const phoneTable = document.getElementById('phoneTable'); // Changed ID

let currentRowToUpdate = null; // To keep track of which row is being edited

function handleUploadSelection(selectElement) {
    const value = selectElement.value;
    if (value === 'bulk') {
        openBulkUploadPopup();
    } else if (value === 'single-update') {
        console.log('Single Update selected from dropdown. Consider row selection.');
        alert('Please click the "Update" button next to the phone you want to edit.');
    } else if (value === 'single-add') {
        openSingleAddPopup(); // Call a new function to open the add form
    }
    selectElement.value = ''; // Reset the dropdown after selection
}

function openBulkUploadPopup() {
    bulkUploadPopup.style.display = 'block';
    overlay.style.display = 'block';
}

function closeBulkUploadPopup() {
    bulkUploadPopup.style.display = 'none';
    overlay.style.display = 'none';
    bulkUploadInput.value = '';
}

function handleBulkFileUpload() {
    const file = bulkUploadInput.files[0];
    if (file) {
        console.log('Selected CSV file:', file);
        alert('CSV file selected. Implement bulk processing.');
        closeBulkUploadPopup();
        // Implement your CSV file reading and processing logic here
    } else {
        alert('Please select a CSV file.');
    }
}

function openSingleUpdatePopup(updateButton) {
    currentRowToUpdate = updateButton.parentNode.parentNode; // Get the table row
    const cells = currentRowToUpdate.querySelectorAll('td');
    const name = cells[0].textContent;
    const phone = cells[1].textContent;
    const subject = cells[2].textContent;

    document.getElementById('singleUpdateName').value = name;
    document.getElementById('singleUpdatePhone').value = phone;
    document.getElementById('singleUpdateSubject').value = subject;

    singleUpdatePopup.style.display = 'block';
    overlay.style.display = 'block';
}

function closeSingleUpdatePopup() {
    singleUpdatePopup.style.display = 'none';
    overlay.style.display = 'none';
    currentRowToUpdate = null; // Reset the tracked row
}

function saveSingleUpdate() {
    if (currentRowToUpdate) {
        const name = document.getElementById('singleUpdateName').value;
        const phone = document.getElementById('singleUpdatePhone').value;
        const subject = document.getElementById('singleUpdateSubject').value;

        const cellsToUpdate = currentRowToUpdate.querySelectorAll('td');
        cellsToUpdate[0].textContent = name;
        cellsToUpdate[1].textContent = phone;
        cellsToUpdate[2].textContent = subject;

        closeSingleUpdatePopup();
        alert('Phone details updated!'); // Provide user feedback
    }
}

function openSingleAddPopup() {
    // Clear any previous values in the form
    document.getElementById('addName').value = '';
    document.getElementById('addPhone').value = '';
    document.getElementById('addSubject').value = '';

    singleAddPopup.style.display = 'block';
    overlay.style.display = 'block';
}

function closeSingleAddPopup() {
    singleAddPopup.style.display = 'none';
    overlay.style.display = 'none';
}

function saveNewPhone() {
    const name = document.getElementById('addName').value;
    const phone = document.getElementById('addPhone').value;
    const subject = document.getElementById('addSubject').value;
    const phoneTableBody = phoneTable.querySelector('tbody'); // Use the correct table ID

    // Create a new table row
    const newRow = phoneTableBody.insertRow();

    // Insert cells for Name, Phone, Subject, and Actions
    const nameCell = newRow.insertCell();
    const phoneCell = newRow.insertCell();
    const subjectCell = newRow.insertCell();
    const actionsCell = newRow.insertCell();

    nameCell.textContent = name;
    phoneCell.textContent = phone;
    subjectCell.textContent = subject;

    // Create the "Update" and "Delete" buttons for the new row
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.classList.add('update-btn');
    updateButton.onclick = function() { openSingleUpdatePopup(this); };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.onclick = function() { deletePhone(this); }; // Assuming you have a deletePhone function

    actionsCell.appendChild(updateButton);
    actionsCell.appendChild(document.createTextNode(' ')); // Add a space between buttons
    actionsCell.appendChild(deleteButton);

    closeSingleAddPopup();
    alert('New phone added!'); // Provide user feedback
}

overlay.addEventListener('click', () => {
    closeBulkUploadPopup();
    closeSingleUpdatePopup();
    closeSingleAddPopup();
});

// Placeholder for deletePhone function
function deletePhone(deleteButton) {
    const rowToDelete = deleteButton.parentNode.parentNode;
    rowToDelete.remove();
    alert('Phone deleted!');
}

// Placeholder for filterPhones function
function filterPhones() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("phoneTable");
    const tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
        let tdName = tr[i].getElementsByTagName("td")[0];
        let tdPhone = tr[i].getElementsByTagName("td")[1];
        let tdSubject = tr[i].getElementsByTagName("td")[2];
        if (tdName || tdPhone || tdSubject) {
            let textName = tdName ? tdName.textContent || tdName.innerText : "";
            let textPhone = tdPhone ? tdPhone.textContent || tdPhone.innerText : "";
            let textSubject = tdSubject ? tdSubject.textContent || tdSubject.innerText : "";
            if (textName.toUpperCase().indexOf(filter) > -1 || textPhone.toUpperCase().indexOf(filter) > -1 || textSubject.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}