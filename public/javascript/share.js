const shareButton = document.getElementById('share');
const urlHolder = document.getElementById('urlholder');
const flashDiv = document.getElementById('flashmessagediv');

shareButton.addEventListener('click', (event) => {
    const url = urlHolder.innerHTML;
    
    navigator.clipboard.writeText(url)
        .then(() => {
            const flashMessage = document.createElement('p');
            flashMessage.textContent = 'URL copied to clipboard!';
            flashMessage.classList.add('flash-message');
            flashDiv.appendChild(flashMessage);
            setTimeout(() => {
                flashMessage.remove();
            }, 3000);
        })
        .catch((error) => {
            flashMessage.textContent = 'Error copying URL to clipboard!';
            flashMessage.classList.add('flash-message');
            flashDiv.appendChild(flashMessage);
            setTimeout(() => {
                flashMessage.remove();
            }, 3000);
            console.error('Failed to copy URL to clipboard:', error);
        });
});