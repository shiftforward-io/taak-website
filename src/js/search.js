(function () {
  "use strict"

  const search = (e, allPosts) => {
    const query = e.target.value.trim().toLowerCase();
    const resEl = document.getElementById("searchResults");
    const noResultsEl = document.getElementById("noResultsFound");
    resEl.innerHTML = "";

    if (query === "") {
      resEl.innerHTML = "";
      noResultsEl.style.display = "none";
      return;
    }
  
    let dateReadable;
    const results = allPosts.filter((item) => {
      dateReadable = new Date(item.date).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
      return (
        item.title.toLowerCase().includes(query) ||
        dateReadable.toLowerCase().includes(query)
      );
    });
  
    if (results && results.length > 0) {
      noResultsEl.style.display = "none";
      results.forEach((result) => {
        const html = `
          <li>
            <div class="post-info">
              <a href="${result.id}">${result.title}</a>
              <div class="post-meta">
                <span class="text-dark text-uppercase font-weight-semibold">Post</span> | ${dateReadable}
              </div>
            </div>
          </li>
        `;
        resEl.insertAdjacentHTML("beforeend", html);
      });
    } else {
      noResultsEl.style.display = "block";
    }
  };
  

  fetch("/search-index.json").then((response) =>
    response.json().then((allPosts) => {
      document.getElementById("search-posts").addEventListener("input", (e) => search(e, allPosts))
    })
  )
})()
