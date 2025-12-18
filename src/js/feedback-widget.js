export default class FeedbackWidget {
    constructor(container) {
        this.container = container;
        this.isFormVisible = false;
        this.animationDuration = 100;
        this.init();
    }
    
    init() {
        this.createWidget();
        this.bindEvents();
    }
    
    createWidget() {
        this.widget = document.createElement('div');
        this.widget.className = 'feedback-widget';
        this.widget.innerHTML = `
            <button class="feedback-toggle-btn visible" aria-label="Open feedback form">
                <span class="feedback-btn-text">?</span>
            </button>
            
            <div class="feedback-form hidden">
                <div class="feedback-header">
                    <h3 class="feedback-title">Напишите нам</h3>
                    <button class="feedback-close-btn" aria-label="Close form">
                        ×
                    </button>
                </div>
                
                <div class="feedback-message"></div>
                
                <form id="feedback-form">
                    <div class="feedback-form-group">
                        <textarea 
                            id="feedback-message" 
                            class="feedback-textarea" 
                            placeholder="Ваше сообщение..."
                            required
                        ></textarea>
                    </div>
                    
                    <button type="submit" class="feedback-submit-btn">
                        Отправить
                    </button>
                </form>
            </div>
        `;
        
        this.container.append(this.widget);
        
        this.toggleBtn = this.widget.querySelector('.feedback-toggle-btn');
        this.form = this.widget.querySelector('.feedback-form');
        this.closeBtn = this.widget.querySelector('.feedback-close-btn');
        this.feedbackForm = this.widget.querySelector('#feedback-form');
        this.messageEl = this.widget.querySelector('.feedback-message');
    }
    
    bindEvents() {
        this.toggleBtn.addEventListener('click', () => this.openForm());
        this.closeBtn.addEventListener('click', () => this.closeForm());
        this.feedbackForm.addEventListener('submit', (e) => this.handleSubmit(e));
        
        document.addEventListener('click', (e) => {
            if (this.isFormVisible && 
                !this.form.contains(e.target) && 
                !this.toggleBtn.contains(e.target)) {
                this.closeForm();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isFormVisible) {
                this.closeForm();
            }
        });
    }
    
    openForm() {
        if (this.isFormVisible) return;
        
        this.toggleBtn.classList.remove('visible');
        this.toggleBtn.classList.add('hidden');
        
        setTimeout(() => {
            this.form.classList.remove('hidden');
            this.form.classList.add('visible');
            this.isFormVisible = true;
            this.form.querySelector('#feedback-message').focus();
        }, this.animationDuration);
    }
    
    closeForm() {
        if (!this.isFormVisible) return;
        
        this.form.classList.remove('visible');
        this.form.classList.add('hidden');
        
        setTimeout(() => {
            this.toggleBtn.classList.remove('hidden');
            this.toggleBtn.classList.add('visible');
            this.isFormVisible = false;
            this.feedbackForm.reset();
            this.hideMessage();
        }, this.animationDuration);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const textarea = this.feedbackForm.querySelector('#feedback-message');
        const message = textarea.value.trim();
        
        if (!message) {
            this.showMessage('Пожалуйста, напишите сообщение.', 'error');
            return;
        }
        
        this.showMessage('Спасибо! Ваше сообщение отправлено.', 'success');
        this.feedbackForm.reset();
        
        setTimeout(() => {
            this.closeForm();
        }, 2000);
    }
    
    showMessage(text, type) {
        this.messageEl.textContent = text;
        this.messageEl.className = `feedback-message ${type}`;
        
        if (type === 'success') {
            setTimeout(() => {
                this.hideMessage();
            }, 5000);
        }
    }
    
    hideMessage() {
        this.messageEl.className = 'feedback-message';
        this.messageEl.textContent = '';
    }
}