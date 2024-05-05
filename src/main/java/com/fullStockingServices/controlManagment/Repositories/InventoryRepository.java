package com.fullStockingServices.controlManagment.Repositories;


import com.fullStockingServices.controlManagment.Models.InventoryModel;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface InventoryRepository extends CrudRepository<InventoryModel,Long> {
    public abstract Optional<InventoryModel>findByStorage(String storage);
    public abstract Optional<InventoryModel> findById(long id);
    public abstract Optional<InventoryModel> findByProductName(String name);
    public abstract Optional<InventoryModel> findByProductIdentifier(String identifier);
    Optional<InventoryModel> findByStorageAndProductName(String storage, String productName);
}
