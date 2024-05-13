const searchFilter = require("./src/filters/searchFilter");

module.exports = function (eleventyConfig) {

  // Set custom directories for input, output, includes, and data
  eleventyConfig.addPassthroughCopy("src/assets")
  eleventyConfig.addPassthroughCopy("src/js")
  eleventyConfig.addPassthroughCopy({ "src/admin/config.yml": "./admin/config.yml" })
  
  // readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return dateReadable = new Date(dateObj).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
  })
  eleventyConfig.addCollection("recentPosts", function(collection) {
    const posts = collection.getFilteredByTag("post");
    return getRecentPosts(posts);
  });
  
  //search filter
  eleventyConfig.addFilter("search", searchFilter);
  eleventyConfig.addCollection("posts", function(collection) {
    return [...collection.getFilteredByGlob("src/posts/**/*.md")];
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