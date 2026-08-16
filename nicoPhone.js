/* ================================================
 *  nicoPhone 酒馆专属适配启动逻辑
 *  追加在 nicoPhone.js 代码末尾即可生效
 * ================================================ */
(function tavernAdapter() {
  // 防止重复加载
  if (window.QixianPhoneTavernReady) return;
  window.QixianPhoneTavernReady = true;

  const phoneRoot = document.getElementById('Qixian-Phone-Root');
  if (!phoneRoot || !window.QixianPhone) return;

  // ---------- 1. 界面适配：避开酒馆底部输入栏 ----------
  phoneRoot.style.cssText += `
    bottom: 120px !important;
    right: 16px !important;
    z-index: 9998 !important;
    transform: scale(0.82) !important;
    transform-origin: right bottom;
  `;

  // ---------- 2. 自动同步当前角色名称 ----------
  function syncCharacterName() {
    const charName = window.SillyTavern?.character?.name;
    if (!charName) return;
    document.querySelectorAll('.Qixian-bind-lnm').forEach(el => {
      el.textContent = charName;
    });
  }

  // 初始加载 + 切换角色时同步
  syncCharacterName();
  $(document).on('character_loaded', syncCharacterName);

  // ---------- 3. 酒馆消息自动同步到手机 ----------
  $(document).on('chat_message_received', (_event, msg) => {
    if (!msg?.message || msg.is_system || msg.is_cmd) return;
    
    // 剥离 HTML 标签取纯文本
    const pureText = msg.message.replace(/<[^>]+>/g, '').trim();
    if (!pureText) return;

    const side = msg.is_user ? 'right' : 'left';
    window.QixianPhone.addMessage(side, pureText);
  });

  // ---------- 4. 切换对话时清空手机聊天记录 ----------
  $(document).on('chat_changed', () => {
    const chatBox = document.querySelector('.Qixian-jchat');
    if (chatBox) chatBox.innerHTML = '';
    window.QixianPhone.addSystemTip('已切换对话');
    syncCharacterName();
  });

  // ---------- 5. 快捷键：Ctrl+P 显示/隐藏手机 ----------
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      phoneRoot.style.display = phoneRoot.style.display === 'none' ? 'block' : 'none';
    }
  });

  console.log('[QixianPhone] 酒馆适配已加载，Ctrl+P 切换显示');
})();
