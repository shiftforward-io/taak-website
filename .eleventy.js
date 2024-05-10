const { DateTime } = require("luxon");
module.exports = function (eleventyConfig) {
  // Set custom directories for input, output, includes, and data
  eleventyConfig.addPassthroughCopy("src/assets")
  eleventyConfig.addPassthroughCopy({ "src/admin/config.yml": "./admin/config.yml" })
  // readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy")
  })
  eleventyConfig.addCollection("recentPosts", function(collection) {
    const posts = collection.getFilteredByTag("post");
    return getRecentPosts(posts);
  });
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["md", "html", "liquid", "njk"],
  }
}
function getRecentPosts(posts) {
  const sortedPosts = posts.sort((a, b) => b.date - a.date);
  const recentPosts = sortedPosts.slice(0, 5);
  return recentPosts;
}