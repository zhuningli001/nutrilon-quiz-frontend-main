const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
  reactStrictMode: true,
  images: { domains: ["res.cloudinary.com", "thirdwx.qlogo.cn"] },
});
