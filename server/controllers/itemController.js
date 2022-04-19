const Item = require('../models/itemModel')
const asyncHandler = require('express-async-handler')

// @description    Create new item
// @route          POST/api/item
// @access         Private
createItem = asyncHandler(async (req, res) => {
    const {
        name
      } = req.body;

      if (!name) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a name',
        })
    }
    
    const item = new Item({
        name
       });

       const createdItem = await item.save();
       res.status(201).json(createdItem);
})

// @description     Update item
// @route           GET/api/items/:id
// @access          Private
updateItem = asyncHandler(async (req, res) => {
    const {
        name
      } = req.body;

      if (!name) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a name',
        })
    }

    const item = await Item.findById(req.params.id);

    if(item){
        item.name = name;

        const updatedItem = await item.save();
        res.status(201).json(updatedItem);
    }
    
    else{
        res.status(404);
        throw new Error("Item update failed");
    }
})

// @description     Delete item
// @route           DELETE/api/items/:id
// @access          Private
deleteItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);

    if (item) {
      await item.remove();
      res.json({ message: "Item removed" });
    } else {
      res.status(404);
      throw new Error("Item not found");
    }
})

// @description    Get item by ID
// @route          GET/api/items/:id
// @access         Private
getItemById = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404);
      throw new Error("Item not found");
    }
})

// @description    Get all items
// @route          GET/api/items
// @access         Private
getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({})

  if(items.length != null){
      res.status(200).json(items)
  } else {
      res.status(404);
      throw new Error("Items not found");

  }
})

module.exports = {
    createItem,
    updateItem,
    deleteItem,
    getItems,
    getItemById,
}