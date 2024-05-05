function ProductRegister(){
    let productName = document.getElementById('productName').value;
    let productQuantity = document.getElementById('productQuantity').value;
    let productIdentifier = document.getElementById('productIdentifier').value;
    let storage = document.getElementById('storage').value;

    if (!productName.trim() || !productQuantity.trim() || !productIdentifier.trim() || !storage.trim()) {
        alert("Todos los campos son obligatorios");
        return; // Detener la ejecución si algún campo está vacío
    }

    try {
        let parsedQuantity = parseInt(productQuantity);
        if (isNaN(parsedQuantity)) {
            throw new Error("Quantity has to be a number");
        }
        const poductData = {
            productName : productName,
            productQuantity : parsedQuantity,
            productIdentifier : productIdentifier,
            storage : storage
        };

        const apiUrl = "http://localhost:8080/inventory"

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(poductData)
        };

        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error Status: " + response.status);
                }
                // Parsear la respuesta como JSON y retornarla
                return response.json();
            })
            .then(data => {
                // Verificar si el ID de la respuesta es -1
                console.log("Datos de la respuesta:", data); // Agregar esta línea para depuración
                if (data.id === -1) {
                    alert("check the Identifier if it is unique\n a product with that name already exist in thar storage");
                } else {
                    console.log("Respuesta del servidor:", data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        document.getElementById("productName").value="";
        document.getElementById("productQuantity").value="";
        document.getElementById("productIdentifier").value="";
        document.getElementById("storage").value="";

    } catch (error) {
        alert("Error: " + error.message);
    }

}