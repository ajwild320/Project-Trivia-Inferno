const shareButton = document.getElementById('share');
const urlHolder = document.getElementById('urlholder');
const flashDiv = document.getElementById('flashmessagediv');

shareButton.addEventListener('click', (event) => {
    console.log(event);
    const url = urlHolder.innerHTML;
    console.log(url);
    
    navigator.clipboard.writeText(url)
        .then(() => {
            const flashMessage = document.createElement('span');
            flashMessage.textContent = 'URL copied to clipboard!';
            flashMessage.classList.add('flash-message');
            flashDiv.appendChild(flashMessage);
            setTimeout(() => {
                flashMessage.remove();
            }, 3000);
        })
        .catch((error) => {
            console.error('Failed to copy URL to clipboard:', error);
        });
});