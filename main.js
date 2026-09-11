document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCap = document.getElementById('lightboxCap');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const tiles = Array.from(document.querySelectorAll('.tile'));
  let currentIndex = 0;

  function showTile(index){
    currentIndex = (index + tiles.length) % tiles.length;
    const tile = tiles[currentIndex];
    const sport = tile.dataset.sport || '';
    const cap = tile.dataset.cap || '';
    const img = tile.querySelector('img');
    lightboxImg.innerHTML = '';
    if (img) {
      const clone = img.cloneNode();
      lightboxImg.appendChild(clone);
    } else {
      lightboxImg.textContent = 'Replace with photo';
    }
    lightboxCap.textContent = sport ? (sport + (cap ? ' — ' + cap : '')) : cap;
  }

  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => {
      showTile(index);
      lightbox.classList.add('open');
    });
  });

  function closeLightbox(){ lightbox.classList.remove('open'); }
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showTile(currentIndex - 1); });
  lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showTile(currentIndex + 1); });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showTile(currentIndex - 1);
    if (e.key === 'ArrowRight') showTile(currentIndex + 1);
  });
}
