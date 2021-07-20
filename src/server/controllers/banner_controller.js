import Banner from "../models/banners";

const BannerController = {
  async getAllBanner(req, res) {
    try {
      const { authData } = res.locals;
      const banners = await Banner.find({});
      if (banners.length > 0) {
        return res.status(200).json({ authData, banners });
      }
      return res.status(400).json({ message: "No banners found" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error while getting banners" });
    }
  },
};

export default BannerController;
