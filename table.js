const form = document.getElementById("tableForm");
const table = document.getElementById("myData");
const pageSize = 10; // Number of rows per page
let editRow = null; // Global variable to track the row being edited
let currentPage = 1; // Current page

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (editRow) {
    // If editRow is not null, update the row with the edited values
    editRow.cells[0].innerHTML = document.getElementById("userid").value;
    editRow.cells[1].innerHTML = document.getElementById("id").value;
    editRow.cells[2].innerHTML = document.getElementById("title").value;
    editRow.cells[3].innerHTML = document.getElementById("completed").checked ? "yes" : "no";

    // Reset the editRow variable to null
    editRow = null;
  } else {
    // Create a new row if not in edit mode
    const userID = document.getElementById("userid").value;
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const completed = document.getElementById("completed").checked;
    const newRow = table.insertRow();
    const cellUserID = newRow.insertCell(0);
    const cellID = newRow.insertCell(1);
    const cellTitle = newRow.insertCell(2);
    const cellCompleted = newRow.insertCell(3);
    cellUserID.innerHTML = userID;
    cellID.innerHTML = id;
    cellTitle.innerHTML = title;
    cellCompleted.innerHTML = completed ? "yes" : "no";
  }

  form.reset();
});

fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .then((data) => displayTable(data));

function displayTable(data) {
  data.forEach((elem) => {
    let tr = document.createElement("tr");
    let userId = document.createElement("td");
    userId.innerText = elem.userId;

    let id = document.createElement("td");
    id.innerText = elem.id;

    let title = document.createElement("td");
    title.innerText = elem.title;

    let completed = document.createElement("td");
    completed.innerText = elem.completed;

    let deleteButton = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", function () {
      tr.remove();
    });
    deleteButton.appendChild(deleteBtn);

    let editButton = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", function () {
      editRow = tr; // Set the editRow to the current row
      document.getElementById("userid").value = tr.cells[0].innerHTML;
      document.getElementById("id").value = tr.cells[1].innerHTML;
      document.getElementById("title").value = tr.cells[2].innerHTML;
      document.getElementById("completed").checked = tr.cells[3].innerHTML === "yes";
    });
    editButton.appendChild(editBtn);

    tr.append(userId, id, title, completed, deleteButton, editButton);
    table.querySelector("tbody").append(tr);
  });

  // Initialize pagination
  updatePagination();
}

function updatePagination() {
  const rows = table.querySelector("tbody").rows;
  const pageCount = Math.ceil(rows.length / pageSize);

  // Display only the rows for the current page
  for (let i = 0; i < rows.length; i++) {
    rows[i].style.display = i >= (currentPage - 1) * pageSize && i < currentPage * pageSize ? "" : "none";
  }

  // Create pagination buttons (Previous, 1, 2, 3, Next)
  const pagination = document.getElementById("pagination");
  if (pagination) {
    pagination.remove();
  }

  const paginationDiv = document.createElement("div");
  paginationDiv.id = "pagination";

  const prevButton = document.createElement("button");
  prevButton.innerText = "Previous";
  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });

  paginationDiv.appendChild(prevButton);

  const maxPageButtons = 3; // Number of numeric page buttons
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(startPage + maxPageButtons - 1, pageCount);

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.addEventListener("click", function () {
      currentPage = i;
      updatePagination();
    });
    paginationDiv.appendChild(pageButton);
  }

  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.addEventListener("click", function () {
    if (currentPage < pageCount) {
      currentPage++;
      updatePagination();
    }
  });

  paginationDiv.appendChild(nextButton);

  table.parentElement.appendChild(paginationDiv);
}
