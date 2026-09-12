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

let n = 0;

function page(id) {
  document.querySelectorAll('.page').forEach(x =>
    x.classList.remove('active')
  );

  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  document.querySelectorAll('nav button').forEach(x =>
    x.classList.toggle('active', x.dataset.p === id)
  );

  n++;

  const activity = document.getElementById('activity');
  if (activity) activity.textContent = n;

  scrollTo(0, 0);
}

function drawer() {
  document.getElementById('drawer').classList.add('show');
}

function closeDrawer() {
  document.getElementById('drawer').classList.remove('show');
}

function sheet() {
  document.getElementById('sheet').classList.add('show');
}

function closeSheet() {
  document.getElementById('sheet').classList.remove('show');
}

let timer;

function toast(t) {
  const x = document.getElementById('toast');

  if (!x) return;

  x.textContent = t;
  x.classList.add('show');

  clearTimeout(timer);

  timer = setTimeout(() => {
    x.classList.remove('show');
  }, 2200);
}

function theme() {
  document.body.classList.toggle('light');

  toast(
    document.body.classList.contains('light')
      ? 'حالت روشن'
      : 'حالت تاریک'
  );
}

/* Telegram user */

if (
  tg &&
  tg.initDataUnsafe &&
  tg.initDataUnsafe.user
) {
  const u = tg.initDataUnsafe.user;

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
   ایده جدید
===================================== */

function newIdea() {

  const idea = prompt(
    '💡 ایده جدید\n\nایده خودت را بنویس:'
  );

  if (!idea || !idea.trim()) {
    toast('⚠️ ایده‌ای وارد نشد');
    return;
  }

  const text = idea.trim();

  /*
   * فعلاً فقط تست محلی.
   * هنوز اطلاعات را به Webhook نمی‌فرستیم.
   */

  localStorage.setItem(
    'project_one_last_idea',
    text
  );

  toast('✅ ایده ثبت شد');

  console.log(
    'PROJECT ONE IDEA:',
    text
  );
}


/* نمایش آخرین ایده */

function showLastIdea() {

  const idea =
    localStorage.getItem(
      'project_one_last_idea'
    );

  if (!idea) {
    toast('💡 هنوز ایده‌ای ثبت نشده');
    return;
  }

  alert(
    '💡 آخرین ایده PROJECT ONE:\n\n' +
    idea
  );
}
