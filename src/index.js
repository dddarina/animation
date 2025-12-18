import './css/collapse.css';
import './css/feedback.css';
import './css/liker.css';
import { initCollapsible } from './js/collapse.js';
import FeedbackWidget from './js/feedback-widget.js';
import Liker from './js/liker.js';

document.addEventListener('DOMContentLoaded', () => {
    initCollapsible();
  
    const container = document.getElementById('feedback-widget');
    if (container) {
        new FeedbackWidget(container);
    }

    const containerLiker = document.querySelector('.liker-container');
    if (containerLiker) {
        new Liker(containerLiker);
    }
});
