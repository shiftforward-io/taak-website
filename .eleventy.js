module.exports = function (eleventyConfig) {
  // Set custom directories for input, output, includes, and data
  eleventyConfig.addPassthroughCopy("src/assets")
  eleventyConfig.addPassthroughCopy({ "src/admin/config.yml": "./admin/config.yml" })
  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy")
  })
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["html", "liquid", "njk"],
  }
}
