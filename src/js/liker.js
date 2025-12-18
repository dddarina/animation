export default class Liker {
    constructor(container) {
        this.container = container;
        this.likeBtn = container.querySelector('.like-btn');
        this.heartsContainer = container.querySelector('.hearts-container');
        this.init();
    }
    
    init() {
        this.likeBtn.addEventListener('click', () => this.createHeart());
    }
    
    createHeart() {
        const heartSVG = `
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                      fill="#ff4444"/>
            </svg>
        `;
        
        const heart = document.createElement('div');
        heart.className = 'heart-element';
        
        heart.style.backgroundImage = `url("data:image/svg+xml;utf8,${encodeURIComponent(heartSVG)}")`;
        heart.style.backgroundSize = 'contain';
        heart.style.backgroundRepeat = 'no-repeat';
        heart.style.backgroundPosition = 'center';
        
        const trajectory = Math.floor(Math.random() * 4) + 1;
        
        const btnRect = this.likeBtn.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();
        
        const startX = btnRect.left + btnRect.width / 2 - containerRect.left - 12;
        const startY = btnRect.top + btnRect.height / 2 - containerRect.top - 12;
        
        heart.style.left = `${startX}px`;
        heart.style.top = `${startY}px`;
        heart.style.width = '24px';
        heart.style.height = '24px';
        heart.style.position = 'absolute';
        heart.style.opacity = '0';
        
        this.heartsContainer.append(heart);
        
        void heart.offsetWidth;
        
        heart.style.animation = `trajectory${trajectory} 500ms ease-out forwards`;
        heart.style.opacity = '1';
        
        heart.addEventListener('animationend', (e) => {
            if (e.target === heart && heart.parentNode) {
                heart.remove();
            }
        });
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, 1000);
    }
}