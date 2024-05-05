package com.fullStockingServices.controlManagment.Controllers;
import com.fullStockingServices.controlManagment.Models.InventoryModel;
import com.fullStockingServices.controlManagment.Services.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
    @Autowired
    InventoryService inventoryService;

    //get
    @GetMapping()
    public ArrayList<InventoryModel> getAllInventory(){
        return  inventoryService.getAllInventory();
    }

    //post
    @PostMapping()
    public InventoryModel saveInventory(@RequestBody InventoryModel inventoryModel){
        return inventoryService.saveInventory(inventoryModel);
    }
    //edit
    @PutMapping()
    public InventoryModel updateInventory(@RequestBody InventoryModel inventoryModel){
        return inventoryService.saveInventory(inventoryModel);
    }
    //search by code
    @GetMapping(path ="/storage")//localhost:8080/students/{code}
    public Optional<InventoryModel> findByCode(@RequestParam("storage")String storage){
        return inventoryService.findByStorage(storage);
    }
    //search by name
    @GetMapping(path ="/name")//localhost:8080/students/{name}
    public Optional<InventoryModel> findByName(@RequestParam("name")String name){
        return inventoryService.findByProductName(name);
    }
    //search by id
    @GetMapping(path ="/id")//localhost:8080/students/{name}
    public Optional<InventoryModel> findById(@RequestParam("id")long id){
        return inventoryService.findById(id);
    }
    @DeleteMapping(path="/delete")
    public String deleteInventoryById(@RequestParam("id") long id){
        return inventoryService.deleteInventory(id);

    }
}
