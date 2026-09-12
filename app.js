function newIdea() {

  const idea = prompt(
    '💡 ایده جدید\n\nایده خودت را بنویس:'
  );

  if (idea === null) {
    return;
  }

  const text = idea.trim();

  if (!text) {
    alert('⚠️ ایده خالی است');
    return;
  }

  let ideas = [];

  try {
    ideas = JSON.parse(
      localStorage.getItem('project_one_ideas') || '[]'
    );

    if (!Array.isArray(ideas)) {
      ideas = [];
    }

  } catch (e) {
    ideas = [];
  }

  ideas.push({
    text: text,
    date: new Date().toLocaleString('fa-IR')
  });

  try {

    localStorage.setItem(
      'project_one_ideas',
      JSON.stringify(ideas)
    );

    localStorage.setItem(
      'project_one_last_idea',
      text
    );

  } catch (e) {

    alert(
      '❌ ذخیره انجام نشد\n\n' +
      'مرورگر اجازه ذخیره اطلاعات را نمی‌دهد.'
    );

    console.log(e);

    return;
  }

  alert(
    '✅ ایده با موفقیت ذخیره شد\n\n' +
    '💡 ' + text
  );

}
