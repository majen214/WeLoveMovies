const service = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const mapProperties = require("../utils/map-properties");

async function reviewExists(req, res, next) {
//   console.log(req.params, '--------------------------')
    const review = await service.read(req.params.reviewId);
//   res.json({ data: res.locals.reviews })
  
    if (review) {
      res.locals.review = review;
      return next();
    }
    next({ status: 404, message: `Review cannot be found.` });
  }


async function update(req, res) {
    const updatedReview = {
      ...res.locals.review,
      ...req.body.data,
//       review_id: res.locals.review.review_id,
    };
//   console.log(res.locals.review, '++++++++++++++++')
//   console.log(updatedReview, '++++++++++++++')
    const data = await service.update(updatedReview);

    res.json({ data });
  }
  
  async function destroy(req, res) {
    await service.destroy(res.locals.review.review_id); 
    res.sendStatus(204);
  }


module.exports = {
  reviewExists,
  update: [reviewExists, update],
  delete: [reviewExists, destroy], 
  
}
