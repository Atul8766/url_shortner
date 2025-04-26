import { getShortUrlService, shortUrlService } from "../services/urlService.js";

export const createShortUrl = async (req, res) => {
  try {
    const response = await shortUrlService(req);
    if (response?.status) {
      res.status(201).json({ message: "Short URL created", url: response });
    } else {
      res.status(400).json({ errors: response.error });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getShortUrl = async (req, res) => {
  try {
    const response = await getShortUrlService(req);
    if (response?.status) {
      res.redirect(response.url.originalUrl);
    } else {
      res.status(400).json({ errors: response.error });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default { createShortUrl, getShortUrl };
