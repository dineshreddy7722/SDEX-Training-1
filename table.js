const form = document.getElementById("tableForm");
const table = document.getElementById("myData"); 
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const userID = document.getElementById("userid").value;
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const completed = document.getElementById("completed").checked;
    const newRow = table.insertRow();
    const cellUserID = newRow.insertCell(0);
    const cellID = newRow.insertCell(1);
    const cellTitle = newRow.insertCell(2);
    const cellCompleted = newRow.insertCell(3);
    const cellAction = newRow.insertCell(4);
    cellUserID.innerHTML = userID;
    cellID.innerHTML = id;
    cellTitle.innerHTML = title;
    cellCompleted.innerHTML = completed ? "yes" : "no";
    
    form.reset();

    const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", function () {
        table.deleteRow(newRow.rowIndex);
      });
      cellAction.appendChild(deleteButton);

      const editButton = document.createElement("button");
      editButton.innerHTML = "Edit";
      editButton.addEventListener("click",function() {
        document.getElementById("userid").value = newRow.cells[0].innerHTML;
        document.getElementById("id").value = newRow.cells[1].innerHTML;
        document.getElementById("title").value = newRow.cells[2].innerHTML;
      })
      cellAction.appendChild(editButton);
});


