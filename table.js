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
  const cellEdit = newRow.insertCell(5);
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
  editButton.addEventListener("click", function () {
    document.getElementById("userid").value = newRow.cells[0].innerHTML;
    document.getElementById("id").value = newRow.cells[1].innerHTML;
    document.getElementById("title").value = newRow.cells[2].innerHTML;
    table.editRow(newRow.rowIndex);
  })
  cellEdit.appendChild(editButton);
});
fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((data) => displayTable(data));

  function displayTable(data) {
    console.log(data);
    data.map((elem) => {
      let tr = document.createElement("tr");
      let userId = document.createElement("td");
      userId.innerText = elem.userId;

      let id = document.createElement("td");
      id.innerText = elem.id;

      let title = document.createElement("td");
      title.innerText = elem.title;

      let completed = document.createElement("td");
      completed.innerText = elem.completed;

      let deleteButton = document.createElement("button");
      deleteButton.innerHTML= "Delete";
     

      let editButton = document.createElement("button");
      editButton.innerHTML= "Edit";

      tr.append(userId,id,title,completed,deleteButton,editButton);
      document.querySelector("tbody").append(tr);
    });
  }


// fetch('https://jsonplaceholder.typicode.com/todos/')
//     .then(response => {
//         if (response.ok) {
//             return response.json()
//         }
//         throw new Error('something went wrong');
//     })
//     .then(data => generateTable(data))
//     .catch(myError);
// function myError(error) {
//     console.log(error);
// }
// function generateTable(data) {
//   for (let i = 0; i < data.length; i++) {
//       console.log(data[i].userid, data[i].id, data[i].title, data[i].completed);
// }}
