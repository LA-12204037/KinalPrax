import { Router } from "express";

import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} from "./review-controller.js";

import {
  validateCreateReview,
  validateUpdateReview,
  validateReviewId
} from "../../middlewares/review-validation.js";

const router = Router();

router.get('/', getReviews);

router.get(
  '/:id',
  validateReviewId,
  getReviewById
);

router.post(
  '/',
  validateCreateReview,
  createReview
);

router.put(
  '/:id',
  validateUpdateReview,
  updateReview
);

router.delete(
  '/:id',
  validateReviewId,
  deleteReview
);

export default router;