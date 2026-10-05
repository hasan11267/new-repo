/**
 * FreshFind — Smart Chatbot v3.0
 * - English + Urdu language toggle
 * - 40+ keyword responses
 * - Typing indicator
 * - Simple & reliable
 */

document.addEventListener('DOMContentLoaded', function () {

  var launcher = document.getElementById('chatLauncher');
  var bot      = document.getElementById('chatbot');
  var closeBtn = document.getElementById('chatClose');
  var form     = document.getElementById('chatForm');
  var input    = document.getElementById('chatInput');
  var messages = document.getElementById('chatMessages');

  if (!launcher || !bot || !closeBtn || !form || !input || !messages) return;

  // ─── Language State ────────────────────────────────────────
  var currentLang = localStorage.getItem('ff-chat-lang') || 'en';

  // ─── Open / Close ──────────────────────────────────────────
  launcher.addEventListener('click', function () {
    var isOpen = bot.classList.toggle('open');
    if (isOpen) { setTimeout(function () { input.focus(); }, 200); }
  });

  closeBtn.addEventListener('click', function () {
    bot.classList.remove('open');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') bot.classList.remove('open');
  });

  // ─── Quick Reply Buttons ───────────────────────────────────
  document.querySelectorAll('.quick-replies button').forEach(function (btn) {
    btn.addEventListener('click', function () { ask(btn.dataset.question); });
  });

  // ─── Form Submit ───────────────────────────────────────────
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = input.value.trim();
    if (q) { ask(q); input.value = ''; }
  });

  // ─── Language Toggle Button ────────────────────────────────
  var langBtn = document.getElementById('chatLangToggle');
  if (langBtn) {
    updateLangBtn();
    langBtn.addEventListener('click', function () {
      currentLang = (currentLang === 'en') ? 'ur' : 'en';
      localStorage.setItem('ff-chat-lang', currentLang);
      updateLangBtn();
      var msg = (currentLang === 'ur')
        ? 'آپ نے اردو زبان منتخب کی۔ اب آپ اردو میں سوال پوچھ سکتے ہیں! 🌿'
        : 'English language selected. You can now ask questions in English! 🌿';
      addBotMsg(msg);
    });
  }

  function updateLangBtn() {
    if (!langBtn) return;
    if (currentLang === 'ur') {
      langBtn.textContent = '🇬🇧 English';
      langBtn.title = 'Switch to English';
      input.placeholder = 'سوال پوچھیں...';
    } else {
      langBtn.textContent = '🇵🇰 اردو';
      langBtn.title = 'اردو میں سوئچ کریں';
      input.placeholder = 'Ask a question...';
    }
  }

  // ─── Core ask() ────────────────────────────────────────────
  function ask(question) {
    addUserMsg(escapeHtml(question));
    showTyping();
    setTimeout(function () {
      hideTyping();
      var answer = currentLang === 'ur'
        ? getAnswerUrdu(question.toLowerCase().trim())
        : getAnswerEn(question.toLowerCase().trim());
      addBotMsg(answer);
    }, 500);
  }

  function addUserMsg(html) {
    var d = document.createElement('div');
    d.className = 'user-message';
    d.innerHTML = html;
    messages.appendChild(d);
    messages.scrollTop = messages.scrollHeight;
  }

  function addBotMsg(html) {
    var d = document.createElement('div');
    d.className = 'bot-message';
    d.innerHTML = html;
    messages.appendChild(d);
    messages.scrollTop = messages.scrollHeight;
  }

  var typingEl = null;
  function showTyping() {
    typingEl = document.createElement('div');
    typingEl.className = 'bot-message typing-indicator';
    typingEl.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typingEl);
    messages.scrollTop = messages.scrollHeight;
  }
  function hideTyping() {
    if (typingEl) { typingEl.remove(); typingEl = null; }
  }

  // ══════════════════════════════════════════════════════════
  //  ENGLISH ANSWERS
  // ══════════════════════════════════════════════════════════
  function getAnswerEn(q) {

    // Open Markets
    if (q.includes('open') || q.includes('today') || q.includes('right now') || q.includes('currently')) {
      var openList = (window.markets || []).filter(isOpenNow);
      if (openList.length) {
        return '🟢 <strong>Currently open markets:</strong><br>' +
          openList.map(function (m) { return '&bull; ' + m.name + ' (' + m.area + ')'; }).join('<br>');
      }
      return '😴 No markets are open right now. Check the Market Directory for schedules!';
    }

    // All 6 Markets by name
    if (q.includes('green basket'))  return '🏪 <strong>Green Basket Market</strong> — Block 4, Clifton. Mon/Wed/Fri/Sat 9AM-6PM. Organic produce, 18 vendors. ⭐4.9';
    if (q.includes('fresh farm'))    return '🏪 <strong>Fresh Farm Shop</strong> — Phase 6, DHA. Tue/Thu/Sat 8AM-5PM. Daily morning restock, 14 vendors. ⭐4.8';
    if (q.includes('karachi fresh')) return '🏪 <strong>Karachi Fresh Market</strong> — University Road, Gulshan. Mon-Sat 10AM-8PM. Wholesale rates, 28 vendors. ⭐4.7';
    if (q.includes('organic corner')) return '🏪 <strong>Organic Corner</strong> — Tariq Road, PECHS. Fri/Sat/Sun 9AM-7PM. 100% pesticide-free, 12 vendors. ⭐4.9';
    if (q.includes('farmers fresh') || q.includes('farmers hub')) return '🏪 <strong>Farmers Fresh Hub</strong> — Hyderi, North Nazimabad. Wed/Sat/Sun 8AM-4PM. 22 vendors. ⭐4.8';
    if (q.includes('green roots'))   return '🏪 <strong>Green Roots Market</strong> — Malir River Road. Thu/Sun 8AM-4PM. Same-day harvest, 16 vendors. ⭐4.7';
   
    // All 6 Markets by area
    if (q.includes('clifton'))       return '📍 <strong>Green Basket Market</strong> is in Clifton, Block 4 Marine Promenade. Open Mon/Wed/Fri/Sat 9AM-6PM!';
    if (q.includes('dha'))           return '📍 <strong>Fresh Farm Shop</strong> is in DHA Phase 6. Open Tue/Thu/Sat 8AM-5PM. Bulk discounts available!';
    if (q.includes('gulshan'))       return '📍 <strong>Karachi Fresh Market</strong> is in Gulshan-e-Iqbal. Open 6 days a week 10AM-8PM!';
    if (q.includes('pechs') || q.includes('tariq')) return '📍 <strong>Organic Corner</strong> is near Tariq Road, PECHS. Weekend market Fri/Sat/Sun 9AM-7PM!';
    if (q.includes('malir'))         return '📍 <strong>Green Roots Market</strong> is in Malir — fresh from the green belt! Open Thu &amp; Sun 8AM-4PM.';
    if (q.includes('nazimabad') || q.includes('hyderi') || q.includes('north')) return '📍 <strong>Farmers Fresh Hub</strong> is in Hyderi, North Nazimabad. Open Wed/Sat/Sun 8AM-4PM.';

    // Produce
    if (q.includes('mango'))         return '🥭 Mangoes at <strong>Green Basket Market</strong> (Clifton) &amp; <strong>Karachi Fresh Market</strong> (Gulshan). Season: May-Aug!';
    if (q.includes('spinach'))       return '🥬 Spinach at <strong>Green Basket Market</strong>, <strong>Organic Corner</strong> &amp; <strong>Green Roots Market</strong>. Season: Oct-Mar.';
    if (q.includes('tomato'))        return '🍅 Tomatoes year-round — best at <strong>Green Basket Market</strong> &amp; <strong>Farmers Fresh Hub</strong>.';
    if (q.includes('carrot'))        return '🥕 Carrots at <strong>Fresh Farm Shop</strong> (DHA) — season Nov-Mar.';
    if (q.includes('apple'))         return '🍎 Apples at <strong>Fresh Farm Shop</strong> (DHA) — season Aug-Nov.';
    if (q.includes('orange') || q.includes('citrus')) return '🍊 Oranges &amp; citrus at <strong>Karachi Fresh Market</strong> (Gulshan) — season Nov-Feb.';
    if (q.includes('honey'))         return '🍯 Organic honey at <strong>Green Basket Market</strong> &amp; <strong>Organic Corner</strong> (PECHS).';
    if (q.includes('mint') || q.includes('coriander') || q.includes('herb')) return '🌿 Fresh herbs (mint, coriander) year-round at <strong>Green Roots Market</strong> (Malir) &amp; <strong>Organic Corner</strong>.';
    if (q.includes('potato'))        return '🥔 Potatoes at <strong>Fresh Farm Shop</strong> (DHA) &amp; <strong>Farmers Fresh Hub</strong> (Nazimabad).';
    if (q.includes('banana'))        return '🍌 Bananas year-round at <strong>Karachi Fresh Market</strong> (Gulshan).';
    if (q.includes('broccoli') || q.includes('lettuce')) return '🥦 Broccoli &amp; lettuce at <strong>Organic Corner</strong> (PECHS) — hydroponic &amp; soil-grown!';
    if (q.includes('onion') || q.includes('garlic'))  return '🧅 Onions &amp; garlic at <strong>Karachi Fresh Market</strong> (Gulshan) year-round.';
    if (q.includes('guava'))         return '🍈 Guava at <strong>Farmers Fresh Hub</strong> (Nazimabad) — seasonal!';
    if (q.includes('egg') || q.includes('milk') || q.includes('butter') || q.includes('dairy')) return '🥚 Farm eggs &amp; dairy at <strong>Green Basket Market</strong> (Clifton) &amp; <strong>Fresh Farm Shop</strong> (DHA).';

    // Features
    if (q.includes('organic') || q.includes('pesticide')) return '🌱 <strong>Organic Corner</strong> (PECHS) is 100% pesticide-free. <strong>Green Basket Market</strong> has certified organic too!';
    if (q.includes('map') || q.includes('location') || q.includes('direction') || q.includes('navigate')) return '🗺️ Use the <strong>Interactive Map</strong> on Home or Markets page. Click <em>"Find Markets Near Me"</em> to use your GPS!';
    if (q.includes('hour') || q.includes('time') || q.includes('schedule') || q.includes('when') || q.includes('timing')) return '🕒 Each market card shows days &amp; hours. Click <strong>View Details</strong> for full weekly schedule!';
    if (q.includes('favorite') || q.includes('save') || q.includes('heart') || q.includes('bookmark')) return '❤️ Click the <strong>heart button</strong> on any market card to save favorites. Stored in your browser!';
    if (q.includes('dark') || q.includes('night') || q.includes('theme')) return '🌙 Toggle <strong>Dark Mode</strong> with the moon 🌙 button in the navbar!';
    if (q.includes('vendor') || q.includes('seller') || q.includes('stall') || q.includes('farmer') || q.includes('grower')) return '👩‍🌾 Want to list your market? Use the <strong>Contact Us</strong> form and our team will reach you!';
    if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('reach')) return '📞 Visit our <strong>Contact page</strong> — email: hello@freshfind.example | Mon-Sat 9AM-6PM.';
    if (q.includes('newsletter') || q.includes('subscribe') || q.includes('update') || q.includes('notification')) return '📧 Scroll to the bottom for our <strong>Newsletter</strong> signup — get weekly market updates!';
    if (q.includes('urdu') || q.includes('language') || q.includes('change language')) return '🇵🇰 Click the <strong>اردو</strong> button above to switch to Urdu language!';

    // Season query
    if (q.includes('season') || q.includes('in season') || q.includes('fresh now')) {
      var mo = new Date().toLocaleString('en-US', { month: 'long' });
      return '🌿 Current month: <strong>' + mo + '</strong>. Look for the <em>"In Season Now"</em> badge on produce cards for what\'s freshest!';
    }

    // Greetings
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('salaam') || q.includes('salam') || q.includes('assalam')) return '👋 Hello! I am your FreshFind assistant. Ask me about markets, produce, timing, map, or favorites!';
    if (q.includes('thank') || q.includes('shukria') || q.includes('shukriya')) return '🌱 You are welcome! Enjoy your fresh market visit. Eat fresh, stay healthy! 💚';
    if (q.includes('bye') || q.includes('goodbye') || q.includes('khuda hafiz')) return '👋 Goodbye! Visit again soon for fresh market updates!';

    // Default
    return '🤔 I\'m not sure about that. Try asking:<br>&bull; <em>"Which markets are open today?"</em><br>&bull; <em>"Where can I find mangoes?"</em><br>&bull; <em>"Green Basket Market hours"</em><br>&bull; <em>"Show me the map"</em>';
  }

  // ══════════════════════════════════════════════════════════
  //  URDU ANSWERS
  // ══════════════════════════════════════════════════════════
  function getAnswerUrdu(q) {

    // Open Markets
    if (q.includes('open') || q.includes('aaj') || q.includes('khula') || q.includes('today') || q.includes('abhi') || q.includes('kha')) {
      var openListUr = (window.markets || []).filter(isOpenNow);
      if (openListUr.length) {
        return '🟢 <strong>ابھی کھلے ہوئے بازار:</strong><br>' +
          openListUr.map(function (m) { return '&bull; ' + m.name + ' (' + m.area + ')'; }).join('<br>');
      }
      return '😴 ابھی کوئی بازار کھلا نہیں ہے۔ مارکیٹ ڈائریکٹری میں اوقات دیکھیں!';
    }

    // Markets by name
    if (q.includes('green basket'))   return '🏪 <strong>گرین باسکٹ مارکیٹ</strong> — کلفٹن، بلاک 4۔ پیر/بدھ/جمعہ/ہفتہ صبح 9 سے شام 6 بجے۔ 18 اسٹال، ریٹنگ ⭐4.9';
    if (q.includes('fresh farm'))     return '🏪 <strong>فریش فارم شاپ</strong> — ڈی ایچ اے فیز 6۔ منگل/جمعرات/ہفتہ صبح 8 سے شام 5 بجے۔ 14 اسٹال، ریٹنگ ⭐4.8';
    if (q.includes('karachi fresh'))  return '🏪 <strong>کراچی فریش مارکیٹ</strong> — گلشن اقبال۔ پیر تا ہفتہ صبح 10 سے رات 8 بجے۔ 28 اسٹال، ریٹنگ ⭐4.7';
    if (q.includes('organic corner')) return '🏪 <strong>آرگینک کارنر</strong> — پی ای سی ایچ ایس، طارق روڈ کے قریب۔ جمعہ/ہفتہ/اتوار صبح 9 سے شام 7 بجے۔ ⭐4.9';
    if (q.includes('farmers fresh') || q.includes('farmers hub')) return '🏪 <strong>فارمرز فریش ہب</strong> — حیدری، نارتھ ناظم آباد۔ بدھ/ہفتہ/اتوار صبح 8 سے شام 4 بجے۔ ⭐4.8';
    if (q.includes('green roots'))    return '🏪 <strong>گرین روٹس مارکیٹ</strong> — ملیر ریور روڈ۔ جمعرات/اتوار صبح 8 سے شام 4 بجے۔ آج ہی تازہ فصل! ⭐4.7';

    // Areas
    if (q.includes('clifton') || q.includes('klifton')) return '📍 <strong>گرین باسکٹ مارکیٹ</strong> کلفٹن میں ہے۔ پیر/بدھ/جمعہ/ہفتہ، صبح 9 سے شام 6 بجے!';
    if (q.includes('dha'))            return '📍 <strong>فریش فارم شاپ</strong> ڈی ایچ اے فیز 6 میں ہے۔ منگل/جمعرات/ہفتہ، صبح 8 سے شام 5 بجے!';
    if (q.includes('gulshan'))        return '📍 <strong>کراچی فریش مارکیٹ</strong> گلشن اقبال میں ہے۔ ہفتے میں 6 دن کھلا، صبح 10 سے رات 8 بجے!';
    if (q.includes('pechs') || q.includes('tariq')) return '📍 <strong>آرگینک کارنر</strong> پی ای سی ایچ ایس، طارق روڈ کے قریب ہے۔ جمعہ/ہفتہ/اتوار، صبح 9 سے شام 7 بجے!';
    if (q.includes('malir'))          return '📍 <strong>گرین روٹس مارکیٹ</strong> ملیر ریور روڈ پر ہے۔ جمعرات اور اتوار، صبح 8 سے شام 4 بجے!';
    if (q.includes('nazimabad') || q.includes('hyderi') || q.includes('nazim')) return '📍 <strong>فارمرز فریش ہب</strong> حیدری، نارتھ ناظم آباد میں ہے۔ بدھ/ہفتہ/اتوار صبح 8 سے شام 4 بجے!';

    // Produce in Urdu
    if (q.includes('aam') || q.includes('mango'))   return '🥭 آم <strong>گرین باسکٹ مارکیٹ</strong> (کلفٹن) اور <strong>کراچی فریش مارکیٹ</strong> (گلشن) میں ملتے ہیں۔ موسم: مئی تا اگست!';
    if (q.includes('palak') || q.includes('spinach')) return '🥬 پالک <strong>گرین باسکٹ مارکیٹ</strong>، <strong>آرگینک کارنر</strong> اور <strong>گرین روٹس مارکیٹ</strong> میں ملتی ہے۔ موسم: اکتوبر تا مارچ۔';
    if (q.includes('tamatar') || q.includes('tomato')) return '🍅 ٹماٹر سارا سال ملتے ہیں — خاص طور پر <strong>گرین باسکٹ مارکیٹ</strong> اور <strong>فارمرز فریش ہب</strong> میں۔';
    if (q.includes('gajar') || q.includes('carrot')) return '🥕 گاجر <strong>فریش فارم شاپ</strong> (ڈی ایچ اے) میں نومبر تا مارچ ملتی ہے۔';
    if (q.includes('seb') || q.includes('apple'))   return '🍎 سیب <strong>فریش فارم شاپ</strong> (ڈی ایچ اے) میں اگست تا نومبر ملتے ہیں۔';
    if (q.includes('santra') || q.includes('orange') || q.includes('narangi')) return '🍊 سنترہ اور کھٹی <strong>کراچی فریش مارکیٹ</strong> (گلشن) میں نومبر تا فروری ملتے ہیں۔';
    if (q.includes('shehad') || q.includes('honey'))  return '🍯 شہد <strong>گرین باسکٹ مارکیٹ</strong> اور <strong>آرگینک کارنر</strong> (پی ای سی ایچ ایس) میں ملتا ہے۔';
    if (q.includes('podina') || q.includes('dhaniya') || q.includes('mint') || q.includes('herb')) return '🌿 پودینہ اور دھنیا سارا سال <strong>گرین روٹس مارکیٹ</strong> (ملیر) اور <strong>آرگینک کارنر</strong> میں ملتا ہے۔';
    if (q.includes('aloo') || q.includes('potato'))  return '🥔 آلو <strong>فریش فارم شاپ</strong> (ڈی ایچ اے) اور <strong>فارمرز فریش ہب</strong> (ناظم آباد) میں ملتے ہیں۔';
    if (q.includes('kela') || q.includes('banana'))  return '🍌 کیلا سارا سال <strong>کراچی فریش مارکیٹ</strong> (گلشن) میں ملتا ہے۔';
    if (q.includes('pyaz') || q.includes('onion') || q.includes('lahsan') || q.includes('garlic')) return '🧅 پیاز اور لہسن <strong>کراچی فریش مارکیٹ</strong> (گلشن) میں سارا سال ملتے ہیں۔';
    if (q.includes('anday') || q.includes('egg') || q.includes('dudh') || q.includes('milk') || q.includes('dairy')) return '🥚 فارم کے انڈے اور ڈیری <strong>گرین باسکٹ مارکیٹ</strong> (کلفٹن) اور <strong>فریش فارم شاپ</strong> (ڈی ایچ اے) میں ملتے ہیں۔';
    if (q.includes('amrood') || q.includes('guava'))  return '🍈 امرود <strong>فارمرز فریش ہب</strong> (ناظم آباد) میں موسمی طور پر ملتا ہے!';

    // Features in Urdu
    if (q.includes('organic') || q.includes('zehar') || q.includes('chemical')) return '🌱 <strong>آرگینک کارنر</strong> (پی ای سی ایچ ایس) مکمل طور پر کیڑے مار ادویات سے پاک ہے!';
    if (q.includes('map') || q.includes('jagah') || q.includes('rasta') || q.includes('kahan') || q.includes('location')) return '🗺️ ہوم یا مارکیٹس پیج پر <strong>انٹریکٹو میپ</strong> استعمال کریں۔ "Find Markets Near Me" بٹن سے GPS سے تلاش کریں!';
    if (q.includes('waqt') || q.includes('time') || q.includes('hours') || q.includes('timing') || q.includes('kab')) return '🕒 ہر مارکیٹ کارڈ پر اوقات کار درج ہیں۔ مکمل شیڈول کے لیے <strong>View Details</strong> پر کلک کریں!';
    if (q.includes('pasand') || q.includes('favorite') || q.includes('save') || q.includes('heart')) return '❤️ کسی بھی مارکیٹ کارڈ پر <strong>دل کا بٹن</strong> دبا کر پسندیدہ مارکیٹ محفوظ کریں!';
    if (q.includes('dark') || q.includes('raat') || q.includes('theme') || q.includes('rang')) return '🌙 نیویگیشن بار میں چاند 🌙 کا بٹن دبا کر <strong>ڈارک موڈ</strong> آن/آف کریں!';
    if (q.includes('contact') || q.includes('rabta') || q.includes('phone') || q.includes('number')) return '📞 <strong>Contact پیج</strong> پر جائیں۔ ای میل: hello@freshfind.example | پیر تا ہفتہ، صبح 9 سے شام 6 بجے۔';
    if (q.includes('newsletter') || q.includes('subscribe') || q.includes('update')) return '📧 نیچے اسکرول کریں اور <strong>Newsletter</strong> میں اپنا ای میل ڈالیں — ہفتہ وار اپڈیٹس پائیں!';
    if (q.includes('english') || q.includes('language') || q.includes('zaban')) return '🇬🇧 اوپر <strong>English</strong> بٹن دبائیں تاکہ انگریزی زبان میں جاسکیں!';

    // Greetings Urdu
    if (q.includes('salam') || q.includes('assalam') || q.includes('hello') || q.includes('hi') || q.includes('helo') || q.includes('adab')) return '👋 السلام علیکم! میں آپ کا FreshFind مددگار ہوں۔ مارکیٹ، سبزی پھل، اوقات، یا نقشے کے بارے میں پوچھیں!';
    if (q.includes('shukriya') || q.includes('shukria') || q.includes('thank') || q.includes('mehrbani')) return '🌱 بہت شکریہ! تازہ بازار سے لطف اٹھائیں۔ صحت مند رہیں! 💚';
    if (q.includes('bye') || q.includes('khuda hafiz') || q.includes('allah hafiz')) return '👋 اللہ حافظ! دوبارہ آئیں — تازہ پھل اور سبزیاں آپ کا انتظار کریں گی!';
    if (q.includes('kaisa') || q.includes('theek') || q.includes('how are')) return '😊 میں بالکل ٹھیک ہوں! آپ کی مدد کے لیے حاضر ہوں۔ کیا پوچھنا ہے؟';

    // Season query
    if (q.includes('mausam') || q.includes('season') || q.includes('abhi kya')) {
      var mo2 = new Date().toLocaleString('en-US', { month: 'long' });
      return '🌿 ابھی کا مہینہ: <strong>' + mo2 + '</strong>۔ پروڈیوس گائیڈ میں <em>"In Season Now"</em> والی چیزیں دیکھیں!';
    }

    // Default Urdu
    return '🤔 معاف کریں، میں سمجھ نہیں پایا۔ یہ پوچھنے کی کوشش کریں:<br>&bull; <em>"آج کون سا بازار کھلا ہے؟"</em><br>&bull; <em>"آم کہاں ملتا ہے؟"</em><br>&bull; <em>"گرین باسکٹ مارکیٹ کے اوقات"</em><br>&bull; <em>"نقشہ دکھاؤ"</em>';
  }

  // ── isOpenNow helper ───────────────────────────────────────
  function isOpenNow(market) {
    var now = new Date();
    var day = now.toLocaleDateString('en-US', { weekday: 'long' });
    if (!market.days || !market.days.includes(day)) return false;
    if (!market.time) return false;
    try {
      var parts = market.time.split(' - ');
      var o = parts[0].split(':').map(Number);
      var c = parts[1].split(':').map(Number);
      var cur = now.getHours() * 60 + now.getMinutes();
      return cur >= o[0] * 60 + o[1] && cur <= c[0] * 60 + c[1];
    } catch (e) { return false; }
  }

  // ── escapeHtml helper ──────────────────────────────────────
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c];
    });
  }

});
