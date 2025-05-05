console.log('js/main.js script loaded');

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded event fired');
  
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.textContent = '🌙'; 
      themeIcon.setAttribute('aria-label', 'Moon');
    } else {
      themeIcon.textContent = '☀️'; 
      themeIcon.setAttribute('aria-label', 'Sun');
    }
  }

  if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
      } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
      }
    });
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  updateThemeIcon(savedTheme);
  document.body.setAttribute('data-theme', savedTheme);

  const langDropdownBtn = document.getElementById('langDropdownBtn');
  const langDropdownItems = document.querySelectorAll('#languageToggle .dropdown-item');

  function setLanguage(lang) {
    if (lang === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
      langDropdownBtn.textContent = 'العربية';
    } else {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
      langDropdownBtn.textContent = 'English';
    }
    localStorage.setItem('language', lang);
  }

  langDropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = item.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  const savedLang = localStorage.getItem('language') || 'ar';
  setLanguage(savedLang);

  const showPasswordCheckbox = document.getElementById('showPassword');
  const passwordInput = document.getElementById('password');
  if (showPasswordCheckbox && passwordInput) {
    showPasswordCheckbox.addEventListener('change', () => {
      passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
    });
  }

  const postsList = document.getElementById('postsList');
  if (postsList) {

    const newQuestionJSON = localStorage.getItem('newQuestion');
    let posts = [];
    if (newQuestionJSON) {
      const newQuestion = JSON.parse(newQuestionJSON);
      posts.push({
        title: newQuestion.title,
        tags: newQuestion.tags,
        excerpt: newQuestion.content,
        link: newQuestion.link
      });

      localStorage.removeItem('newQuestion');
    }

    posts = posts.concat([
      {
        title: 'كيف يمكنني بناء شبكة عصبية من الصفر؟',
        tags: ['الذكاء الاصطناعي', 'تعلم الآلة'],
        excerpt: 'أريد أن أفهم أساسيات بناء شبكة عصبية من الصفر بدون استخدام مكتبات.',
        link: 'question.html?id=1'
      },
      {
        title: 'ما هي أفضل الموارد لتعلم الخوارزميات؟',
        tags: ['الخوارزميات', 'هياكل البيانات'],
        excerpt: 'أبحث عن مصادر موثوقة لتعلم الخوارزميات وهياكل البيانات.',
        link: 'question.html?id=2'
      },
      {
        title: 'كيفية تحسين أداء نموذج التعلم العميق؟',
        tags: ['التعلم العميق', 'تحسين النماذج'],
        excerpt: 'ما هي أفضل الممارسات لتحسين أداء نماذج التعلم العميق؟',
        link: 'question.html?id=3'
      }
    ]);

    function renderPosts(filteredTag) {
      postsList.innerHTML = '';
      let orderedPosts = posts;
      if (filteredTag && filteredTag !== 'all') {
        const matchingPosts = posts.filter(post => post.tags.includes(filteredTag));
        const otherPosts = posts.filter(post => !post.tags.includes(filteredTag));
        orderedPosts = matchingPosts.concat(otherPosts);
      }
      orderedPosts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';

        const titleLink = document.createElement('a');
        titleLink.href = post.link;
        titleLink.textContent = post.title;
        titleLink.className = 'h5 d-block mb-2';

        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'post-tags mb-2';
        post.tags.forEach(tag => {
          const tagSpan = document.createElement('span');
          tagSpan.className = 'badge bg-primary me-1';
          tagSpan.textContent = tag;
          tagsDiv.appendChild(tagSpan);
        });

        const excerptP = document.createElement('p');
        excerptP.textContent = post.excerpt;

        postCard.appendChild(titleLink);
        postCard.appendChild(tagsDiv);
        postCard.appendChild(excerptP);

        postsList.appendChild(postCard);
      });
    }
    renderPosts('all');


    const btnPostQuestion = document.getElementById('btnPostQuestion');
    if (btnPostQuestion) {
      btnPostQuestion.addEventListener('click', () => {
        window.location.href = 'create_question.html';
      });
    }

    const tagFilterButtons = document.querySelectorAll('#tagFilters button');
    tagFilterButtons.forEach(button => {
      button.addEventListener('click', () => {
        tagFilterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const selectedTag = button.getAttribute('data-tag');
        renderPosts(selectedTag);

        const tagContents = document.querySelectorAll('#tagContents > div');
        tagContents.forEach(div => {
          if (selectedTag === 'all') {
            if (div.getAttribute('data-tag-content') === 'all') {
              div.style.display = 'block';
            } else {
              div.style.display = 'none';
            }
          } else {
            if (div.getAttribute('data-tag-content') === selectedTag) {
              div.style.display = 'block';
              div.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              div.style.display = 'none';
            }
          }
        });
      });
    });

  const userReputations = {
    alice: 1200,
    bob: 900
  };

  function updateReputationDisplay(user) {
    const elements = document.querySelectorAll(`.user-reputation[data-user="${user}"]`);
    elements.forEach(el => {
      el.textContent = userReputations[user];
    });
  }

  Object.keys(userReputations).forEach(user => {
    updateReputationDisplay(user);
  });

  const answersList = document.getElementById('answersList');
  if (answersList) {
    answersList.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-outline-success')) {
        const answerItem = e.target.closest('li.list-group-item');
        if (!answerItem) return;
        const userSpan = answerItem.querySelector('.user-reputation');
        if (!userSpan) return;
        const user = userSpan.getAttribute('data-user');
        if (!user) return;
        userReputations[user] = (userReputations[user] || 0) + 10;
        updateReputationDisplay(user);
        e.target.classList.toggle('transparent-bg');
        const downvoteBtn = answerItem.querySelector('.btn-outline-danger');
        if (downvoteBtn && downvoteBtn !== e.target) {
          downvoteBtn.classList.remove('transparent-bg');
        }
      } else if (e.target.classList.contains('btn-outline-danger')) {
        const answerItem = e.target.closest('li.list-group-item');
        if (!answerItem) return;
        const userSpan = answerItem.querySelector('.user-reputation');
        if (!userSpan) return;
        const user = userSpan.getAttribute('data-user');
        if (!user) return;
        userReputations[user] = Math.max(0, (userReputations[user] || 0) - 5);
        updateReputationDisplay(user);
        e.target.classList.toggle('transparent-bg');
        const upvoteBtn = answerItem.querySelector('.btn-outline-success');
        if (upvoteBtn && upvoteBtn !== e.target) {
          upvoteBtn.classList.remove('transparent-bg');
        }
      }
    });
  }

  const upvoteBtn = document.getElementsByClassName('.btn-liked');
  if (upvoteBtn) {
    upvoteBtn.addEventListener('click', () => {
      upvoteBtn.classList.toggle('btn-liked');
  
      if (upvoteBtn.classList.contains('btn-liked')) {
        upvoteBtn.textContent = 'أعجبتني'; 
      } else {
        upvoteBtn.textContent = 'اعجبني';
      }
    });
  }
  

  const profileReputation = document.getElementById('userReputation');
  if (profileReputation) {
    profileReputation.textContent = userReputations['alice'] || 0;
  }

  if (answersList) {
    answersList.addEventListener('click', (e) => {
      console.log('Clicked element:', e.target);
      console.log('Clicked element text:', e.target.textContent.trim());
      if (e.target.classList.contains('btn-outline-primary') && e.target.textContent.trim() === 'تثبيت أفضل إجابة') {
        console.log('Pin best answer button clicked');
        const answerItem = e.target.closest('li.list-group-item');
        if (!answerItem) return;

        const pinnedLabel = answersList.querySelector('.pinned-label');
        if (pinnedLabel) {
          pinnedLabel.remove();
        }

        answersList.querySelectorAll('li.list-group-item').forEach(li => {
          li.classList.remove('pinned-answer');
        });

        answerItem.classList.add('pinned-answer');

        const label = document.createElement('span');
        label.className = 'pinned-label badge bg-success ms-2';
        label.textContent = 'مثبتة';

        const strongTag = answerItem.querySelector('p strong');
        if (strongTag) {
          const existingLabel = strongTag.parentNode.querySelector('.pinned-label');
          if (existingLabel) {
            existingLabel.remove();
          }
          strongTag.parentNode.insertBefore(label, strongTag.nextSibling);
        }

        answersList.prepend(answerItem);
      }
    });
  }

  const createGroupForm = document.getElementById('createGroupForm');
  const groupsList = document.getElementById('groupsList');

  if (createGroupForm && groupsList) {
    createGroupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const groupNameInput = document.getElementById('groupName');
      const groupDescriptionInput = document.getElementById('groupDescription');

      const groupName = groupNameInput.value.trim();
      const groupDescription = groupDescriptionInput.value.trim();

      if (!groupName || !groupDescription) {
        alert('يرجى ملء اسم المجموعة والوصف.');
        return;
      }

      const colDiv = document.createElement('div');
      colDiv.className = 'col';

      const cardDiv = document.createElement('div');
      cardDiv.className = 'card h-100';

      const cardBodyDiv = document.createElement('div');
      cardBodyDiv.className = 'card-body';

      const titleH5 = document.createElement('h5');
      titleH5.className = 'card-title';
      titleH5.textContent = groupName;

      const descP = document.createElement('p');
      descP.className = 'card-text';
      descP.textContent = groupDescription;

      const joinBtn = document.createElement('button');
      joinBtn.className = 'btn btn-success me-2';
      joinBtn.textContent = 'انضم إلى المجموعة';

      const discussionsBtn = document.createElement('button');
      discussionsBtn.className = 'btn btn-outline-secondary';
      discussionsBtn.textContent = 'عرض المناقشات';

      cardBodyDiv.appendChild(titleH5);
      cardBodyDiv.appendChild(descP);
      cardBodyDiv.appendChild(joinBtn);
      cardBodyDiv.appendChild(discussionsBtn);

      cardDiv.appendChild(cardBodyDiv);
      colDiv.appendChild(cardDiv);

      groupsList.appendChild(colDiv);

      groupNameInput.value = '';
      groupDescriptionInput.value = '';
    });
  }

  const answerForm = document.getElementById('answerForm');
  if (answerForm) {
    if (!answersList) {
      alert('Error: answersList element not found');
    }
    answerForm.addEventListener('submit', (e) => {
      alert('Answer form submitted');
      e.preventDefault();

      const answerTextInput = document.getElementById('answerText');
      const answerText = answerTextInput.value.trim();

      if (!answerText) {
        alert('يرجى كتابة إجابة قبل الإرسال.');
        return;
      }

      const currentUser = 'alice';

      const li = document.createElement('li');
      li.className = 'list-group-item';

      const p = document.createElement('p');
      p.innerHTML = `<strong>${currentUser.charAt(0).toUpperCase() + currentUser.slice(1)}</strong> <span class="text-muted">(النقاط: <span class="user-reputation" data-user="${currentUser}">${userReputations[currentUser]}</span>)</span>: ${answerText}`;

      const btnPin = document.createElement('button');
      btnPin.className = 'btn btn-sm btn-outline-primary';
      btnPin.textContent = 'تثبيت أفضل إجابة';

      const btnEdit = document.createElement('button');
      btnEdit.className = 'btn btn-sm btn-outline-secondary';
      btnEdit.textContent = 'تعديل';

      const btnDelete = document.createElement('button');
      btnDelete.className = 'btn btn-sm btn-outline-danger';
      btnDelete.textContent = 'حذف';

      const btnUpvote = document.createElement('button');
      btnUpvote.className = 'btn btn-sm btn-outline-success';
      btnUpvote.textContent = 'اعجبني';

      const btnDownvote = document.createElement('button');
      btnDownvote.className = 'btn btn-sm btn-outline-danger';
      btnDownvote.textContent = 'لم يعجبني';

      li.appendChild(p);
      li.appendChild(btnPin);
      li.appendChild(btnEdit);
      li.appendChild(btnDelete);
      li.appendChild(btnUpvote);
      li.appendChild(btnDownvote);

      answersList.appendChild(li);

      userReputations[currentUser] += 10;

      const userReputationElements = document.querySelectorAll(`.user-reputation[data-user="${currentUser}"]`);
      userReputationElements.forEach(el => {
        el.textContent = userReputations[currentUser];
      });

      answerTextInput.value = '';
    });
  }
}});

document.addEventListener('DOMContentLoaded', () => {
  const answersList = document.getElementById('answersList');
  const shareToastEl = document.getElementById('shareToast');
  const shareToast = new bootstrap.Toast(shareToastEl);

  if (answersList && shareToastEl) {
    answersList.addEventListener('click', (e) => {
      console.log('Clicked element:', e.target);
      console.log('Clicked element text:', e.target.textContent.trim());
      if (e.target.classList.contains('btn-outline-secondary') && e.target.textContent.trim() === 'مشاركة') {
        e.preventDefault();
        const answerItem = e.target.closest('li.list-group-item');
        if (!answerItem) {
          console.log('No answer item found');
          return;
        }

        const answers = Array.from(answersList.querySelectorAll('li.list-group-item'));
        const index = answers.indexOf(answerItem);
        let userSpan = answerItem.querySelector('.user-reputation');
        let user = userSpan ? userSpan.getAttribute('data-user') : null;

        const anchor = user ? `answer-${user}` : `answer-${index + 1}`;
        const shareLink = `${window.location.origin}${window.location.pathname}#${anchor}`;

        console.log('Share link:', shareLink);

        navigator.clipboard.writeText(shareLink).then(() => {

          shareToast.show();
          console.log('Link copied and toast shown');
        }).catch(() => {
          alert('فشل نسخ الرابط. يرجى المحاولة مرة أخرى.');
        });
      }
    });
  }
});
const upvoteBtn = document.getElementById('upvoteBtn');
const downvoteBtn = document.getElementById('downvoteBtn');
const upvoteanswer = document.getElementById('upvoteanswer');
const downvoteanswer = document.getElementById('downvoteanswer');

function handleVote(clickedBtn, oppositeBtn) {
  if (clickedBtn.classList.contains('active-btn')) {
    clickedBtn.classList.remove('active-btn');
    return;
  }

  
  oppositeBtn.classList.remove('active-btn');

 
  clickedBtn.classList.add('active-btn');
}

upvoteBtn.addEventListener('click', function() {
  handleVote(this, downvoteBtn);
});

downvoteBtn.addEventListener('click', function() {
  handleVote(this, upvoteBtn);
});

upvoteanswer.addEventListener('click', function() {
  handleVote(this, downvoteanswer);
});

downvoteanswer.addEventListener('click', function() {
  handleVote(this, upvoteanswer);
});

function setLanguage(lang) {
  const body = document.body;
  const langToggle = document.getElementById("currentLang");

 
  if (lang === 'ar') {
    body.classList.remove('lang-en');
    body.classList.add('lang-ar');
    body.setAttribute('dir', 'rtl');
    langToggle.textContent = "العربية";
  } else {
    body.classList.remove('lang-ar');
    body.classList.add('lang-en');
    body.setAttribute('dir', 'ltr');
    langToggle.textContent = "English";
  }


  localStorage.setItem('selectedLanguage', lang);
}

function initLanguage() {
  const savedLang = localStorage.getItem('selectedLanguage') || 'ar';
  setLanguage(savedLang);
}

document.addEventListener('click', function(e) {
  if (e.target.closest('.dropdown-item[data-lang]')) {
    e.preventDefault(); 
    const lang = e.target.getAttribute('data-lang');
    setLanguage(lang);
  }
});


document.addEventListener('DOMContentLoaded', initLanguage);