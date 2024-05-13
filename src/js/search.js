(function (window, document) {
  "use strict"

  const search = (e) => {
    const results = window.searchIndex.search(e.target.value, {
      bool: "OR",
      expand: true,
    })
    const resEl = document.getElementById("searchResults")
    const noResultsEl = document.getElementById("noResultsFound")
    resEl.innerHTML = ""

    if (results && results.length > 0) {
      noResultsEl.style.display = "none"
      results.forEach((r) => {
        const { id, title, date } = r.doc
        const dateReadable = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })
        
        const html = `
          <li>
            <div class="post-info">
              <a href="${id}">${title}</a>
              <div class="post-meta">
                <span class="text-dark text-uppercase font-weight-semibold">Post</span> | ${dateReadable}
              </div>
            </div>
          </li>
        `

        resEl.insertAdjacentHTML("beforeend", html)
      })
    } else {
      const searchInput = document.getElementById("search-posts")
      if (searchInput.value.trim() === "") {
        noResultsEl.style.display = "none"
      } else {
        noResultsEl.style.display = "block"
      }
    }
  }

  fetch("/search-index.json").then((response) =>
    response.json().then((rawIndex) => {
      window.searchIndex = elasticlunr.Index.load(rawIndex)
      document.getElementById("search-posts").addEventListener("input", search)
    })
  )
})(window, document)
