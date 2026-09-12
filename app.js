/* =====================================
   PROJECT ONE
   MINI APP - APP.JS
===================================== */


/* =====================================
   TELEGRAM
===================================== */

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


/* =====================================
   PAGE NAVIGATION
===================================== */

let activityCount = 0;


function page(id) {

  document
    .querySelectorAll('.page')
    .forEach(function(pageElement) {

      pageElement.classList.remove('active');

    });


  const target =
    document.getElementById(id);


  if (target) {

    target.classList.add('active');

  }


  document
    .querySelectorAll('nav button')
    .forEach(function(button) {

      button.classList.toggle(
        'active',
        button.dataset.p === id
      );

    });


  activityCount++;


  const activity =
    document.getElementById('activity');


  if (activity) {

    activity.textContent =
      activityCount;

  }


  window.scrollTo(0, 0);

}


/* =====================================
   DRAWER
===================================== */

function drawer() {

  const element =
    document.getElementById('drawer');


  if (element) {

    element.classList.add('show');

  }

}


function closeDrawer() {

  const element =
    document.getElementById('drawer');


  if (element) {

    element.classList.remove('show');

  }

}


/* =====================================
   BOTTOM SHEET
===================================== */

function sheet() {

  const element =
    document.getElementById('sheet');


  if (element) {

    element.classList.add('show');

  }

}


function closeSheet() {

  const element =
    document.getElementById('sheet');


  if (element) {

    element.classList.remove('show');

  }

}


/* =====================================
   TOAST
===================================== */

let toastTimer;


function toast(message) {

  const element =
    document.getElementById('toast');


  if (!element) {

    alert(message);

    return;

  }


  element.textContent =
    message;


  element.classList.add('show');


  clearTimeout(toastTimer);


  toastTimer =
    setTimeout(function() {

      element.classList.remove('show');

    }, 2200);

}


/* =====================================
   THEME
===================================== */

function theme() {

  document.body.classList.toggle('light');


  if (
    document.body.classList.contains('light')
  ) {

    toast('☀️ حالت روشن');

  } else {

    toast('🌙 حالت تاریک');

  }

}


/* =====================================
   TELEGRAM USER
===================================== */

function loadTelegramUser() {

  if (
    !tg ||
    !tg.initDataUnsafe ||
    !tg.initDataUnsafe.user
  ) {

    return;

  }


  const user =
    tg.initDataUnsafe.user;


  const name =
    document.getElementById('name');


  const username =
    document.getElementById('username');


  const welcome =
    document.getElementById('welcome');


  if (name) {

    name.textContent =
      [
        user.first_name,
        user.last_name
      ]
        .filter(Boolean)
        .join(' ')
        || 'کاربر';

  }


  if (username) {

    username.textContent =
      user.username
        ? '@' + user.username
        : 'کاربر تلگرام';

  }


  if (welcome) {

    welcome.textContent =
      'خوش آمدی ' +
      (user.first_name || 'دوست') +
      ' 🌌';

  }

}


loadTelegramUser();


/* =====================================
   IDEA STORAGE
===================================== */

function getIdeas() {

  try {

    const saved =
      localStorage.getItem(
        'project_one_ideas'
      );


    if (!saved) {

      return [];

    }


    const ideas =
      JSON.parse(saved);


    if (!Array.isArray(ideas)) {

      return [];

    }


    return ideas;

  } catch (error) {

    console.log(
      'IDEA READ ERROR:',
      error
    );


    return [];

  }

}


/* =====================================
   SAVE IDEAS
===================================== */

function saveIdeas(ideas) {

  try {

    localStorage.setItem(
      'project_one_ideas',
      JSON.stringify(ideas)
    );


    return true;

  } catch (error) {

    console.log(
      'IDEA SAVE ERROR:',
      error
    );


    return false;

  }

}


/* =====================================
   NEW IDEA
===================================== */

function newIdea() {

  const idea =
    prompt(
      '💡 ایده جدید\n\n' +
      'ایده خودت را بنویس:'
    );


  if (idea === null) {

    return;

  }


  const text =
    idea.trim();


  if (!text) {

    alert(
      '⚠️ ایده خالی است.'
    );

    return;

  }


  const ideas =
    getIdeas();


  const newItem = {

    id:
      Date.now(),

    text:
      text,

    date:
      new Date().toLocaleString('fa-IR')

  };


  ideas.push(newItem);


  const saved =
    saveIdeas(ideas);


  if (!saved) {

    alert(
      '❌ ایده ذخیره نشد.\n\n' +
      'امکان ذخیره‌سازی در این محیط وجود ندارد.'
    );

    return;

  }


  /* آخرین ایده */

  try {

    localStorage.setItem(
      'project_one_last_idea',
      text
    );

  } catch (error) {

    console.log(error);

  }


  alert(
    '✅ ایده با موفقیت ذخیره شد!\n\n' +
    '💡 ' +
    text
  );


  console.log(
    'PROJECT ONE IDEA SAVED:',
    newItem
  );

}


/* =====================================
   SHOW ALL IDEAS
===================================== */

function showIdeas() {

  const ideas =
    getIdeas();


  if (ideas.length === 0) {

    alert(
      '💡 هنوز هیچ ایده‌ای ثبت نشده است.'
    );

    return;

  }


  let output =
    '💡 ایده‌های PROJECT ONE\n\n';


  ideas.forEach(
    function(idea, index) {

      if (
        typeof idea === 'object' &&
        idea !== null
      ) {

        output +=
          (index + 1) +
          '. ' +
          idea.text +
          '\n' +
          '🕐 ' +
          (idea.date || '') +
          '\n\n';

      } else {

        output +=
          (index + 1) +
          '. ' +
          idea +
          '\n\n';

      }

    }
  );


  alert(output);

}


/* =====================================
   SHOW LAST IDEA
===================================== */

function showLastIdea() {

  let lastIdea = null;


  try {

    lastIdea =
      localStorage.getItem(
        'project_one_last_idea'
      );

  } catch (error) {

    console.log(error);

  }


  /* اگر آخرین ایده نبود،
     از لیست ایده‌ها پیدا کن */

  if (!lastIdea) {

    const ideas =
      getIdeas();


    if (ideas.length > 0) {

      const last =
        ideas[ideas.length - 1];


      if (
        typeof last === 'object' &&
        last !== null
      ) {

        lastIdea =
          last.text;

      } else {

        lastIdea =
          last;

      }

    }

  }


  if (!lastIdea) {

    alert(
      '💡 هنوز هیچ ایده‌ای ثبت نشده است.'
    );

    return;

  }


  alert(
    '💡 آخرین ایده PROJECT ONE\n\n' +
    lastIdea
  );

}


/* =====================================
   IDEA COUNT
===================================== */

function ideaCount() {

  const ideas =
    getIdeas();


  alert(
    '📊 تعداد ایده‌های PROJECT ONE:\n\n' +
    ideas.length
  );

}


/* =====================================
   DELETE ALL IDEAS
===================================== */

function deleteIdeas() {

  const ideas =
    getIdeas();


  if (ideas.length === 0) {

    alert(
      '💡 لیست ایده‌ها خالی است.'
    );

    return;

  }


  const confirmed =
    confirm(
      '⚠️ هشدار\n\n' +
      'آیا مطمئنی می‌خواهی ' +
      'همه ایده‌ها حذف شوند؟'
    );


  if (!confirmed) {

    return;

  }


  try {

    localStorage.removeItem(
      'project_one_ideas'
    );


    localStorage.removeItem(
      'project_one_last_idea'
    );

  } catch (error) {

    alert(
      '❌ حذف انجام نشد.'
    );

    console.log(error);

    return;

  }


  alert(
    '🗑️ همه ایده‌ها حذف شدند.'
  );

}


/* =====================================
   IDEA SYSTEM TEST
===================================== */

function testIdeaStorage() {

  const testText =
    'تست سیستم ایده PROJECT ONE';


  const ideas =
    getIdeas();


  ideas.push({

    id:
      Date.now(),

    text:
      testText,

    date:
      new Date().toLocaleString('fa-IR')

  });


  const saved =
    saveIdeas(ideas);


  if (saved) {

    alert(
      '✅ سیستم ذخیره ایده سالم است.'
    );

  } else {

    alert(
      '❌ سیستم ذخیره ایده مشکل دارد.'
    );

  }

}


/* =====================================
   GLOBAL FUNCTIONS
===================================== */

window.page =
  page;


window.drawer =
  drawer;


window.closeDrawer =
  closeDrawer;


window.sheet =
  sheet;


window.closeSheet =
  closeSheet;


window.toast =
  toast;


window.theme =
  theme;


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


/* =====================================
   APP START
===================================== */

console.log(
  '🚀 PROJECT ONE Mini App loaded'
);


console.log(
  '💡 Idea system loaded'
);
