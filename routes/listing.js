const express = require('express');
const router = express.Router();
const Listing = require("../model/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js")
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


//Index route
//create route
router.route("/")
    .get( wrapAsync(listingController.index))
    .post( isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));

//Search route
router.get('/search',listingController.searchListings);

//Filter route (search by category)
router.get('/filter', async (req, res) => {
    const { category } = req.query; // Get category from query string
    // console.log('Category received:', category); // // Adjust the query to check if the category is part of the array
    const listings = await Listing.find({
        category: { $regex: new RegExp(`^${category}$`, 'i') }
      });
      
    //   console.log('Listings found:', listings); // Log the listings to debug
      res.json(listings);
});

//New Route
router.get("/new",isLoggedIn, listingController.renderNewForm);

//Show Route
//Update route
//Delete Route
router.route("/:id")
    .get( wrapAsync(listingController.showListing))
    .put( isLoggedIn, isOwner,upload.single("listing[image]"), validateListing,wrapAsync(listingController.updateListing))
    .delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;