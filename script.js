let debounceTimeout;

function search() {
  const searchTerm = document.getElementById('searchInput').value.trim();
  const resultsContainer = document.getElementById('results');
  const loadingMessage = document.getElementById('loading');
  const errorMessage = document.getElementById('error');

  loadingMessage.style.display = 'block';
  errorMessage.style.display = 'none';
  resultsContainer.innerHTML = '';

  if (!searchTerm) {
    loadingMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    return;
  }

  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(async () => {
    const currentSearchTerm = document.getElementById('searchInput').value.trim();

    const apiUrl = `https://itunes.apple.com/search?term=${currentSearchTerm}&entity=song`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      loadingMessage.style.display = 'none';

      if (data.results.length === 0) {
        errorMessage.style.display = 'block';
        errorMessage.innerText = 'No results found.';
      } else {
        data.results.forEach(result => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `Track Name: ${result.trackName}<br>Artist: ${result.artistName}`;
          resultsContainer.appendChild(listItem);
        });
      }
    } catch (error) {
      loadingMessage.style.display = 'none';
      errorMessage.style.display = 'block';
      errorMessage.innerText = 'Error fetching data. Please try again.';
    }
  }, 300);
}