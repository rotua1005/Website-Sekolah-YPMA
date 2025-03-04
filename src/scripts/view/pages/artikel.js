const Artikel = {
  async fetchArticles() {
    try {
      const response = await fetch('http://localhost:3000/api/articles');
      if (!response.ok) throw new Error('Network response was not ok');
      const articles = await response.json();
      return articles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  },

  async render() {
    const articles = await this.fetchArticles();

    if (!articles || articles.length === 0) {
      return `
        <div class="no-articles">
          <h2>No Articles Available</h2>
          <p>We couldn't find any articles at the moment. Please check back later or explore our other sections.</p>
          <img src="path/to/placeholder_image.jpg" alt="No articles" />
        </div>
      `;
    }

    const articleHTML = articles.map(article => {
      const text1 = article.paragraf?.[0]?.teks || '';
      const text2 = article.paragraf?.[1]?.teks || '';
      const text3 = article.paragraf?.[2]?.teks || '';
      const text4 = article.paragraf1?.[0]?.teks || '';

      const sejarahJudul = article.sejarah?.judul || 'Sejarah Wayang';
      const sejarahKonten = article.sejarah?.konten || 'Sejarah tentang wayang budaya Indonesia.';

      // Cards section
      const cardsHTML = article.cards?.map(card => {
        return `
          <div class="card">
            <img src="${card.gambar}" alt="${card.judul}">
            <h6>${card.judul}</h6>
            <p>${card.subtitle}</p>
          </div>
        `;
      }).join('') || ''; // Safely handle missing cards

      // Museum section with default values
      const museumJudul = article.museum?.judul || 'Sejarah Museum Wayang';
      const museumKonten = article.museum?.konten || 'Informasi tentang museum wayang yang sangat penting.';
      const museumGambar = article.museum?.gambar || 'path/to/default/image.jpg'; 

      // Alat Musik section with default values
      const alatMusikJudul = article.alatMusik?.judul || 'Alat Musik Pada Wayang';
      const alatMusikKonten = article.alatMusik?.konten || 'Informasi tentang alat musik yang digunakan dalam pertunjukan wayang.';
      const alatMusikGambar = article.alatMusik?.gambar || 'path/to/default/image.jpg'; 
      const alatMusikSubtitle = article.alatMusik?.subtitle || 'Deskripsi alat musik pada wayang.';
 
      return `
        <div class="main-container">
          <img src="./walpaper.png" alt="Wallpaper Image" class="walpaper">
        <div class="container">
            <div class="grid-container">
              <div class="column column1">
                <h2>${article.judul}</h2>
                <p>${text1}</p>
              </div>
              <div class="column column2">
                <p>${text2}</p>
              </div>
              <div class="column column3">
                <p>${text3}</p>
              </div>
              <div class="column column4">
                <h2>${article.judul1}</h2>
                <p>${text4}</p>
              </div>
            </div>
          </div>

          <div class="sejarah">
            <h2 class="tema1">${sejarahJudul}</h2>
            <p class="judul1">${sejarahKonten}</p>
          </div>
          <div class="card-container">
            ${cardsHTML}
          </div>

          <div class="sejarah-museum">
            <h2 class="tema">${museumJudul}</h2>
            <p class="content">${museumKonten}</p>
            <img src="${museumGambar}" alt="Museum Image">
          </div>

          <div class="second-row">
            <div class="column column5">
              <h2>${alatMusikJudul}</h2>
              <p>${alatMusikKonten}</p>
            </div>
            <div class="column column6">
               <img src="./musik.png" alt="Second Image">
            </div>
            <div class="column column7">
              <p>${alatMusikSubtitle}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');  

    return `
      <div class="articles-container">
        ${articleHTML}
      </div>
    `;
  },

  async afterRender() {
   
  },
};

export default Artikel;
