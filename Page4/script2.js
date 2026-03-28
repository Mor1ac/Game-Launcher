window.onload = function () {
  const slides = document.querySelectorAll(".main-item");
  const thumbs = document.querySelectorAll(".thumb");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const thumbNext = document.querySelector(".thumb-next");
  const thumbPrev = document.querySelector(".thumb-prev");

  let currentIdx = 0;
  const itemsPerPage = 4;

  function updateGallery() {
    const currentPage = Math.floor(currentIdx / itemsPerPage);
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;

    slides.forEach((slide, i) => {
      slide.style.display = i === currentIdx ? "block" : "none";
      const v = slide.querySelector("video") || (slide.tagName === "VIDEO" ? slide : null);
      
      if (v) {
        if (i === currentIdx) {
          v.volume = 0.4; // Громкость 40%
          v.muted = false; 
          v.play().catch(() => {
            v.muted = true;
            v.play();
          });
        } else {
          v.pause();
          v.currentTime = 0;
        }
      }

      if (thumbs[i]) {
        thumbs[i].classList.toggle("activeMedia", i === currentIdx);
        thumbs[i].style.display = (i >= start && i < end) ? "block" : "none";
      }
    });
  }

  function togglePlay(video) {
    if (!video) return;
    if (video.paused) {
      video.volume = 0.4;
      video.muted = false; 
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }

  slides.forEach((slide) => {
    const v = slide.querySelector("video") || (slide.tagName === "VIDEO" ? slide : null);
    if (v) {
      v.controls = true; 
      v.style.cursor = "pointer";
      
      v.addEventListener('click', function(e) {
        const rect = v.getBoundingClientRect();
        const y = e.clientY - rect.top;
        if (y < rect.height - 50) {
          e.preventDefault();
          togglePlay(v);
        }
      });
    }
  });

  document.addEventListener("keydown", (e) => {
    // Управление клавишами
    if (e.code === "Space") {
      const activeVideo = slides[currentIdx].querySelector("video") || 
                         (slides[currentIdx].tagName === "VIDEO" ? slides[currentIdx] : null);
      if (activeVideo) {
        e.preventDefault();
        togglePlay(activeVideo);
      }
    }
    
    // Вперед: Стрелка вправо или клавиша D
    if (e.code === "ArrowRight" || e.code === "KeyD") {
      nextBtn.click();
    }
    
    // Назад: Стрелка влево или клавиша A
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
      prevBtn.click();
    }
  });

  nextBtn.onclick = () => {
    currentIdx = (currentIdx + 1) % slides.length;
    updateGallery();
  };

  prevBtn.onclick = () => {
    currentIdx = (currentIdx - 1 + slides.length) % slides.length;
    updateGallery();
  };

  if (thumbNext) {
    thumbNext.onclick = () => {
      currentIdx = (currentIdx + 1) % slides.length;
      updateGallery();
    };
  }

  if (thumbPrev) {
    thumbPrev.onclick = () => {
      currentIdx = (currentIdx - 1 + slides.length) % slides.length;
      updateGallery();
    };
  }

  thumbs.forEach((t, i) => {
    t.onclick = () => {
      currentIdx = i;
      updateGallery();
    };
  });

  updateGallery();
};