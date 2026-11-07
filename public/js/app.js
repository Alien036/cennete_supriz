/**
 * "Biraz da Seni Tanıyalım, Prenses" — Ana Uygulama Mantığı (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  const questions = window.QUESTIONS || [];
  const profiles = window.VIBE_PROFILES || {};

  // Benzersiz oturum kimliği oluşturucu
  function createSessionId() {
    return 'cennet_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
  }

  // Uygulama Durumu (State)
  const state = {
    sessionId: createSessionId(),
    createdAt: new Date().toISOString(),
    currentIndex: 0,
    answers: {}, // { [questionId]: { optionId, emoji, label, vibeTag, reaction, customNote } }
    dominantVibe: 'estetik',
    coffeeInviteStatus: 'pending', // 'pending' | 'opened' | 'accepted' | 'thinking'
    coffeeInviteLabel: 'Henüz yanıtlanmadı ⏳',
    coffeeRespondedAt: null
  };

  // DOM Elemanları
  const screens = {
    welcome: document.getElementById('welcome-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen')
  };

  const headerStatus = document.getElementById('header-status');
  const startBtn = document.getElementById('start-btn');
  const peekBtn = document.getElementById('peek-btn');
  const reassuranceBox = document.getElementById('reassurance-box');

  // Quiz Elemanları
  const quizCard = document.querySelector('#quiz-screen .quiz-card');
  const specialQuestionAura = document.getElementById('special-question-aura');
  const questionStage = document.getElementById('question-stage');
  const questionCategory = document.getElementById('question-category');
  const questionCounter = document.getElementById('question-counter');
  const progressFill = document.getElementById('progress-fill');
  const questionTitle = document.getElementById('question-title');
  const questionSubtitle = document.getElementById('question-subtitle');
  const optionsContainer = document.getElementById('options-container');
  const openEndedContainer = document.getElementById('open-ended-container');
  const openEndedTextarea = document.getElementById('open-ended-textarea');
  const reactionBanner = document.getElementById('reaction-banner');
  const reactionText = document.getElementById('reaction-text');
  const customNoteWrapper = document.getElementById('custom-note-wrapper');
  const customNoteInput = document.getElementById('custom-note-input');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const nextBtnLabel = document.getElementById('next-btn-label');

  // Sonuç Elemanları
  const profileBadge = document.getElementById('profile-badge');
  const profileTitle = document.getElementById('profile-title');
  const profileDescription = document.getElementById('profile-description');
  const profileHighlights = document.getElementById('profile-highlights');
  const profilePlan = document.getElementById('profile-plan');
  const finalGuestNote = document.getElementById('final-guest-note');
  const answersSummaryList = document.getElementById('answers-summary-list');
  const copySummaryBtn = document.getElementById('copy-summary-btn');
  const whatsappShareBtn = document.getElementById('whatsapp-share-btn');
  const restartBtn = document.getElementById('restart-btn');

  // Kahve Daveti Ekranı Elemanları
  const openCoffeeScreenBtn = document.getElementById('open-coffee-screen-btn');
  const coffeeYesBtn = document.getElementById('coffee-yes-btn');
  const coffeeThinkBtn = document.getElementById('coffee-think-btn');
  const coffeeResponseBox = document.getElementById('coffee-response-box');
  const coffeeResponseIcon = document.getElementById('coffee-response-icon');
  const coffeeResponseText = document.getElementById('coffee-response-text');
  const backToResultsBtn = document.getElementById('back-to-results-btn');

  // Toast Bildirimi
  const toastEl = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout = null;

  /**
   * Ekranlar arası yumuşak geçiş
   */
  function switchScreen(targetKey) {
    Object.values(screens).forEach((el) => el.classList.remove('active'));
    screens[targetKey].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Bildirim göster
   */
  function showToast(message) {
    toastMessage.textContent = message;
    toastEl.classList.remove('hidden');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.add('hidden');
    }, 3200);
  }

  /**
   * Mevcut soruyu ekrana çiz
   */
  function renderCurrentQuestion(animate = true) {
    const q = questions[state.currentIndex];
    if (!q) return;

    const total = questions.length;
    const stepNum = state.currentIndex + 1;
    const progressPercent = Math.round((stepNum / total) * 100);

    // Üst bilgileri güncelle
    headerStatus.textContent = `Adım ${stepNum} / ${total}`;
    questionCategory.textContent = `${q.badgeIcon} ${q.category}`;
    questionCounter.textContent = `${stepNum} / ${total}`;
    progressFill.style.width = `${progressPercent}%`;

    const updateDOM = () => {
      questionTitle.textContent = q.question;
      questionSubtitle.textContent = q.subtitle || '';
      const savedAnswer = state.answers[q.id] || {};
      const isOpenEnded = q.type === 'open_ended';

      // Özel soru görsel efektlerini yönet
      if (quizCard) {
        quizCard.classList.toggle('special-question-card', Boolean(q.isSpecialQuestion || isOpenEnded));
      }
      if (specialQuestionAura) {
        specialQuestionAura.classList.toggle('hidden', !(q.isSpecialQuestion || isOpenEnded));
      }

      if (isOpenEnded) {
        // Açık uçlu özel soru görünümü (Hazır seçenek yok, geniş metin alanı aktif)
        optionsContainer.innerHTML = '';
        optionsContainer.classList.add('hidden');
        if (customNoteWrapper) customNoteWrapper.classList.add('hidden');
        if (openEndedContainer) openEndedContainer.classList.remove('hidden');

        if (openEndedTextarea) {
          openEndedTextarea.placeholder = q.placeholder || 'Aklından geçenleri merak ediyorum... 💭';
          openEndedTextarea.value = savedAnswer.openEndedText || '';
        }

        if (savedAnswer.openEndedText && savedAnswer.openEndedText.trim().length > 0) {
          reactionText.textContent = 'Paylaştığın samimi düşünceler için çok teşekkürler, Prenses 🌷✨';
          reactionBanner.classList.remove('hidden');
        } else {
          reactionBanner.classList.add('hidden');
        }

        // Boş bırakmak isterse de geçebilmesi için buton aktif
        prevBtn.style.visibility = state.currentIndex === 0 ? 'hidden' : 'visible';
        nextBtn.disabled = false;
        nextBtnLabel.textContent =
          state.currentIndex === total - 1 ? 'Sonucu Gör ✨' : 'Devam Et';
        return;
      }

      // Çoktan seçmeli soru görünümü
      optionsContainer.classList.remove('hidden');
      if (customNoteWrapper) customNoteWrapper.classList.remove('hidden');
      if (openEndedContainer) openEndedContainer.classList.add('hidden');

      if (q.isCoffeeQuestion && state.coffeeInviteStatus === 'pending') {
        state.coffeeInviteStatus = 'opened';
        state.coffeeInviteLabel = 'Kahve daveti sorusunu görüntülüyor 👀☕';
        syncSessionToFirebase();
      }

      customNoteInput.placeholder =
        q.customNotePlaceholder || 'Eklemek istediğin küçük bir detay varsa buraya yazabilirsin...';
      customNoteInput.value = savedAnswer.customNote || '';

      // Seçenekleri oluştur
      optionsContainer.innerHTML = '';
      q.options.forEach((opt) => {
        const isSelected = savedAnswer.optionId === opt.id;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `option-card${isSelected ? ' selected' : ''}`;
        btn.setAttribute('role', 'radio');
        btn.setAttribute('aria-checked', isSelected ? 'true' : 'false');

        btn.innerHTML = `
          <span class="option-emoji">${opt.emoji}</span>
          <span class="option-content">
            <span class="option-label">${opt.label}</span>
            <span class="option-detail">${opt.detail}</span>
          </span>
          <span class="option-check">✓</span>
        `;

        btn.addEventListener('click', () => handleSelectOption(q, opt));
        optionsContainer.appendChild(btn);
      });

      // Tepki kutusunu güncelle
      if (savedAnswer.optionId && savedAnswer.reaction) {
        reactionText.textContent = savedAnswer.reaction;
        reactionBanner.classList.remove('hidden');
      } else {
        reactionBanner.classList.add('hidden');
      }

      // Navigasyon butonlarını güncelle
      prevBtn.style.visibility = state.currentIndex === 0 ? 'hidden' : 'visible';
      nextBtn.disabled = !savedAnswer.optionId;
      nextBtnLabel.textContent =
        state.currentIndex === total - 1 ? 'Sonucu Gör ✨' : 'Devam Et';
    };

    if (animate) {
      questionStage.classList.add('fade-out');
      setTimeout(() => {
        updateDOM();
        questionStage.classList.remove('fade-out');
      }, 180);
    } else {
      updateDOM();
    }
  }

  /**
   * Bir seçenek tıklandığında çalışır
   */
  function handleSelectOption(question, option) {
    const existingNote = customNoteInput.value.trim();

    state.answers[question.id] = {
      questionId: question.id,
      category: question.category,
      questionText: question.question,
      optionId: option.id,
      emoji: option.emoji,
      label: option.label,
      reaction: option.reaction,
      vibeTag: option.vibeTag,
      customNote: existingNote
    };

    // Seçili görünümü güncelle
    const allCards = optionsContainer.querySelectorAll('.option-card');
    question.options.forEach((opt, idx) => {
      const card = allCards[idx];
      if (!card) return;
      const selected = opt.id === option.id;
      card.classList.toggle('selected', selected);
      card.setAttribute('aria-checked', selected ? 'true' : 'false');
    });

    // Tatlı tepki mesajını göster
    reactionText.textContent = option.reaction;
    reactionBanner.classList.remove('hidden');

    // Kahve daveti sorusuysa durumu anında güncelle ve Firebase'e kaydet
    if (question.isCoffeeQuestion && option.coffeeStatus) {
      state.coffeeInviteStatus = option.coffeeStatus;
      state.coffeeInviteLabel =
        option.coffeeStatus === 'accepted'
          ? 'Kabul Etti! ("Olur, neden olmasın! ❤️")'
          : 'Düşünmek İstedi ("Biraz düşünmem lazım 🌸")';
      state.coffeeRespondedAt = new Date().toISOString();
      if (option.coffeeStatus === 'accepted') {
        launchCelebrationSparkles();
      }
      syncSessionToFirebase();
    }

    // İleri butonunu aktif et
    nextBtn.disabled = false;
  }

  /**
   * Mevcut sorudaki özel notu veya açık uçlu cevabı kaydet
   */
  function saveCurrentCustomNote() {
    const q = questions[state.currentIndex];
    if (!q) return;

    if (q.type === 'open_ended') {
      const rawText = openEndedTextarea ? openEndedTextarea.value : '';
      const trimmed = rawText.trim();
      state.answers[q.id] = {
        questionId: q.id,
        type: 'open_ended',
        category: q.category,
        questionText: q.question,
        openEndedText: rawText,
        emoji: '🌷',
        label: trimmed.length > 0 ? trimmed : 'Boş bırakıldı (Atlandı)',
        customNote: ''
      };
      return;
    }

    const note = customNoteInput.value.trim();
    if (state.answers[q.id]) {
      state.answers[q.id].customNote = note;
    }
  }

  /**
   * Baskın karakter/vibe etiketini hesapla
   */
  function calculateDominantVibe() {
    const counts = { estetik: 0, huzur: 0, enerjik: 0, kesifci: 0 };

    Object.values(state.answers).forEach((ans) => {
      if (ans.vibeTag && counts[ans.vibeTag] !== undefined) {
        counts[ans.vibeTag] += 1;
      }
    });

    let topTag = 'estetik';
    let maxScore = -1;
    Object.entries(counts).forEach(([tag, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topTag = tag;
      }
    });

    state.dominantVibe = topTag;
    return profiles[topTag] || profiles.estetik;
  }

  /**
   * Sonuç ekranını oluştur ve sunucuya kaydet
   */
  function showResults() {
    saveCurrentCustomNote();
    const profile = calculateDominantVibe();

    headerStatus.textContent = 'Tamamlandı 👑';
    profileBadge.textContent = profile.badge;
    profileTitle.textContent = profile.title;
    profileDescription.textContent = profile.description;
    profilePlan.textContent = profile.closingGiftNote;

    // Özellik etiketleri
    profileHighlights.innerHTML = '';
    profile.highlights.forEach((trait) => {
      const chip = document.createElement('span');
      chip.className = 'trait-chip';
      chip.textContent = `✦ ${trait}`;
      profileHighlights.appendChild(chip);
    });

    // Cevap özeti listesi
    answersSummaryList.innerHTML = '';
    questions.forEach((q, idx) => {
      const ans = state.answers[q.id];
      if (!ans) return;

      const item = document.createElement('div');
      item.className = 'summary-item';

      const noteHtml = ans.customNote
        ? `<div class="summary-a-note">💬 Cennet'in Notu: "${escapeHtml(ans.customNote)}"</div>`
        : '';

      item.innerHTML = `
        <div class="summary-q-cat">${idx + 1}. ${q.badgeIcon} ${q.category}</div>
        <div class="summary-q-title">${q.question}</div>
        <div class="summary-a-choice">${ans.emoji} ${ans.label}</div>
        ${noteHtml}
      `;
      answersSummaryList.appendChild(item);
    });

    switchScreen('result');
    launchCelebrationSparkles();
    syncSessionToFirebase();
  }

  /**
   * Mevcut oturum sonuçlarını ve kahve teklifi durumunu Firebase'e kaydet
   */
  function syncSessionToFirebase() {
    const profile = profiles[state.dominantVibe] || profiles.estetik;
    const orderedAnswers = questions
      .map((q) => state.answers[q.id])
      .filter(Boolean);

    const payload = {
      sessionId: state.sessionId,
      recipient: 'Cennet',
      createdAt: state.createdAt,
      dominantVibe: state.dominantVibe,
      profileTitle: profile.title,
      profileBadge: profile.badge,
      answers: orderedAnswers,
      finalNote: finalGuestNote ? finalGuestNote.value.trim() : '',
      coffeeInviteStatus: state.coffeeInviteStatus,
      coffeeInviteLabel: state.coffeeInviteLabel,
      coffeeRespondedAt: state.coffeeRespondedAt
    };

    if (window.FirebaseService && typeof window.FirebaseService.saveSessionData === 'function') {
      window.FirebaseService.saveSessionData(payload);
    } else {
      // Modül henüz yükleniyorsa kısa bir gecikmeyle tekrar dene
      setTimeout(() => {
        if (window.FirebaseService && typeof window.FirebaseService.saveSessionData === 'function') {
          window.FirebaseService.saveSessionData(payload);
        }
      }, 600);
    }
  }

  /**
   * HTML karakterlerini güvenli hale getir
   */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /**
   * Paylaşılabilir metin özeti oluştur
   */
  function buildShareableSummaryText() {
    const profile = profiles[state.dominantVibe] || profiles.estetik;
    const lines = [
      `👑 *Biraz da Seni Tanıyalım, Prenses — Cennet'in Cevapları* ✨`,
      `🌸 *Frekans Profili:* ${profile.title} (${profile.badge})`,
      ``
    ];

    questions.forEach((q, idx) => {
      const ans = state.answers[q.id];
      if (!ans) return;
      lines.push(`*${idx + 1}. ${q.category}:* ${ans.emoji} ${ans.label}`);
      if (ans.customNote) {
        lines.push(`   💬 _Not:_ "${ans.customNote}"`);
      }
    });

    const extraNote = finalGuestNote.value.trim();
    if (extraNote) {
      lines.push(``);
      lines.push(`💌 *Cennet'in Son Notu:* "${extraNote}"`);
    }

    return lines.join('\n');
  }

  /**
   * Zarif Altın & Gül Kurusu Parıltı Efekti (Canvas)
   */
  function launchCelebrationSparkles() {
    const canvas = document.getElementById('sparkle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#D67469', '#E8A598', '#C89D66', '#F4D19B', '#F3C4CE'];
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height * 0.5,
      size: Math.random() * 6 + 3,
      speedY: Math.random() * 2.2 + 1.1,
      speedX: (Math.random() - 0.5) * 1.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 3,
      opacity: 1
    }));

    let frame = 0;
    const maxFrames = 210;

    function animate() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        if (frame > maxFrames - 50) {
          p.opacity = Math.max(0, p.opacity - 0.02);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.roundRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.3, 3);
        ctx.fill();
        ctx.restore();
      });

      if (frame < maxFrames) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    requestAnimationFrame(animate);
  }

  // Olay Dinleyicileri (Event Listeners)
  startBtn.addEventListener('click', () => {
    state.currentIndex = 0;
    switchScreen('quiz');
    renderCurrentQuestion(false);
  });

  peekBtn.addEventListener('click', () => {
    reassuranceBox.classList.toggle('hidden');
  });

  customNoteInput.addEventListener('input', () => {
    saveCurrentCustomNote();
  });

  if (openEndedTextarea) {
    openEndedTextarea.addEventListener('input', () => {
      saveCurrentCustomNote();
      if (openEndedTextarea.value.trim().length > 0) {
        reactionText.textContent = 'Paylaştığın samimi düşünceler için çok teşekkürler, Prenses 🌷✨';
        reactionBanner.classList.remove('hidden');
      } else {
        reactionBanner.classList.add('hidden');
      }
    });
  }

  prevBtn.addEventListener('click', () => {
    if (state.currentIndex > 0) {
      saveCurrentCustomNote();
      state.currentIndex -= 1;
      renderCurrentQuestion(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  nextBtn.addEventListener('click', () => {
    const q = questions[state.currentIndex];
    if (!q) return;

    // Çoktan seçmeli sorularda seçim şart, açık uçlu soruda boş bırakıp geçebilir
    if (q.type !== 'open_ended' && !state.answers[q.id]) return;

    saveCurrentCustomNote();

    if (state.currentIndex < questions.length - 1) {
      state.currentIndex += 1;
      renderCurrentQuestion(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showResults();
    }
  });

  // Son not yazıldığında Firebase'i güncelle (debounce ile)
  let noteSyncTimer = null;
  if (finalGuestNote) {
    finalGuestNote.addEventListener('input', () => {
      if (noteSyncTimer) clearTimeout(noteSyncTimer);
      noteSyncTimer = setTimeout(() => {
        syncSessionToFirebase();
      }, 600);
    });
  }

  // Kahve Daveti Ekranını Aç
  if (openCoffeeScreenBtn) {
    openCoffeeScreenBtn.addEventListener('click', () => {
      headerStatus.textContent = 'Özel Davet ☕';
      if (state.coffeeInviteStatus === 'pending') {
        state.coffeeInviteStatus = 'opened';
        state.coffeeInviteLabel = 'Kahve davet ekranını açtı 👀☕';
        syncSessionToFirebase();
      }
      switchScreen('coffee');
    });
  }

  // Kahve Daveti Seçenekleri (Firebase'e anlık kaydedilir)
  if (coffeeYesBtn) {
    coffeeYesBtn.addEventListener('click', () => {
      coffeeYesBtn.classList.add('selected');
      coffeeThinkBtn.classList.remove('selected');
      coffeeResponseIcon.textContent = '☕';
      coffeeResponseText.textContent =
        'Harika! O zaman buluşma planını birlikte yapalım. ☕';
      coffeeResponseBox.classList.remove('hidden');

      state.coffeeInviteStatus = 'accepted';
      state.coffeeInviteLabel = 'Kabul Etti! ("Olur, neden olmasın! ❤️")';
      state.coffeeRespondedAt = new Date().toISOString();
      syncSessionToFirebase();

      launchCelebrationSparkles();
    });
  }

  if (coffeeThinkBtn) {
    coffeeThinkBtn.addEventListener('click', () => {
      coffeeThinkBtn.classList.add('selected');
      coffeeYesBtn.classList.remove('selected');
      coffeeResponseIcon.textContent = '🌷';
      coffeeResponseText.textContent = 'Hiç sorun değil, acelemiz yok. 🌷';
      coffeeResponseBox.classList.remove('hidden');

      state.coffeeInviteStatus = 'declined';
      state.coffeeInviteLabel = 'Düşünmek İstedi ("Biraz düşünmem lazım 🌸")';
      state.coffeeRespondedAt = new Date().toISOString();
      syncSessionToFirebase();
    });
  }

  if (backToResultsBtn) {
    backToResultsBtn.addEventListener('click', () => {
      headerStatus.textContent = 'Tamamlandı 👑';
      switchScreen('result');
    });
  }

  restartBtn.addEventListener('click', () => {
    state.sessionId = createSessionId();
    state.createdAt = new Date().toISOString();
    state.currentIndex = 0;
    state.answers = {};
    state.coffeeInviteStatus = 'pending';
    state.coffeeInviteLabel = 'Henüz yanıtlanmadı ⏳';
    state.coffeeRespondedAt = null;
    finalGuestNote.value = '';
    if (openEndedTextarea) openEndedTextarea.value = '';
    if (coffeeYesBtn) coffeeYesBtn.classList.remove('selected');
    if (coffeeThinkBtn) coffeeThinkBtn.classList.remove('selected');
    if (coffeeResponseBox) coffeeResponseBox.classList.add('hidden');
    headerStatus.textContent = 'Hoş Geldin ✨';
    switchScreen('welcome');
  });
});

