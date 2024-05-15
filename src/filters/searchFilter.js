module.exports = function(collection) {
  const allPosts = [];
  collection.forEach((page) => {
    allPosts.push({
      id: page.url,
      title: page.template.frontMatter.data.title,
      date: page.date,
    });
  });
  return allPosts;
};
