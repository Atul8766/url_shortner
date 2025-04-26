import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import urlModel from "../models/urlModel.js";
import shortid from "shortid";

export const shortUrlService = async (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return { status: false, error: errors.array() };
  }
  const { originalUrl } = req.body;

  try {
    const existingUrl = await urlModel.findOne({ originalUrl });

    if (existingUrl) {
      return { status: true, url: existingUrl };
    }
    const shortId = shortid.generate();
    const newUrl = await urlModel.create({ shortId, originalUrl });
    return { status: true, url: newUrl };
  } catch (error) {
    return { status: false, error: error.message };
  }
};

export const getShortUrlService = async (req, res) => {
  const { shortId } = req.params;
  try {
    const url = await urlModel.findOneAndUpdate(
      { shortId },
      {
        $push: {
          totalClicks: {
            timestamps: Date.now(),
          },
        },
      }
    );
    if (url) {
      return { status: true, url: url };
    } else {
      return { status: false, error: "Short URL not found" };
    }
  } catch (error) {
    return { status: false, error: error.message };
  }
};
