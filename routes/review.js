const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../model/review.js");
const Listing = require("../model/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");


const reviewController = require("../controllers/review.js")


//Review
//Post Riview Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));


//Delete Review Route
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync (reviewController.destroyReview));

module.exports = router;