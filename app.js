/* =========================================================
   PROJECT ONE — Telegram Mini App
   app.js
   ========================================================= */


/* =========================================================
   TELEGRAM
   ========================================================= */

const tg =
  window.Telegram && Telegram.WebApp
    ? Telegram.WebApp
    : null;


if (tg) {

  tg.ready();
  tg.expand();

  try {
    tg.setHeaderColor('#07111f');
    tg.setBackgroundColor('#07111f');
  } catch (e) {}

}


/* =========================================================
   HELPERS
   ========================================================= */

function showToast(message) {

  const toast = document.getElementById('toast');

  if (!toast) {
    alert(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(function () {
    toast.classList.remove('show');
  }, 2500);

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function showPage(pageId) {

  const pages =
    document.querySelectorAll('.page');

  pages.forEach(function (page) {
    page.classList.remove('active');
  });

  const target =
    document.getElementById(pageId);

  if (target) {
    target.classList.add('active');
  }

  const navItems =
    document.querySelectorAll(
      '.bottom-nav button'
    );

  navItems.forEach(function (item) {
    item.classList.remove('active');
  });

}


/* =========================================================
   DRAWER
   ========================================================= */

function openDrawer() {

  const drawer =
    document.getElementById('drawer');

  const overlay =
    document.getElementById('drawerOverlay');

  if (drawer) {
    drawer.classList.add('open');
  }

  if (overlay) {
    overlay.classList.add('show');
  }

}


function closeDrawer() {

  const drawer =
    document.getElementById('drawer');

  const overlay =
    document.getElementById('drawerOverlay');

  if (drawer) {
    drawer.classList.remove('open');
  }

  if (overlay) {
    overlay.classList.remove('show');
  }

}


/* =========================================================
   BOTTOM SHEET
   ========================================================= */

function openSheet() {

  const sheet =
    document.getElementById('bottomSheet');

  if (sheet) {
    sheet.classList.add('open');
  }

}


function closeSheet() {

  const sheet =
    document.getElementById('bottomSheet');

  if (sheet) {
    sheet.classList.remove('open');
  }

}


/* =========================================================
   THEME
   ========================================================= */

function toggleTheme() {

  document.body.classList.toggle('light');

  const isLight =
    document.body.classList.contains('light');

  try {
    localStorage.setItem(
      'project_one_theme',
      isLight ? 'light' : 'dark'
    );
  } catch (e) {}

  if (tg) {

    try {

      if (isLight) {

        tg.setHeaderColor('#ffffff');
        tg.setBackgroundColor('#ffffff');

      } else {

        tg.setHeaderColor('#07111f');
        tg.setBackgroundColor('#07111f');

      }

    } catch (e) {}

  }

}


function loadTheme() {

  let theme = 'dark';

  try {

    theme =
      localStorage.getItem(
        'project_one_theme'
      ) || 'dark';

  } catch (e) {}

  if (theme === 'light') {
    document.body.classList.add('light');
  }

}


/* =========================================================
   TELEGRAM USER
   ========================================================= */

function loadTelegramUser() {

  if (!tg) {
    return;
  }

  const user =
    tg.initDataUnsafe &&
    tg.initDataUnsafe.user
      ? tg.initDataUnsafe.user
      : null;

  if (!user) {
    return;
  }


  const name =
    user.first_name ||
    'کاربر';


  const username =
    user.username
      ? '@' + user.username
      : '';


  const userNameElements =
    document.querySelectorAll(
      '[data-telegram-name]'
    );


  userNameElements.forEach(
    function (element) {

      element.textContent =
        name;

    }
  );


  const usernameElements =
    document.querySelectorAll(
      '[data-telegram-username]'
    );


  usernameElements.forEach(
    function (element) {

      element.textContent =
        username;

    }
  );


  const photoElements =
    document.querySelectorAll(
      '[data-telegram-photo]'
    );


  photoElements.forEach(
    function (element) {

      if (user.photo_url) {

        element.src =
          user.photo_url;

      }

    }
  );

}


/* =========================================================
   IDEAS — STORAGE
   ========================================================= */

function getIdeas() {

  try {

    const raw =
      localStorage.getItem(
        'project_one_ideas'
      );

    if (!raw) {
      return [];
    }

    const ideas =
      JSON.parse(raw);

    if (!Array.isArray(ideas)) {
      return [];
    }

    return ideas;

  } catch (e) {

    return [];

  }

}


/* =========================================================
   SAVE IDEAS
   ========================================================= */

function saveIdeas(ideas) {

  try {

    localStorage.setItem(
      'project_one_ideas',
      JSON.stringify(ideas)
    );

    return true;

  } catch (e) {

    console.log(e);

    return false;

  }

}


/* =========================================================
   NEW IDEA
   ========================================================= */

function newIdea() {

  const idea =
    prompt(
      '💡 ایده جدید\n\nایده خودت را بنویس:'
    );


  if (idea === null) {
    return;
  }


  const text =
    idea.trim();


  if (!text) {

    alert(
      '⚠️ ایده خالی است'
    );

    return;

  }


  const ideas =
    getIdeas();


  const item = {

    text: text,

    date:
      new Date()
        .toLocaleString('fa-IR')

  };


  ideas.push(item);


  const saved =
    saveIdeas(ideas);


  if (!saved) {

    alert(
      '❌ ذخیره انجام نشد\n\n' +
      'مرورگر اجازه ذخیره اطلاعات را نمی‌دهد.'
    );

    return;

  }


  try {

    localStorage.setItem(
      'project_one_last_idea',
      text
    );

  } catch (e) {}


  alert(
    '✅ ایده با موفقیت ذخیره شد\n\n' +
    '💡 ' + text
  );

}


/* =========================================================
   SHOW ALL IDEAS
   ========================================================= */

function showIdeas() {

  const ideas =
    getIdeas();


  if (ideas.length === 0) {

    alert(
      '📭 هنوز هیچ ایده‌ای ثبت نشده است.'
    );

    return;

  }


  let text =
    '💡 ایده‌های PROJECT ONE\n\n';


  ideas.forEach(
    function (idea, index) {

      text +=
        (index + 1) +
        '. ' +
        idea.text +
        '\n';

      if (idea.date) {

        text +=
          '🕒 ' +
          idea.date +
          '\n';

      }

      text +=
        '\n';

    }
  );


  alert(text);

}


/* =========================================================
   SHOW LAST IDEA
   ========================================================= */

function showLastIdea() {

  let lastIdea = '';


  try {

    lastIdea =
      localStorage.getItem(
        'project_one_last_idea'
      ) || '';

  } catch (e) {}


  if (!lastIdea) {

    const ideas =
      getIdeas();

    if (ideas.length > 0) {

      lastIdea =
        ideas[ideas.length - 1].text;

    }

  }


  if (!lastIdea) {

    alert(
      '📭 هنوز ایده‌ای ثبت نشده است.'
    );

    return;

  }


  alert(
    '💡 آخرین ایده:\n\n' +
    lastIdea
  );

}


/* =========================================================
   IDEA COUNT
   ========================================================= */

function ideaCount() {

  const ideas =
    getIdeas();


  alert(
    '💡 تعداد ایده‌ها:\n\n' +
    ideas.length
  );

}


/* =========================================================
   DELETE IDEAS
   ========================================================= */

function deleteIdeas() {

  const confirmDelete =
    confirm(
      '⚠️ آیا مطمئنی می‌خواهی تمام ایده‌ها حذف شوند؟'
    );


  if (!confirmDelete) {
    return;
  }


  try {

    localStorage.removeItem(
      'project_one_ideas'
    );

    localStorage.removeItem(
      'project_one_last_idea'
    );

  } catch (e) {}


  alert(
    '🗑 تمام ایده‌ها حذف شدند.'
  );

}


/* =========================================================
   TEST IDEA STORAGE
   ========================================================= */

function testIdeaStorage() {

  const test =
    'تست ذخیره PROJECT ONE';


  try {

    localStorage.setItem(
      'project_one_test',
      test
    );


    const result =
      localStorage.getItem(
        'project_one_test'
      );


    if (result === test) {

      alert(
        '✅ سیستم ذخیره‌سازی سالم است.'
      );

    } else {

      alert(
        '❌ ذخیره‌سازی مشکل دارد.'
      );

    }


    localStorage.removeItem(
      'project_one_test'
    );


  } catch (e) {

    alert(
      '❌ مرورگر اجازه ذخیره اطلاعات را نمی‌دهد.'
    );

  }

}


/* =========================================================
   TEST TELEGRAM CONNECTION
   ========================================================= */

function testTelegramConnection() {

  if (!tg) {

    alert(
      '❌ Telegram WebApp در دسترس نیست.'
    );

    return;

  }


  const user =
    tg.initDataUnsafe &&
    tg.initDataUnsafe.user
      ? tg.initDataUnsafe.user
      : null;


  const queryId =
    tg.initDataUnsafe
      ? tg.initDataUnsafe.query_id
      : null;


  alert(

    '✅ اتصال Telegram فعال است\n\n' +

    '👤 User:\n' +

    (
      user
        ? (user.first_name || 'کاربر')
        : 'نامشخص'
    ) +

    '\n\n' +

    '🔑 Query ID:\n' +

    (
      queryId
        ? '✅ دریافت شد'
        : '❌ دریافت نشد'
    )

  );

}


/* =========================================================
   SEND IDEA TEST
   ========================================================= */

function sendIdeaTest() {

  if (!tg) {

    alert(
      '❌ Telegram WebApp در دسترس نیست'
    );

    return;

  }


  const idea =
    prompt(
      '💡 ارسال ایده\n\n' +
      'ایده خودت را بنویس:'
    );


  if (idea === null) {
    return;
  }


  const text =
    idea.trim();


  if (!text) {

    alert(
      '⚠️ ایده خالی است'
    );

    return;

  }


  const user =
    tg.initDataUnsafe &&
    tg.initDataUnsafe.user
      ? tg.initDataUnsafe.user
      : null;


  const queryId =
    tg.initDataUnsafe
      ? tg.initDataUnsafe.query_id
      : null;


  const payload = {

    type: 'idea',

    text: text,

    date:
      new Date().toISOString(),

    query_id:
      queryId,

    user_id:
      user
        ? user.id
        : null,

    username:
      user && user.username
        ? user.username
        : null,

    first_name:
      user && user.first_name
        ? user.first_name
        : null

  };


  console.log(
    'PROJECT ONE PAYLOAD:',
    payload
  );


  alert(

    '📤 ایده آماده ارسال است\n\n' +

    '💡 ' +
    text +

    '\n\n' +

    '👤 ' +

    (
      user
        ? (user.first_name || 'کاربر')
        : 'نامشخص'
    ) +

    '\n\n' +

    '🔑 Query ID: ' +

    (
      queryId
        ? '✅ موجود'
        : '❌ موجود نیست'
    )

  );

}


/* =========================================================
   FAB
   ========================================================= */

function openFab() {

  const sheet =
    document.getElementById(
      'bottomSheet'
    );

  if (sheet) {

    sheet.classList.add(
      'open'
    );

  }

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
  'DOMContentLoaded',
  function () {

    loadTheme();

    loadTelegramUser();

  }
);


/* =========================================================
   GLOBAL FUNCTIONS
   ========================================================= */

window.newIdea =
  newIdea;

window.showIdeas =
  showIdeas;

window.showLastIdea =
  showLastIdea;

window.ideaCount =
  ideaCount;

window.deleteIdeas =
  deleteIdeas;

window.testIdeaStorage =
  testIdeaStorage;

window.testTelegramConnection =
  testTelegramConnection;

window.sendIdeaTest =
  sendIdeaTest;

window.showPage =
  showPage;

window.openDrawer =
  openDrawer;

window.closeDrawer =
  closeDrawer;

window.openSheet =
  openSheet;

window.closeSheet =
  closeSheet;

window.toggleTheme =
  toggleTheme;

window.openFab =
  openFab;
