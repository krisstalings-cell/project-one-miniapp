const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
  try {
    tg.setHeaderColor("#071731");
    tg.setBackgroundColor("#06132b");
  } catch (_) {}
}

const app = document.getElementById("app");
const drawer = document.getElementById("drawer");
const drawerBackdrop = document.getElementById("drawerBackdrop");
const sheet = document.getElementById("bottomSheet");
const sheetBackdrop = document.getElementById("sheetBackdrop");
const toast = document.getElementById("toast");

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function closeDrawer() {
  drawer.classList.remove("show");
  drawerBackdrop.classList.remove("show");
}

function openDrawer() {
  drawer.classList.add("show");
  drawerBackdrop.classList.add("show");
}

function closeSheet() {
  sheet.classList.remove("show");
  sheetBackdrop.classList.remove("show");
}

function openSheet() {
  sheet.classList.add("show");
  sheetBackdrop.classList.add("show");
}

function setActive(page) {
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === page);
  });
}

function navigate(page) {
  setActive(page);
  closeDrawer();

  if (page === "home") {
    window.scrollTo({top: 0, behavior: "smooth"});
    showToast("🏠 صفحه اصلی");
    return;
  }

  const names = {
    content: "📚 بخش محتوا",
    tools: "🛠️ ابزارها",
    lessons: "🎓 آموزش‌ها",
    profile: "👤 پروفایل",
    settings: "⚙️ تنظیمات",
    help: "❓ راهنما"
  };

  showToast(names[page] || "بخش انتخاب شد");
}

document.querySelectorAll("[data-page]").forEach(btn => {
  btn.addEventListener("click", () => navigate(btn.dataset.page));
});

document.getElementById("menuBtn").addEventListener("click", openDrawer);
document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
drawerBackdrop.addEventListener("click", closeDrawer);

document.getElementById("fabBtn").addEventListener("click", openSheet);
document.getElementById("startBtn").addEventListener("click", openSheet);
document.getElementById("closeSheet").addEventListener("click", closeSheet);
sheetBackdrop.addEventListener("click", closeSheet);

document.querySelectorAll(".bottom-sheet [data-action]").forEach(btn => {
  btn.addEventListener("click", () => {
    const labels = {
      post: "📨 ساخت پست جدید",
      text: "📝 ایجاد متن",
      schedule: "📅 زمان‌بندی محتوا",
      preview: "👁️ پیش‌نمایش"
    };
    closeSheet();
    showToast(`${labels[btn.dataset.action]} انتخاب شد`);
  });
});

// پشتیبانی اولیه از دکمه Back تلگرام
if (tg?.BackButton) {
  tg.BackButton.onClick(() => {
    if (drawer.classList.contains("show")) {
      closeDrawer();
    } else if (sheet.classList.contains("show")) {
      closeSheet();
    }
  });
}

// برای تست مستقیم در مرورگر
window.projectOne = {
  navigate,
  openDrawer,
  openSheet,
  showToast
};
