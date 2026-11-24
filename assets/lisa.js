const form = document.querySelector('#event-form');
const format = document.querySelector('#format');
const draft = document.querySelector('#draft');
const draftText = document.querySelector('#draft-text');
const telegram = document.querySelector('#telegram');
const dateFormatter = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long', timeZone: 'UTC' });

document.querySelectorAll('[data-format]').forEach((link) => {
  link.addEventListener('click', () => {
    format.value = link.dataset.format;
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const date = data.get('date');
  const notes = data.get('notes').trim();
  const lines = [
    'Анна, здравствуйте! Хочу обсудить мероприятие с ЛИСА Event Group.',
    'Формат: ' + data.get('format'),
    'Дата: ' + (date ? dateFormatter.format(new Date(date + 'T00:00:00Z')) : 'пока не выбрана'),
    'Гостей: ' + data.get('guests'),
  ];
  if (notes) lines.push('Пожелания: ' + notes);

  draftText.value = lines.join('\n');
  const url = new URL('https://t.me/ann_saakyan');
  url.searchParams.set('text', draftText.value);
  telegram.href = url.href;
  draft.showModal();
});
form.querySelector('button[type="submit"]').disabled = false;

const reviewSlides = document.querySelector('.review-slides');
const reviewControls = document.querySelector('.review-controls');
const reviews = [...reviewSlides.querySelectorAll('.review-slide')];
const reviewCount = reviewControls.querySelector('.review-count');
let activeReview = 0;

function showReview(index) {
  activeReview = (index + reviews.length) % reviews.length;
  reviews.forEach((review, i) => { review.hidden = i !== activeReview; });
  reviewCount.textContent = (activeReview + 1) + ' / ' + reviews.length;
}

reviewControls.querySelectorAll('[data-review-step]').forEach((button) => {
  button.addEventListener('click', () => showReview(activeReview + Number(button.dataset.reviewStep)));
});

if (reviews.length > 1) {
  reviewSlides.classList.add('is-ready');
  showReview(0);
  reviewControls.hidden = false;
}
