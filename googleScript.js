// Replace with your published Web App URL
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwSqLmgw8SIJljfwP2HLUboXNvYGeW-uTqnSFith8_rEC7-xyQ020u_aUrcI6RFYRVUFw/exec";

function getDetail() {
  const phoneNumber       = document.getElementById("phoneNumber").value.trim();
  const selectedSheetName = document.getElementById("sheetSelector").value;
  const selectedDate      = document.getElementById("examDate").value; // YYYY-MM-DD

  if (!phoneNumber || !selectedSheetName || !selectedDate) {
    Swal.fire("Error", "Please fill all required fields.", "error");
    return;
  }

  // Show a loading modal (SweetAlert)
  Swal.fire({
    title: 'Please wait...',
    text: 'We are getting your result',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  // Construct the query string
  const url = `${WEB_APP_URL}?action=submitDT&phoneNumber=${encodeURIComponent(phoneNumber)}&selectedSheetName=${encodeURIComponent(selectedSheetName)}&selectedDate=${encodeURIComponent(selectedDate)}`;

  // Fetch the raw HTML from Apps Script
  fetch(url)
    .then(response => response.text())
    .then(htmlString => {
      Swal.close();
      document.getElementById("result").innerHTML = htmlString;
    })
    .catch(err => {
      Swal.close();
      Swal.fire("Error", "Something went wrong: " + err.message, "error");
    });
}

// Print only the result section in an A4 format
function printResult() {
  const printContents   = document.getElementById("result").innerHTML;
  const originalContent = document.body.innerHTML;

  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContent;
}
