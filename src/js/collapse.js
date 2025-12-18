export function initCollapsible() {
    const collapseBtn = document.querySelector('.collapse-btn');
    const collapsibleContent = document.querySelector('.collapsible-content');
    
    if (!collapseBtn || !collapsibleContent) return;
    
    collapseBtn.addEventListener('click', function() {
        const isExpanded = collapsibleContent.classList.contains('active');
        
        if (!isExpanded) {
            this.classList.add('active');
            collapsibleContent.classList.add('active');
            this.setAttribute('aria-expanded', 'true');
            collapsibleContent.setAttribute('aria-hidden', 'false');
        } else {
            this.classList.remove('active');
            collapsibleContent.classList.remove('active');
            this.setAttribute('aria-expanded', 'false');
            collapsibleContent.setAttribute('aria-hidden', 'true');
        }
    });
    
    collapseBtn.setAttribute('aria-expanded', 'false');
    collapseBtn.setAttribute('aria-controls', 'collapsible-content');
    collapsibleContent.setAttribute('aria-hidden', 'true');
    collapsibleContent.id = 'collapsible-content';
    
    collapseBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

export default {
    init: initCollapsible
};