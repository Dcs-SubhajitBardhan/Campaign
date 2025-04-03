const bulkUploadPopup = document.getElementById('bulkUploadPopup');
const overlay = document.getElementById('overlay');
const uploadSelect = document.querySelector('.upload-select');
const bulkUploadInput = document.getElementById('bulkUploadInput');
const singleUpdatePopup = document.getElementById('singleUpdatePopup');
const singleAddPopup = document.getElementById('singleAddPopup');

let currentRowToUpdate = null; // To keep track of which row is being edited

function handleUploadSelection(selectElement) {
    const value = selectElement.value;
    if (value === 'bulk') {
        openBulkUploadPopup();
    } else if (value === 'single-update') {
        console.log('Single Update selected from dropdown. Consider row selection.');
        alert('Please click the "Update" button next to the email you want to edit.');
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
    const email = cells[1].textContent;
    const subject = cells[2].textContent;

    document.getElementById('singleUpdateName').value = name;
    document.getElementById('singleUpdateEmail').value = email;
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
        const email = document.getElementById('singleUpdateEmail').value;
        const subject = document.getElementById('singleUpdateSubject').value;

        const cellsToUpdate = currentRowToUpdate.querySelectorAll('td');
        cellsToUpdate[0].textContent = name;
        cellsToUpdate[1].textContent = email;
        cellsToUpdate[2].textContent = subject;

        closeSingleUpdatePopup();
        alert('Email details updated!'); // Provide user feedback
    }
}

function openSingleAddPopup() {
    // Clear any previous values in the form
    document.getElementById('addName').value = '';
    document.getElementById('addEmail').value = '';
    document.getElementById('addSubject').value = '';

    singleAddPopup.style.display = 'block';
    overlay.style.display = 'block';
}

function closeSingleAddPopup() {
    singleAddPopup.style.display = 'none';
    overlay.style.display = 'none';
}

function saveNewEmail() {
    const name = document.getElementById('addName').value;
    const email = document.getElementById('addEmail').value;
    const subject = document.getElementById('addSubject').value;
    const emailTableBody = document.querySelector('#emailTable tbody');

    // Create a new table row
    const newRow = emailTableBody.insertRow();

    // Insert cells for Name, Email, Subject, and Actions
    const nameCell = newRow.insertCell();
    const emailCell = newRow.insertCell();
    const subjectCell = newRow.insertCell();
    const actionsCell = newRow.insertCell();

    nameCell.textContent = name;
    emailCell.textContent = email;
    subjectCell.textContent = subject;

    // Create the "Update" and "Delete" buttons for the new row
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.classList.add('update-btn');
    updateButton.onclick = function() { openSingleUpdatePopup(this); };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.onclick = function() { deleteEmail(this); }; // Assuming you have a deleteEmail function

    actionsCell.appendChild(updateButton);
    actionsCell.appendChild(document.createTextNode(' ')); // Add a space between buttons
    actionsCell.appendChild(deleteButton);

    closeSingleAddPopup();
    alert('New email added!'); // Provide user feedback
}

overlay.addEventListener('click', () => {
    closeBulkUploadPopup();
    closeSingleUpdatePopup();
    closeSingleAddPopup();
});

// Placeholder for deleteEmail function
function deleteEmail(deleteButton) {
    const rowToDelete = deleteButton.parentNode.parentNode;
    rowToDelete.remove();
    alert('Email deleted!');
}