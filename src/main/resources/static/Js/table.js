let ids = [];
let productNames = [];
let productQuantities = [];
let productIdentifiers = [];
let storages = [];
let idsSame = [];
async function fetchAndPopulateTable(url) {
    try {
        const globalResponse = await fetch(url);
        const globalInventory = await globalResponse.json();

        globalInventory.forEach(currentProduct => {
            ids.push(currentProduct.id);
            productNames.push(currentProduct.productName);
            productQuantities.push(currentProduct.productQuantity);
            productIdentifiers.push(currentProduct.productIdentifier);
            storages.push(currentProduct.storage);
        });
        populateTable();
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

function populateTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = '';

    ids.forEach((id, i) => { // Utilizamos forEach con el índice
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${id}</td>
            <td>${productNames[i]}</td>
            <td>${productQuantities[i]}</td>
            <td>${productIdentifiers[i]}</td>
            <td>${storages[i]}</td>
            <td><button type="button" id="${id}" onclick="deleteProductButton(id)" class="btn btn-danger">Delete</button></td>
            <td><button type="button" id="${id}" onclick="editProduct(id)" class="btn btn-warning">Edit</button></td>
        `;
        row.setAttribute("id", id);
        tableBody.appendChild(row);
    });
}

const url = "http://localhost:8080/inventory";
fetchAndPopulateTable(url);
function findStudent(){
    let findingStudentCode = document.getElementById("productIdentifier").value;
    populateTableByIdentifier(findingStudentCode);
    document.getElementById("productIdentifier").value="";
}
function populateTableByIdentifier(id){
    let studentExist = false;
    let length = productIdentifiers.length;
    for(let j=0;j<length;j++) {
        if(productIdentifiers[j]==id) {
            const tableBody = document.getElementById("tableBody");
            tableBody.innerHTML = '';
            const row = document.createElement("tr");
            row.innerHTML = `
                  <td>${id}</td>
                  <td>${productNames[j]}</td>
                  <td>${productQuantities[j]}</td>
                  <td>${productIdentifiers[j]}</td>
                  <td>${storages[j]}</td>
                  <td><button type="button" id="${id}" onclick="deleteProductButton(id)" class="btn btn-danger">Delete</button></td>
                  <td><button type="button" id="${id}" onclick="editProduct(id)" class="btn btn-warning">Edit</button></td>
                `;
            row.setAttribute("id", ids[j]);
            tableBody.appendChild(row);
            studentExist=true;
        }
    }
    if(!studentExist){
        alert("there is no product with that identifier");
    }
}

function deleteProduct(id){
    const deleteUrl = "http://localhost:8080/inventory/delete?id="+id;
    fetch(deleteUrl,{
        method: 'DELETE',
        headers: {
            'content-Type': 'application/json'
        },
    })
        .then(response =>{
            if(!response.ok){
                throw new Error("Network response is not ok");
            }
            return response;
        })
        .then(data=>{
            console.log("item deleted succesfully: "+data)
            deleteById(id);
            i=0;
            populateTable();
        })
        .catch(error=>{
            console.log("there was a problem with the fetch operation: ",error)
        });
}

function deleteById(id){
    let length = ids.length;
    for(let j=0;j<length;j++) {
        if(ids[j] == id){
            ids.splice(j,1);
            productNames.splice(j,1);
            productQuantities.splice(j,1);
            productIdentifiers.splice(j,1);
            storages.splice(j,1);
        }
    }
}
function deleteProductButton(id){
    if(confirm("Are you sure you want to delete the product with id = " + id)){
        deleteProduct(id);
    } else {
        console.log("No changes were made to the product.");
    }
}

function editProduct(id){
    //todo: conocer el id del usuario a editar,cambiar las propiedades de las filas pra poder editar
    //cambiar el txto del boton y color
    let currentRow = document.getElementById(id);

    let productNameCell = currentRow.children.item(1);
    let productQuantityCell = currentRow.children.item(2);
    let productIdentifierCell = currentRow.children.item(3);
    let storageCell = currentRow.children.item(4);

    productNameCell.setAttribute("contenteditable","true");
    productQuantityCell.setAttribute("contenteditable","true");
    productIdentifierCell.setAttribute("contenteditable","true");
    storageCell.setAttribute("contenteditable","true");

    currentRow.children.item(1).focus();

    let editButton = currentRow.children.item(6).children.item(0);
    editButton.setAttribute("class","btn btn-success");
    editButton.innerHTML = "Save";
    editButton.setAttribute("onClick","saveStudent("+id+")");
    let cancelButton = currentRow.children.item(5).children.item(0);
    cancelButton.innerHTML = "Cancel";
    cancelButton.setAttribute("onClick","cancel()");
}
function saveStudent(id){
    let currentRow = document.getElementById(id);

    let productNameCell = currentRow.children.item(1).innerHTML;
    let productQuantityCell = currentRow.children.item(2).innerHTML;
    let productIdentifierCell = currentRow.children.item(3).innerHTML;
    let storageCell = currentRow.children.item(4).innerHTML;

    const editStudent ={
        id: id,
        productName : productNameCell,
        productQuantity : productQuantityCell,
        productIdentifier : productIdentifierCell,
        storage : storageCell
    }
    const editUrl ="http://localhost:8080/inventory";
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(editStudent)
    };
    fetch(editUrl, requestOptions)
        .then(response =>{
            if(!response.ok){
                throw new Error("HTTP error Status: " + response.status);
            }
            console.log(response.json());
        })
        .then(data=>{
            console.log("Success "+data);
            saveById(id,productNameCell,productQuantityCell,productIdentifierCell,storageCell);
            populateTable();
        })
        .catch(error=>{
            console.error('Error: ',error);
        })
}
function saveById(id,productNameCell,productQuantityCell,productIdentifierCell,storageCell){
    let length = ids.length;
    for(let j=0;j<length;j++) {
        if(ids[j] == id){
            productNames[j]=productNameCell;
            productQuantities[j]=productQuantityCell;
            productIdentifiers[j]=productIdentifierCell;
            storages[j]=storageCell;
        }
    }
}
function cancel(){
    populateTable();
}