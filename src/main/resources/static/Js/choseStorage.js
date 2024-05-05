const selector = document.getElementById("opcion");
let ids = [];
let productNames = [];
let productQuantities = [];
let productIdentifiers = [];
let storages = [];
var listaSinRepetidos=[];
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
        //populateTable();
        consolelogs();
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

function populateTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = '';
    const storage = document.getElementById("opcion").value;
    ids.forEach((id, i) => { // Utilizamos forEach con el índice
        if(storage == storages[i]) {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${id}</td>
            <td>${productNames[i]}</td>
            <td>${productQuantities[i]}</td>
            <td>${productIdentifiers[i]}</td>
            <td><button type="button" id="${id}" onclick="deleteProductButton(id)" class="btn btn-danger">Delete</button></td>
            <td><button type="button" id="${id}" onclick="editProduct(id)" class="btn btn-warning">Edit</button></td>
        `;
            row.setAttribute("id", id);
            tableBody.appendChild(row);
        }
    });
}
function consolelogs(){
    listaSinRepetidos = copiarSinRepetidos(storages);
    insertSelection();
}
function copiarSinRepetidos(lista) {
    var listaSinRepetidos = [];
    var set = new Set();

    for (var i = 0; i < lista.length; i++) {
        if (!set.has(lista[i])) {
            listaSinRepetidos.push(lista[i]);
            set.add(lista[i]);
        }
    }

    return listaSinRepetidos;
}
const url = "http://localhost:8080/inventory";
fetchAndPopulateTable(url);
function insertSelection(){
    selector.innerHTML = '';
    listaSinRepetidos.forEach(storage => {
        const option = document.createElement("option");
        option.textContent = storage;
        selector.appendChild(option);
    });
}
function showTable(){
    const tableHead = document.getElementById("tablehead");
    tableHead.innerHTML = ''; // Limpiamos cualquier contenido existente en el encabezado de la tabla

    const header = document.createElement("tr");
    header.innerHTML = `
        <th>ID</th>
        <th>Product Name</th>
        <th>Product Quantity</th>
        <th>Product Identifier</th>
        <th colspan="2" class="center">Options</th>
    `;

    tableHead.appendChild(header); // Agregamos el encabezado a la tabla
    populateTable();
}
function clearTable(){
    const tableHead = document.getElementById("tablehead");
    tableHead.innerHTML = '';
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = '';
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
    const storage = document.getElementById("opcion").value;

    let productNameCell = currentRow.children.item(1);
    let productQuantityCell = currentRow.children.item(2);
    let productIdentifierCell = currentRow.children.item(3);

    productNameCell.setAttribute("contenteditable","true");
    productQuantityCell.setAttribute("contenteditable","true");
    productIdentifierCell.setAttribute("contenteditable","true");

    currentRow.children.item(1).focus();

    let editButton = currentRow.children.item(5).children.item(0);
    editButton.setAttribute("class","btn btn-success");
    editButton.innerHTML = "Save";
    editButton.setAttribute("onClick","saveStudent("+id+")");
    let cancelButton = currentRow.children.item(4).children.item(0);
    cancelButton.innerHTML = "Cancel";
    cancelButton.setAttribute("onClick","cancel()");
}
function saveStudent(id){
    let currentRow = document.getElementById(id);

    const storage = document.getElementById("opcion").value;
    let productNameCell = currentRow.children.item(1).innerHTML;
    let productQuantityCell = currentRow.children.item(2).innerHTML;
    let productIdentifierCell = currentRow.children.item(3).innerHTML;

    const editStudent ={
        id: id,
        productName : productNameCell,
        productQuantity : productQuantityCell,
        productIdentifier : productIdentifierCell,
        storage : storage
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
            saveById(id,productNameCell,productQuantityCell,productIdentifierCell);
            populateTable();
        })
        .catch(error=>{
            console.error('Error: ',error);
        })
}
function saveById(id,productNameCell,productQuantityCell,productIdentifierCell){
    let length = ids.length;
    for(let j=0;j<length;j++) {
        if(ids[j] == id){
            productNames[j]=productNameCell;
            productQuantities[j]=productQuantityCell;
            productIdentifiers[j]=productIdentifierCell;
        }
    }
}
function cancel(){
    populateTable();
}
