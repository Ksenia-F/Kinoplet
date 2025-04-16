document.addEventListener('DOMContentLoaded', () => {
    // 1. FAQ toggle
    const faqContents = document.querySelectorAll('.faq_content');
    faqContents.forEach(content => {
        content.addEventListener('click', () => {
            content.classList.toggle('active');
            faqContents.forEach(otherContent => {
                if (otherContent !== content) {
                    otherContent.classList.remove('active');
                }
            });
        });
    });

    // 2. Слайдер фильмов
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const cards = document.querySelectorAll('.new_card');
    const prevButton = document.querySelector('.slider_film .prev');
    const nextButton = document.querySelector('.slider_film .next');

    if (sliderWrapper && prevButton && nextButton && cards.length > 0) {
        let currentIndex = 0;

        function updateSliderLogic() {
            if (window.innerWidth >= 1190 || (window.innerWidth >= 940 && window.innerWidth < 1190)) {
                prevButton.addEventListener('click', () => {
                    let sliderContainer = document.querySelector('.slider-container');
                    let countOfCardsSee = Math.floor(sliderContainer.offsetWidth / (cards[0].offsetWidth + 40));
                    if (currentIndex > 0) {
                        currentIndex--;
                        sliderWrapper.style.transform = `translateX(-${currentIndex * (cards[0].offsetWidth * 4 + 40 * 4)}px)`;
                    } else {
                        currentIndex = (cards.length - 4 - countOfCardsSee);
                        sliderWrapper.style.transform = `translateX(-${currentIndex * (cards[0].offsetWidth * 4 + 40 * 4)}px)`;
                    }
                });

                nextButton.addEventListener('click', () => {
                    let sliderContainer = document.querySelector('.slider-container');
                    let countOfCardsSee = Math.floor(sliderContainer.offsetWidth / (cards[0].offsetWidth + 40));
                    if (currentIndex < cards.length - 4 - countOfCardsSee) {
                        currentIndex++;
                        sliderWrapper.style.transform = `translateX(-${currentIndex * (cards[0].offsetWidth * 4 + 40 * 4)}px)`;
                    } else {
                        currentIndex = 0;
                        sliderWrapper.style.transform = `translateX(-${currentIndex * (cards[0].offsetWidth * 4 + 40 * 4)}px)`;
                    }
                });
            } else if (window.innerWidth <= 450) {
                prevButton.addEventListener('click', () => {
                    let sliderContainer_2 = document.querySelector('.slider-container');
                    let countOfCardsSee_2 = Math.floor(sliderContainer_2.offsetWidth / (cards[0].offsetWidth + 40));
                    if (currentIndex > 0) {
                        currentIndex--;
                        sliderWrapper.style.transform = `translateX(-${currentIndex * (cards[0].offsetWidth + 40)}px)`;
                    } else {
                        currentIndex = (cards.length - 1 - countOfCardsSee_2);
                        sliderWrapper.style.transform = `translateX(-${currentIndex * (cards[0].offsetWidth + 40)}px)`;
                    }
                });

                nextButton.addEventListener('click', () => {
                    let sliderContainer_2 = document.querySelector('.slider-container');
                    let countOfCardsSee_2 = Math.floor(sliderContainer_2.offsetWidth / (cards[0].offsetWidth + 40));
                    if (currentIndex < cards.length - 1 - countOfCardsSee_2) {
                        currentIndex++;
                        sliderWrapper.style.transform = `translateX(-${currentIndex * (cards[0].offsetWidth + 40)}px)`;
                    } else {
                        currentIndex = 0;
                        sliderWrapper.style.transform = `translateX(-${currentIndex * (cards[0].offsetWidth + 40)}px)`;
                    }
                });
            }
        }

        updateSliderLogic();
    }

    // 3. Поиск и навигация
    const searchToggle = document.getElementById('search_toggle');
    const headerLeftNav = document.querySelector('.header_left nav');

    if (searchToggle && headerLeftNav) {
        searchToggle.addEventListener('change', () => {
            if (searchToggle.checked) {
                headerLeftNav.classList.add('hidden');
            } else {
                headerLeftNav.classList.remove('hidden');
            }
        });
    }

    // 4. Слайдер пальцем фильмы скоро
    const topFilmsRight = document.querySelector('.next_cat');
    if (topFilmsRight) {
        let startX = 0;
        const slideDistance = 270;

        topFilmsRight.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX;
        });

        topFilmsRight.addEventListener('touchend', (e) => {
            if (!startX) return;
            const endX = e.changedTouches[0].pageX;
            const diffX = startX - endX;

            if (diffX > 50) {
                topFilmsRight.scrollBy({
                    left: slideDistance,
                    behavior: 'smooth'
                });
            } else if (diffX < -50) {
                topFilmsRight.scrollBy({
                    left: -slideDistance,
                    behavior: 'smooth'
                });
            }

            startX = 0;
        });
    }

    // 5. Модальное окно отзывы
    const modal = document.getElementById('modal_rev');
    const modalBody = document.querySelector('.modal_body_rev');
    const closeBtn = document.querySelector('.close_rev');

    if (modal && modalBody && closeBtn) {
        document.querySelectorAll('.read_more_rev').forEach(button => {
            button.addEventListener('click', () => {
                const card = button.closest('.card_reviwes');
                const fullText = card.querySelector('.full_text_rev')?.innerHTML || '';
                modalBody.innerHTML = fullText;
                modal.style.display = 'block';
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // 6. Слайдер серии
    const sliderWrapperSeries = document.querySelector('.slider_wrapper');
    const cardsSerii = document.querySelectorAll('.card_slider_ser');
    const prevSeriesButton = document.querySelector('.slider_film .ser_after');
    const nextSeriesButton = document.querySelector('.slider_film .ser_next');

    if (sliderWrapperSeries && prevSeriesButton && nextSeriesButton && cardsSerii.length > 0) {
        let currentIndex = 0;

        function updateSliderLogic() {
            const cardWidth = cardsSerii[0].offsetWidth + 39;
            let cardsPerSlide = 1;

            if (window.innerWidth >= 1200) {
                cardsPerSlide = 4;
            } else if (window.innerWidth >= 940) {
                cardsPerSlide = 3;
            }

            prevSeriesButton.onclick = () => {
                if (currentIndex > 0) {
                    currentIndex = Math.max(currentIndex - cardsPerSlide, 0);
                } else {
                    currentIndex = cardsSerii.length - cardsPerSlide;
                }
                sliderWrapperSeries.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            };

            nextSeriesButton.onclick = () => {
                if (currentIndex < cardsSerii.length - cardsPerSlide) {
                    currentIndex += cardsPerSlide;
                } else {
                    currentIndex = 0;
                }
                sliderWrapperSeries.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            };
        }

        updateSliderLogic();

        window.addEventListener('resize', () => {
            currentIndex = 0;
            sliderWrapperSeries.style.transform = 'translateX(0px)';
            updateSliderLogic();
        });
    }

    // 7. Слайдер отзывы
    const sliderWrapperReviews = document.querySelector('.slider-wrapper-reviews');
    const prevReviewButton = document.querySelector('.prev-review');
    const nextReviewButton = document.querySelector('.next-review');
    const cardsReviews = document.querySelectorAll('.card_reviwes');

    if (sliderWrapperReviews && prevReviewButton && nextReviewButton && cardsReviews.length > 0) {
        let startX = 0;
        let cardsPerSlide = 1;
        let cardWidth = cardsReviews[0]?.offsetWidth + 40 || 0;

        function updateSliderLogic() {
            cardWidth = cardsReviews[0]?.offsetWidth + 40 || 0;

            if (window.innerWidth >= 1200) {
                cardsPerSlide = 3;
            } else if (window.innerWidth >= 950) {
                cardsPerSlide = 2;
            } else {
                cardsPerSlide = 1;
            }

            console.log(`Updated slider logic: cardsPerSlide=${cardsPerSlide}, cardWidth=${cardWidth}`);
        }

        function scrollToStart() {
            sliderWrapperReviews.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }

        function scrollToEnd() {
            const totalWidth = cardsReviews.length * (cardsReviews[0]?.offsetWidth + 40);
            sliderWrapperReviews.scrollTo({
                left: totalWidth,
                behavior: 'smooth'
            });
        }

        prevReviewButton.addEventListener('click', () => {
            updateSliderLogic();
            if (sliderWrapperReviews.scrollLeft === 0) {
                scrollToEnd();
            } else {
                sliderWrapperReviews.scrollBy({
                    left: -cardsPerSlide * cardWidth,
                    behavior: 'smooth'
                });
            }
        });

        nextReviewButton.addEventListener('click', () => {
            updateSliderLogic();
            const maxScroll = sliderWrapperReviews.scrollWidth - sliderWrapperReviews.clientWidth;
            if (sliderWrapperReviews.scrollLeft >= maxScroll - 1) {
                scrollToStart();
            } else {
                sliderWrapperReviews.scrollBy({
                    left: cardsPerSlide * cardWidth,
                    behavior: 'smooth'
                });
            }
        });

        sliderWrapperReviews.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX;
            console.log('Touch start detected:', startX);
        });

        sliderWrapperReviews.addEventListener('touchend', (e) => {
            if (!startX) return;
            updateSliderLogic();
            const endX = e.changedTouches[0].pageX;
            const diffX = startX - endX;
            console.log(`Swipe detected: diffX=${diffX}`);

            if (diffX > 50) {
                const maxScroll = sliderWrapperReviews.scrollWidth - sliderWrapperReviews.clientWidth;
                if (sliderWrapperReviews.scrollLeft >= maxScroll - 1) {
                    scrollToStart();
                } else {
                    sliderWrapperReviews.scrollBy({
                        left: cardsPerSlide * cardWidth,
                        behavior: 'smooth'
                    });
                }
            } else if (diffX < -50) {
                if (sliderWrapperReviews.scrollLeft === 0) {
                    scrollToEnd();
                } else {
                    sliderWrapperReviews.scrollBy({
                        left: -cardsPerSlide * cardWidth,
                        behavior: 'smooth'
                    });
                }
            }

            startX = 0;
        });

        window.addEventListener('resize', () => {
            updateSliderLogic();
        });

        updateSliderLogic();
    }

    // 8. Модальное окно аккаунт подтверждение
    const confirmationModal = document.getElementById('confirmationModal');
    const contactForm = document.getElementById('contactForm');
    const confirmationForm = document.getElementById('confirmationForm');
    const confirmationCodeInput = document.getElementById('confirmationCode');
    const resendCodeBtn = document.getElementById('resendCodeBtn');

    if (confirmationModal && contactForm && confirmationForm && confirmationCodeInput && resendCodeBtn) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            confirmationModal.style.display = 'flex';
        });

        confirmationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!confirmationCodeInput.value.trim()) {
                alert('Пожалуйста, введите код подтверждения!');
                return;
            }
            alert('Код подтвержден! Данные сохранены.');
            confirmationModal.style.display = 'none';
            contactForm.submit();
        });

        resendCodeBtn.addEventListener('click', () => {
            alert('Код отправлен повторно!');
        });

        confirmationModal.addEventListener('click', (event) => {
            if (event.target === confirmationModal) {
                confirmationModal.style.display = 'none';
            }
        });
    }

    // 9. Изменение пароля
    const passwordForm = document.querySelector('.osn_acc_form_2');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (passwordForm && closeModalBtn) {
        passwordForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const password = passwordForm.querySelector('input[name="password"]').value;
            const confirmPassword = passwordForm.querySelector('input[name="password_confirm"]').value;

            if (password !== confirmPassword) {
                alert('Пароли не совпадают.');
                return;
            }

            confirmationModal.style.display = 'flex';
        });

        confirmationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!confirmationCodeInput.value.trim()) {
                alert('Введите код подтверждения.');
                return;
            }
            confirmationModal.style.display = 'none';
            passwordForm.reset();
        });

        closeModalBtn.addEventListener('click', () => {
            confirmationModal.style.display = 'none';
            passwordForm.reset();
        });
    }
});