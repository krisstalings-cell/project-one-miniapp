const tg =
  window.Telegram && Telegram.WebApp
    ? Telegram.WebApp
    : null;


/* =====================================
   TELEGRAM
===================================== */

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

let n = 0;


function page(id) {

  document.querySelectorAll('.page').forEach(function(x) {

    x.classList.remove('active');

  });


  const target =
    document.getElementById(id);


  if (target) {

    target.classList.add('active');

  }


  document.querySelectorAll('nav button').forEach(function(x) {

    x.classList.toggle(
      'active',
      x.dataset.p === id
    );

  });


  n++;


  const activity =
    document.getElementById('activity');


  if (activity) {

    activity.textContent = n;

  }


  window.scrollTo(0, 0);

}


/* =====================================
   DRAWER
===================================== */

function drawer() {

  const d =
    document.getElementById('drawer');


  if (d) {

    d.classList.add('show');

  }

}


function closeDrawer() {

  const d =
    document.getElementById('drawer');


  if (d) {

    d.classList.remove('show');

  }

}


/* =====================================
   BOTTOM SHEET
===================================== */

function sheet() {

  const s =
    document.getElementById('sheet');


  if (s) {

    s.classList.add('show');

  }

}


function closeSheet() {

  const s =
    document.getElementById('sheet');


  if (s) {

    s.classList.remove('show');

  }

}


/* =====================================
   TOAST
===================================== */

let timer;


function toast(text) {

  const x =
    document.getElementById('toast');


  if (!x) {

    alert(text);

    return;

  }


  x.textContent = text;

  x.classList.add('show');


  clearTimeout(timer);


  timer = setTimeout(function() {

    x.classList.remove('show');

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

if (
  tg &&
  tg.initDataUnsafe &&
  tg.initDataUnsafe.user
) {

  const u =
    tg.initDataUnsafe.user;


  const name =
    document.getElementById('name');


  const username =
    document.getElementById('username');


  const welcome =
    document.getElementById('welcome');


  if (name) {

    name.textContent =
      [u.first_name, u.last_name]
        .filter(Boolean)
        .join(' ') || 'کاربر';

  }


  if (username) {

    username.textContent =
      u.username
        ? '@' + u.username
        : 'کاربر تلگرام';

  }


  if (welcome) {

    welcome.textContent =
      'خوش آمدی ' +
      (u.first_name || 'دوست') +
      ' 🌌';

  }

}


/* =====================================
   PROJECT ONE
   NEW IDEA
===================================== */

function newIdea() {

  alert('💡 دکمه ایده جدید فعال است');


  const idea =
    prompt(
      '💡 ایده جدید\n\n' +
      'ایده خودت را بنویس:'
    );


  /* لغو */

  if (idea === null) {

    alert('❌ لغو شد');

    return;

  }


  /* حذف فاصله‌های اضافی */

  const text =
    idea.trim();


  /* متن خالی */

  if (!text) {

    alert('⚠️ چیزی وارد نکردی');

    return;

  }


  /* ذخیره محلی */

  localStorage.setItem(
    'project_one_last_idea',
    text
  );


  /* پیام موفقیت */

  alert(
    '✅ ایده ثبت شد\n\n' +
    text
  );


  console.log(
    'PROJECT ONE IDEA:',
    text
  );

}


/* =====================================
   SHOW LAST IDEA
===================================== */

function showLastIdea() {

  const idea =
    localStorage.getItem(
      'project_one_last_idea'
    );


  if (!idea) {

    alert(
      '💡 هنوز ایده‌ای ثبت نشده'
    );

    return;

  }


  alert(
    '💡 آخرین ایده PROJECT ONE:\n\n' +
    idea
  );

}


/* =====================================
   GLOBAL FUNCTIONS
   برای onclick در index.html
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


window.showLastIdea =
  showLastIdea;


/* =====================================
   START
===================================== */

console.log(
  '🚀 PROJECT ONE Mini App loaded'
);
