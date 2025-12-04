const faqItems = document.querySelectorAll('.faq-item');

function clearHeightTransition(answer) {
    if (answer._heightTransitionHandler) {
        answer.removeEventListener('transitionend', answer._heightTransitionHandler);
        answer._heightTransitionHandler = null;
    }
}

function closeItem(item) {
    const answer = item.querySelector('.faq-answer');
    const question = item.querySelector('.faq-question');

    if (!answer || !question || !item.classList.contains('open')) {
        return;
    }

    clearHeightTransition(answer);

    const startHeight = answer.scrollHeight;
    answer.style.height = `${startHeight}px`;
    answer.getBoundingClientRect();
    item.classList.remove('open');
    question.setAttribute('aria-expanded', 'false');

    requestAnimationFrame(() => {
        answer.style.height = '0px';
        answer.style.opacity = '0';
    });
}

function openItem(item) {
    const answer = item.querySelector('.faq-answer');
    const question = item.querySelector('.faq-question');

    if (!answer || !question) {
        return;
    }

    clearHeightTransition(answer);
    item.classList.add('open');
    question.setAttribute('aria-expanded', 'true');

    answer.style.height = '0px';
    answer.style.opacity = '1';

    const targetHeight = answer.scrollHeight;

    requestAnimationFrame(() => {
        answer.style.height = `${targetHeight}px`;
    });

    const handleHeightTransition = (event) => {
        if (event.propertyName === 'height') {
            answer.style.height = 'auto';
            clearHeightTransition(answer);
        }
    };

    answer._heightTransitionHandler = handleHeightTransition;
    answer.addEventListener('transitionend', handleHeightTransition);
}

function closeOthers(currentItem) {
    faqItems.forEach((item) => {
        if (item !== currentItem) {
            closeItem(item);
        }
    });
}

faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) {
        return;
    }

    question.setAttribute('aria-expanded', 'false');
    answer.style.height = '0px';
    answer.style.opacity = '0';

    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        closeOthers(item);

        if (isOpen) {
            closeItem(item);
        } else {
            openItem(item);
        }
    });
});
