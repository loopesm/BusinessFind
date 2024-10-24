document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const cityInput = document.getElementById('cityInput');
    const segmentInput = document.getElementById('segmentInput');
    const resultsDiv = document.getElementById('results');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
  
    let nextPageToken = null;
    let city = '';
    let segment = '';
  
    // Função para buscar empresas por cidade e segmento
    async function fetchBusinesses(city, segment, pageToken = '') {
      try {
        const response = await fetch(`/api/businesses?city=${city}&segment=${segment}&pageToken=${pageToken}`);
        const data = await response.json();
  
        nextPageToken = data.nextPageToken || null;
        displayResults(data.businesses);
  
        // Controlar botões de paginação
        nextPageBtn.disabled = !nextPageToken;
        prevPageBtn.disabled = pageToken === '';
      } catch (error) {
        console.error('Error fetching businesses:', error);
        resultsDiv.innerHTML = '<p>Error fetching businesses.</p>';
      }
    }
  
    // Função para exibir os resultados
    function displayResults(businesses) {
      if (businesses.length === 0) {
        resultsDiv.innerHTML = '<p>No businesses found.</p>';
        return;
      }
  
      const list = businesses.map(business => `
        <li class="list-group-item">
          <h5>${business.name}</h5>
          <p>Address: ${business.address}</p>
          <p>Phone: ${business.phone}</p>
          <p>Website: <a href="${business.website}" target="_blank">${business.website}</a></p>
        </li>
      `).join('');
  
      resultsDiv.innerHTML = `<ul class="list-group">${list}</ul>`;
    }
  
    // Evento de busca
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      city = cityInput.value;
      segment = segmentInput.value;
      fetchBusinesses(city, segment);
    });
  
    // Evento para página seguinte
    nextPageBtn.addEventListener('click', function () {
      if (nextPageToken) {
        fetchBusinesses(city, segment, nextPageToken);
      }
    });
  
    // Evento para página anterior
    prevPageBtn.addEventListener('click', function () {
      // Implementar lógica de histórico de paginação se necessário
    });
  });
  