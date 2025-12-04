const galleryImages = document.querySelectorAll('.galeria img');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = 0;
        modal.style.left = 0;
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.background = 'rgba(0, 0, 0, 0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.cursor = 'pointer';
        modal.style.zIndex = '100';
        

        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.style.maxWidth = '90%';
        modalImg.style.maxHeight = '90%';
        modalImg.style.borderRadius = '5px';

        modal.appendChild(modalImg);

        modal.addEventListener('click', () => {
            modal.remove();
        });

        document.body.appendChild(modal);
    });
}); 