import mongoose from "mongoose";

const BannerSchema = mongoose.Schema({
  bannerImageUrl: String,
  bannerImageAlt: String,
  isActive: Boolean,
  order: Number,
});

const Banner = mongoose.model("Banner", BannerSchema);

export default Banner;
