const modal = document.getElementById('mediaModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalContent = modal?.querySelector('.modal-content');

function openVideoModal(title, videoUrl) {
  if (!modal || !modalTitle || !modalBody) return;

  modalContent?.classList.remove('case-study-modal');
  modalTitle.textContent = title;
  modalBody.innerHTML = `
    <div class="video-wrapper">
      <video controls playsinline preload="metadata">
        <source src="${videoUrl}" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  `;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function openCaseStudyModal(title, caseStudyUrl) {
  if (!modal || !modalTitle || !modalBody) return;

  modalTitle.textContent = title;
  modalContent?.classList.add('case-study-modal');
  modalBody.innerHTML = `
    <div class="case-study-frame-wrap">
      <iframe src="${caseStudyUrl}" title="${title}"></iframe>
    </div>
  `;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  if (!modal || !modalBody) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  modalBody.innerHTML = '';
  modalContent?.classList.remove('case-study-modal');
}

function handleOutsideClick(event) {
  if (event.target === modal) {
    closeModal();
  }
}

const navLinks = document.querySelectorAll('.nav-link');
if ('IntersectionObserver' in window) {
  const pageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const pageId = entry.target.id.startsWith('case-study-')
          ? 'projects'
          : entry.target.id;
        navLinks.forEach((link) => {
          const isActive = link.dataset.page === pageId;
          link.classList.toggle('active', isActive);
          if (isActive) {
            link.setAttribute('aria-current', 'page');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    },
    { rootMargin: '-20% 0px -70% 0px' },
  );

  document.querySelectorAll('main.page[id], .contact-section[id]').forEach((page) => {
    pageObserver.observe(page);
  });
}

document.querySelectorAll('[data-video]').forEach((button) => {
  button.addEventListener('click', () => {
    openVideoModal(button.dataset.title, button.dataset.video);
  });
});

document.querySelectorAll('[data-case-study]').forEach((button) => {
  button.addEventListener('click', () => {
    openCaseStudyModal(button.dataset.title, button.dataset.caseStudy);
  });
});

document.querySelector('.modal-close')?.addEventListener('click', closeModal);
modal?.addEventListener('click', handleOutsideClick);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeModal();
  }
});
