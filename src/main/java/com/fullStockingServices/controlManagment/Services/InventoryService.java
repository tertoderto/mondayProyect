package com.fullStockingServices.controlManagment.Services;


import com.fullStockingServices.controlManagment.Models.InventoryModel;
import com.fullStockingServices.controlManagment.Repositories.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class InventoryService {
    @Autowired
    InventoryRepository inventoryRepository;
    public ArrayList<InventoryModel> getAllInventory(){return (ArrayList<InventoryModel>)inventoryRepository.findAll();};

    public InventoryModel saveInventory(InventoryModel inventoryModel) {
        // Verificar si ya existe un inventario con el mismo identificador de producto
        Optional<InventoryModel> existingInventory = inventoryRepository.findByProductIdentifier(inventoryModel.getProductIdentifier());

        // Verificar si ya existe un inventario con el mismo nombre y almacenamiento
        boolean nameAndStorageSame = inventoryRepository.findByStorageAndProductName(inventoryModel.getStorage(), inventoryModel.getProductName()).isPresent();

        // Si no hay un inventario con el mismo identificador de producto y los nombres y almacenamientos no son iguales, guardar el nuevo inventario
        if (existingInventory.isEmpty() && !nameAndStorageSame) {
            return inventoryRepository.save(inventoryModel);
        } else {
            InventoryModel errorInventory = new InventoryModel();
            errorInventory.setId(-1L);
            return errorInventory;
        }
    }

    public InventoryModel editById(InventoryModel inventoryModel){
        return inventoryRepository.save(inventoryModel);
    }

    public Optional<InventoryModel> findByStorage(String storage){
        return inventoryRepository.findByStorage(storage);
    }

    public Optional<InventoryModel> findById(long id){
        return inventoryRepository.findById(id);
    }

    public Optional<InventoryModel> findByProductName(String productName){return inventoryRepository.findByProductName(productName);}

    public String deleteInventory(long id){
        Optional<InventoryModel> respuesta =inventoryRepository.findById(id);

        if(respuesta.isPresent()){
            inventoryRepository.deleteById(id);
            return"producto eliminado";
        }else{
            return"no se encontro un producto con ese id";
        }
    }
}
