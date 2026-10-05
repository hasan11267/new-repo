document.addEventListener('DOMContentLoaded', () => {
  /*
   * ============================================================
   * FRESHFIND ASSISTANT
   * ============================================================
   *
   * This file is designed to work with the existing FreshFind
   * HTML and CSS without changing IDs, classes or terminology.
   *
   * Existing HTML connections preserved:
   *
   * #chatLauncher
   * #chatbot
   * #chatClose
   * #chatMessages
   * #chatForm
   * #chatInput
   * .quick-replies
   * .user-message
   * .bot-message
   * window.markets
   * isOpen()
   *
   * No HTML or CSS changes are required.
   */


  // ============================================================
  // EXISTING CHATBOT ELEMENTS
  // ============================================================

  const launcher = document.getElementById('chatLauncher');
  const bot = document.getElementById('chatbot');
  const close = document.getElementById('chatClose');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');


  // ============================================================
  // SAFETY CHECK
  // ============================================================

  if (!launcher || !bot || !close || !form || !input || !messages) {
    console.error(
      'FreshFind Assistant: Required chatbot HTML elements were not found.'
    );
    return;
  }


  // ============================================================
  // CHATBOT OPEN / CLOSE
  // ============================================================

  launcher.addEventListener('click', () => {
    bot.classList.toggle('open');

    if (bot.classList.contains('open')) {
      setTimeout(() => input.focus(), 100);
    }
  });

  close.addEventListener('click', () => {
    bot.classList.remove('open');
  });


  // ============================================================
  // EXISTING QUICK REPLIES
  // ============================================================

  document.querySelectorAll('.quick-replies button').forEach(button => {
    button.addEventListener('click', () => {
      const question = button.dataset.question;

      if (question) {
        ask(question);
      }
    });
  });


  // ============================================================
  // CHAT FORM
  // ============================================================

  form.addEventListener('submit', event => {
    event.preventDefault();

    const question = input.value.trim();

    if (!question) return;

    ask(question);

    input.value = '';
    input.focus();
  });


  // ============================================================
  // MAIN QUESTION HANDLER
  // ============================================================

  function ask(question) {

    addUserMessage(question);

    const answer = getAnswer(question);

    setTimeout(() => {
      addBotMessage(answer);
    }, 250);
  }


  // ============================================================
  // USER MESSAGE
  // ============================================================

  function addUserMessage(question) {

    messages.insertAdjacentHTML(
      'beforeend',
      `<div class="user-message">${escapeHtml(question)}</div>`
    );

    scrollMessages();
  }


  // ============================================================
  // BOT MESSAGE
  // ============================================================

  function addBotMessage(answer) {

    messages.insertAdjacentHTML(
      'beforeend',
      `<div class="bot-message">${answer}</div>`
    );

    scrollMessages();
  }


  // ============================================================
  // ANSWER SYSTEM
  // ============================================================

  function getAnswer(question) {

    const q = normalize(question);


    // ----------------------------------------------------------
    // GREETINGS
    // ----------------------------------------------------------

    if (matches(q, [
      'hello',
      'hi',
      'hey',
      'salam',
      'assalamualaikum',
      'assalam o alaikum',
      'good morning',
      'good afternoon',
      'good evening'
    ])) {

      return `
        Hello! 👋 Welcome to <strong>FreshFind</strong>.<br><br>

        I can help you discover markets around Karachi,
        check open or closed status, find produce, understand
        market hours, and use the map.<br><br>

        You can ask things like:
        <br>• Which markets are open today?
        <br>• Where can I find mangoes?
        <br>• What markets are near Gulshan?
        <br>• How do I use the map?
      `;
    }


    // ----------------------------------------------------------
    // THANK YOU
    // ----------------------------------------------------------

    if (matches(q, [
      'thank you',
      'thanks',
      'thank',
      'shukriya',
      'jazakallah'
    ])) {

      return `
        You're welcome! 🌿<br><br>
        If you need anything else, ask me about a
        <strong>market, product, area, opening time, or map</strong>.
      `;
    }


    // ----------------------------------------------------------
    // WHAT CAN YOU DO
    // ----------------------------------------------------------

    if (matches(q, [
      'what can you do',
      'what do you do',
      'how can you help',
      'help me',
      'help',
      'features'
    ])) {

      return `
        I can help you with:<br><br>

        📍 <strong>Nearby markets</strong><br>
        🟢 <strong>Open / closed status</strong><br>
        🥬 <strong>Produce and products</strong><br>
        🗺️ <strong>Interactive Map</strong><br>
        🕒 <strong>Market hours</strong><br>
        🔎 <strong>Website search guidance</strong><br>
        🏪 <strong>Market locations and areas</strong><br><br>

        If I don't have a specific answer, I'll point you
        toward the right FreshFind feature.
      `;
    }


    // ----------------------------------------------------------
    // WEBSITE NAVIGATION — HOME
    // ----------------------------------------------------------

    if (matches(q, [
      'home',
      'homepage',
      'main page',
      'go home',
      'where is home'
    ])) {

      scrollToSection('home');

      return `
        🏠 You're looking for the <strong>Home</strong> section.<br><br>

        The Home section has the main FreshFind search,
        the <strong>Find a Market</strong> button and
        <strong>Find Markets Near Me</strong> option.
      `;
    }


    // ----------------------------------------------------------
    // MARKET DIRECTORY
    // ----------------------------------------------------------

    if (matches(q, [
      'market directory',
      'market list',
      'list of markets',
      'all markets',
      'where are the markets',
      'market section',
      'find a market'
    ])) {

      scrollToSection('markets');

      return `
        🏪 The <strong>Market Directory</strong> is where you
        can browse the available FreshFind markets.<br><br>

        You can filter markets by:
        <br>• Search
        <br>• Area
        <br>• Day
        <br>• Open status / name sorting
        <br><br>

        You can also open individual market cards for
        more details.
      `;
    }


    // ----------------------------------------------------------
    // MAP NAVIGATION
    // ----------------------------------------------------------

    if (matches(q, [
      'map',
      'maps',
      'market map',
      'interactive map',
      'where is the map',
      'open map',
      'show map',
      'map section'
    ])) {

      scrollToSection('map-section');

      return `
        🗺️ The <strong>Interactive Market Map</strong> is in
        the Map section of FreshFind.<br><br>

        Market markers can show individual locations and
        details. You can also use <strong>Find Markets Near Me</strong>
        to work with your current location.
      `;
    }


    // ----------------------------------------------------------
    // MAP HOW-TO
    // ----------------------------------------------------------

    if (matches(q, [
      'how do i use the map',
      'how to use map',
      'how does the map work',
      'map help',
      'use map'
    ])) {

      scrollToSection('map-section');

      return `
        🗺️ <strong>Using the FreshFind map:</strong><br><br>

        1. Open the <strong>Interactive Market Map</strong>.<br>
        2. Look for market markers.<br>
        3. Click a marker to view market information.<br>
        4. Use <strong>Find Markets Near Me</strong> when you
        want to explore markets around your location.<br><br>

        If you don't want to use location services, you can
        simply explore the map markers manually.
      `;
    }


    // ----------------------------------------------------------
    // PRODUCE GUIDE
    // ----------------------------------------------------------

    if (matches(q, [
      'produce guide',
      'produce section',
      'seasonal produce',
      'seasonal guide',
      'where is produce',
      'produce'
    ])) {

      scrollToSection('produce');

      return `
        🥬 The <strong>Produce Guide</strong> shows seasonal
        produce information available through FreshFind.<br><br>

        You can use the category filter to browse different
        types of produce.
      `;
    }


    // ----------------------------------------------------------
    // ABOUT
    // ----------------------------------------------------------

    if (matches(q, [
      'about',
      'about freshfind',
      'what is freshfind',
      'what is this website',
      'about website'
    ])) {

      scrollToSection('about');

      return `
        🌿 <strong>FreshFind</strong> is a browser-based project
        designed to make local food discovery easier.<br><br>

        It brings together market locations, schedules and
        seasonal produce information in one place.
      `;
    }


    // ----------------------------------------------------------
    // CONTACT
    // ----------------------------------------------------------

    if (matches(q, [
      'contact',
      'contact us',
      'email',
      'phone',
      'contact information'
    ])) {

      scrollToSection('contact');

      return `
        📞 You can find the FreshFind contact information
        in the <strong>Contact Us</strong> section at the bottom
        of the website.<br><br>

        The project currently displays:
        <br>• Email
        <br>• Phone
        <br>• Service hours
      `;
    }


    // ----------------------------------------------------------
    // NEARBY / NEAR ME
    // ----------------------------------------------------------

    if (matches(q, [
      'near me',
      'nearby',
      'nearest market',
      'nearest markets',
      'markets near me',
      'shops near me',
      'market close to me',
      'markets close to me',
      'around me',
      'around here'
    ])) {

      return `
        📍 To find markets near you, use
        <strong>Find Markets Near Me</strong> on the FreshFind
        Home section.<br><br>

        You can also use the <strong>Interactive Market Map</strong>
        to explore market locations manually.<br><br>

        FreshFind's demonstration data focuses on
        <strong>Karachi</strong>.
      `;
    }


    // ----------------------------------------------------------
    // KARACHI AREAS
    // ----------------------------------------------------------

    const areaAnswer = getAreaAnswer(q);

    if (areaAnswer) {
      return areaAnswer;
    }


    // ----------------------------------------------------------
    // OPEN MARKETS
    // ----------------------------------------------------------

    if (matches(q, [
      'open markets',
      'market open',
      'markets open',
      'open now',
      'open today',
      'which markets are open',
      'what markets are open',
      'currently open',
      'open right now',
      'shops open',
      'which shops are open'
    ])) {

      return getOpenMarketsAnswer();
    }


    // ----------------------------------------------------------
    // CLOSED MARKETS
    // ----------------------------------------------------------

    if (matches(q, [
      'closed markets',
      'market closed',
      'markets closed',
      'which markets are closed',
      'what markets are closed',
      'closed now',
      'shops closed'
    ])) {

      return getClosedMarketsAnswer();
    }


    // ----------------------------------------------------------
    // MARKET STATUS
    // ----------------------------------------------------------

    if (matches(q, [
      'status',
      'market status',
      'shop status',
      'is it open',
      'is the market open',
      'is this market open',
      'open or closed'
    ])) {

      return `
        🟢 <strong>Checking market status</strong><br><br>

        FreshFind shows market status through the market
        directory and individual market cards.<br><br>

        Use the <strong>Sort: Open Status</strong> option in
        the Market Directory to organize markets by status.
      `;
    }


    // ----------------------------------------------------------
    // HOURS / TIMINGS
    // ----------------------------------------------------------

    if (matches(q, [
      'hours',
      'hour',
      'timing',
      'timings',
      'opening hours',
      'opening time',
      'closing time',
      'what time does it open',
      'what time does it close',
      'when does it open',
      'when does it close',
      'schedule',
      'market schedule'
    ])) {

      return `
        🕒 Market operating information is shown on the
        individual market listings.<br><br>

        Go to the <strong>Market Directory</strong>, choose a
        market, and check its operating schedule.<br><br>

        You can also use the <strong>Day</strong> filter to
        find markets associated with a particular day.
      `;
    }


    // ----------------------------------------------------------
    // SEARCH GUIDANCE
    // ----------------------------------------------------------

    if (matches(q, [
      'search',
      'search bar',
      'how do i search',
      'how to search',
      'what can i search',
      'search products',
      'search market',
      'search markets'
    ])) {

      return `
        🔎 <strong>FreshFind Search</strong><br><br>

        You can search the Market Directory for:
        <br>• Market names
        <br>• Produce
        <br>• Market-related terms
        <br><br>

        You can also use the filters for
        <strong>Area</strong>, <strong>Day</strong> and
        <strong>Open Status</strong>.
      `;
    }


    // ----------------------------------------------------------
    // PRODUCTS
    // ----------------------------------------------------------

    const productAnswer = getProductAnswer(q);

    if (productAnswer) {
      return productAnswer;
    }


    // ----------------------------------------------------------
    // PRODUCT CATEGORY QUESTIONS
    // ----------------------------------------------------------

    if (matches(q, [
      'vegetables',
      'vegetable',
      'fruits',
      'fruit',
      'greens',
      'green vegetables',
      'herbs',
      'fresh food',
      'fresh foods'
    ])) {

      return `
        🥬 FreshFind's <strong>Produce Guide</strong> is the
        best place to explore seasonal produce information.<br><br>

        Open the <strong>Produce Guide</strong> and use its
        category filter to browse available items.<br><br>

        You can also search for a specific product in the
        <strong>Market Directory</strong>.
      `;
    }


    // ----------------------------------------------------------
    // MANGO
    // ----------------------------------------------------------

    if (matches(q, [
      'mango',
      'mangoes',
      'mango market',
      'where can i buy mangoes',
      'where can i find mangoes'
    ])) {

      return `
        🥭 <strong>Mangoes</strong> are included in the
        FreshFind demonstration produce information.<br><br>

        Try searching <strong>Mangoes</strong> in the
        Market Directory to find matching market listings.<br><br>

        You can also check the <strong>Produce Guide</strong>
        for seasonal information.
      `;
    }


    // ----------------------------------------------------------
    // SPINACH
    // ----------------------------------------------------------

    if (matches(q, [
      'spinach',
      'spinach market',
      'where can i find spinach',
      'where can i buy spinach'
    ])) {

      return `
        🥬 <strong>Spinach</strong> is included in the
        FreshFind demonstration produce data.<br><br>

        Search for <strong>Spinach</strong> in the Market
        Directory or open the <strong>Produce Guide</strong>
        for seasonal information.
      `;
    }


    // ----------------------------------------------------------
    // TOMATOES
    // ----------------------------------------------------------

    if (matches(q, [
      'tomato',
      'tomatoes',
      'tomato market',
      'where can i find tomatoes'
    ])) {

      return `
        🍅 <strong>Tomatoes</strong> are a useful product to
        search for in the FreshFind Market Directory.<br><br>

        If a matching listing is available, the directory
        will show the relevant market information.
      `;
    }


    // ----------------------------------------------------------
    // POTATOES
    // ----------------------------------------------------------

    if (matches(q, [
      'potato',
      'potatoes',
      'potato market',
      'where can i find potatoes'
    ])) {

      return `
        🥔 Try searching <strong>Potatoes</strong> in the
        Market Directory.<br><br>

        You can also browse the <strong>Produce Guide</strong>
        for related produce information.
      `;
    }


    // ----------------------------------------------------------
    // ONIONS
    // ----------------------------------------------------------

    if (matches(q, [
      'onion',
      'onions',
      'onion market',
      'where can i find onions'
    ])) {

      return `
        🧅 Try searching <strong>Onions</strong> in the
        Market Directory.<br><br>

        If you don't see a matching result, check another
        market or use the Interactive Market Map.
      `;
    }


    // ----------------------------------------------------------
    // BANANAS
    // ----------------------------------------------------------

    if (matches(q, [
      'banana',
      'bananas',
      'banana market',
      'where can i find bananas'
    ])) {

      return `
        🍌 Try searching <strong>Bananas</strong> in the
        Market Directory.<br><br>

        You can also use the Produce Guide to explore
        seasonal produce information.
      `;
    }


    // ----------------------------------------------------------
    // APPLES
    // ----------------------------------------------------------

    if (matches(q, [
      'apple',
      'apples',
      'apple market',
      'where can i find apples'
    ])) {

      return `
        🍎 Try searching <strong>Apples</strong> in the
        Market Directory.<br><br>

        FreshFind uses demonstration market data, so if no
        listing appears, try another product or market.
      `;
    }


    // ----------------------------------------------------------
    // LETTUCE
    // ----------------------------------------------------------

    if (matches(q, [
      'lettuce',
      'lettuce market',
      'where can i find lettuce'
    ])) {

      return `
        🥬 Try searching <strong>Lettuce</strong> in the
        Market Directory or browse the <strong>Produce Guide</strong>.
      `;
    }


    // ----------------------------------------------------------
    // CORIANDER / CILANTRO
    // ----------------------------------------------------------

    if (matches(q, [
      'coriander',
      'cilantro',
      'dhania',
      'dhaniya'
    ])) {

      return `
        🌿 <strong>Coriander / Dhania</strong> can be searched
        directly in the Market Directory.<br><br>

        You can also check the Produce Guide for herbs and
        seasonal information.
      `;
    }


    // ----------------------------------------------------------
    // POTENTIAL MARKET NAMES
    // ----------------------------------------------------------

    const marketAnswer = findMarketByName(q);

    if (marketAnswer) {
      return marketAnswer;
    }


    // ----------------------------------------------------------
    // KARACHI LOCATION QUESTIONS
    // ----------------------------------------------------------

    if (matches(q, [
      'karachi',
      'in karachi',
      'karachi markets',
      'markets in karachi',
      'shops in karachi'
    ])) {

      return `
        📍 FreshFind is configured as a <strong>Karachi-focused
        demonstration project</strong>.<br><br>

        You can explore market locations through the
        <strong>Market Directory</strong> or
        <strong>Interactive Market Map</strong>.<br><br>

        Try asking about an area such as
        <strong>Gulshan</strong>, <strong>Clifton</strong>,
        <strong>DHA</strong>, <strong>North Nazimabad</strong>
        or <strong>Bahadurabad</strong>.
      `;
    }


    // ----------------------------------------------------------
    // LOGIN
    // ----------------------------------------------------------

    if (matches(q, [
      'login',
      'log in',
      'sign in',
      'account'
    ])) {

      return `
        🔐 The <strong>Login</strong> option is available in
        the FreshFind navigation bar.<br><br>

        Select <strong>Login</strong> at the top of the page
        to access the project's login interface.
      `;
    }


    // ----------------------------------------------------------
    // RESET / CLEAR FILTERS
    // ----------------------------------------------------------

    if (matches(q, [
      'clear filters',
      'reset filters',
      'remove filters',
      'reset search'
    ])) {

      return `
        🔄 If your Market Directory results are filtered,
        use the <strong>Clear Filters</strong> button above
        the market listings.
      `;
    }


    // ----------------------------------------------------------
    // THANKS / BYE
    // ----------------------------------------------------------

    if (matches(q, [
      'bye',
      'goodbye',
      'see you'
    ])) {

      return `
        Goodbye! 🌿<br><br>
        FreshFind will be here whenever you need to find
        a market or fresh produce.
      `;
    }


    // ----------------------------------------------------------
    // SMART FALLBACK
    // ----------------------------------------------------------

    return getSmartFallback(q);
  }


  // ============================================================
  // KARACHI AREA GUIDE
  // ============================================================

  function getAreaAnswer(q) {

    const areas = {

      'gulshan': {
        name: 'Gulshan-e-Iqbal',
        nearby: 'Gulshan-e-Iqbal',
        guide: 'Use the Area filter in the Market Directory or open the Interactive Market Map to explore listings around Gulshan-e-Iqbal.'
      },

      'gulshan e iqbal': {
        name: 'Gulshan-e-Iqbal',
        nearby: 'Gulshan-e-Iqbal',
        guide: 'Use the Area filter in the Market Directory or open the Interactive Market Map to explore listings around Gulshan-e-Iqbal.'
      },

      'clifton': {
        name: 'Clifton',
        nearby: 'Clifton',
        guide: 'Search Clifton in the Market Directory or explore the map for market markers in this area.'
      },

      'dha': {
        name: 'DHA Karachi',
        nearby: 'DHA Karachi',
        guide: 'Use the Market Directory search or Interactive Market Map to explore FreshFind listings around DHA.'
      },

      'defence': {
        name: 'DHA Karachi',
        nearby: 'DHA Karachi',
        guide: 'DHA is commonly referred to as Defence. Try searching either term in the website.'
      },

      'bahadurabad': {
        name: 'Bahadurabad',
        nearby: 'Bahadurabad',
        guide: 'Search Bahadurabad in the Market Directory or use the map to explore nearby listings.'
      },

      'north nazimabad': {
        name: 'North Nazimabad',
        nearby: 'North Nazimabad',
        guide: 'Use the Area filter or map to explore FreshFind market listings around North Nazimabad.'
      },

      'nazimabad': {
        name: 'Nazimabad',
        nearby: 'Nazimabad',
        guide: 'Search Nazimabad in the Market Directory to see matching listings.'
      },

      'pechs': {
        name: 'PECHS',
        nearby: 'PECHS',
        guide: 'Try PECHS in the Market Directory or explore the Interactive Market Map.'
      },

      'korangi': {
        name: 'Korangi',
        nearby: 'Korangi',
        guide: 'Use the Area filter or search Korangi in the Market Directory.'
      },

      'malir': {
        name: 'Malir',
        nearby: 'Malir',
        guide: 'Search Malir in the Market Directory or use the Interactive Market Map.'
      },

      'saddar': {
        name: 'Saddar',
        nearby: 'Saddar',
        guide: 'Search Saddar in the Market Directory to explore relevant listings.'
      },

      'north karachi': {
        name: 'North Karachi',
        nearby: 'North Karachi',
        guide: 'Use the Market Directory search or Area filter for North Karachi.'
      },

      'fb area': {
        name: 'Federal B Area',
        nearby: 'Federal B Area',
        guide: 'Search Federal B Area or FB Area in the Market Directory.'
      },

      'federal b area': {
        name: 'Federal B Area',
        nearby: 'Federal B Area',
        guide: 'Search Federal B Area in the Market Directory or explore the map.'
      },

      'johar': {
        name: 'Gulistan-e-Johar',
        nearby: 'Gulistan-e-Johar',
        guide: 'Try Gulistan-e-Johar in the Market Directory or map.'
      },

      'gulistan e johar': {
        name: 'Gulistan-e-Johar',
        nearby: 'Gulistan-e-Johar',
        guide: 'Try Gulistan-e-Johar in the Market Directory or map.'
      },

      'orangi': {
        name: 'Orangi Town',
        nearby: 'Orangi Town',
        guide: 'Search Orangi Town in the Market Directory.'
      },

      'liaquatabad': {
        name: 'Liaquatabad',
        nearby: 'Liaquatabad',
        guide: 'Use the Market Directory search to check listings around Liaquatabad.'
      },

      'tariq road': {
        name: 'Tariq Road',
        nearby: 'Tariq Road / PECHS',
        guide: 'Search Tariq Road or PECHS in the Market Directory to explore nearby listings.'
      },

      'zamzama': {
        name: 'Zamzama',
        nearby: 'Zamzama / DHA',
        guide: 'Try searching Zamzama or DHA in the Market Directory and check the map for nearby markers.'
      }
    };


    for (const key in areas) {

      if (q.includes(key)) {

        const area = areas[key];

        return `
          📍 <strong>${escapeHtml(area.name)}</strong><br><br>

          FreshFind can help you explore market listings
          around <strong>${escapeHtml(area.nearby)}</strong>.<br><br>

          ${escapeHtml(area.guide)}<br><br>

          You can also use <strong>Find Markets Near Me</strong>
          if you want to explore markets based on your location.
        `;
      }
    }

    return null;
  }


  // ============================================================
  // OPEN MARKET STATUS
  // ============================================================

  function getOpenMarketsAnswer() {

    const markets = getMarkets();

    if (!markets.length) {

      return `
        🟢 I don't have the market records available right now.<br><br>

        You can still check the <strong>Market Directory</strong>
        and use <strong>Sort: Open Status</strong> to organize
        the available listings.
      `;
    }


    if (typeof isOpen !== 'function') {

      return `
        🕒 FreshFind's market status is handled by the
        website's market schedule data.<br><br>

        Open the <strong>Market Directory</strong> and use
        <strong>Sort: Open Status</strong> to check listings.
      `;
    }


    const openMarkets = markets.filter(market => {

      try {
        return isOpen(market);
      } catch (error) {
        return false;
      }

    });


    if (!openMarkets.length) {

      return `
        🔴 There are no markets currently showing as open
        in the available demonstration data.<br><br>

        Check the <strong>Market Directory</strong> for each
        market's regular schedule or use the
        <strong>Interactive Market Map</strong>.
      `;
    }


    const list = openMarkets
      .slice(0, 8)
      .map(market => `
        <li>
          <strong>${escapeHtml(market.name || 'Market')}</strong>
          ${market.area ? ` — ${escapeHtml(market.area)}` : ''}
        </li>
      `)
      .join('');


    return `
      🟢 <strong>Markets currently showing as open:</strong>
      <ul style="padding-left:18px;margin:8px 0;">
        ${list}
      </ul>

      Open a market listing for more information about
      its location and schedule.
    `;
  }


  // ============================================================
  // CLOSED MARKET STATUS
  // ============================================================

  function getClosedMarketsAnswer() {

    const markets = getMarkets();

    if (!markets.length || typeof isOpen !== 'function') {

      return `
        🔴 I can't calculate the closed listings from the
        current market data right now.<br><br>

        Check the <strong>Market Directory</strong> for
        individual market schedules.
      `;
    }


    const closedMarkets = markets.filter(market => {

      try {
        return !isOpen(market);
      } catch (error) {
        return false;
      }

    });


    if (!closedMarkets.length) {

      return `
        🟢 No markets are currently being reported as closed
        in the available demonstration data.
      `;
    }


    const list = closedMarkets
      .slice(0, 8)
      .map(market => `
        <li>
          <strong>${escapeHtml(market.name || 'Market')}</strong>
          ${market.area ? ` — ${escapeHtml(market.area)}` : ''}
        </li>
      `)
      .join('');


    return `
      🔴 <strong>Markets currently showing as closed:</strong>
      <ul style="padding-left:18px;margin:8px 0;">
        ${list}
      </ul>

      Opening hours can vary by day, so check the individual
      market listing for its schedule.
    `;
  }


  // ============================================================
  // PRODUCT INFORMATION
  // ============================================================

  function getProductAnswer(q) {

    const products = {

      mango: {
        name: 'Mangoes',
        emoji: '🥭',
        season: 'Summer',
        advice:
          'Try searching Mangoes in the Market Directory. You can also check the Produce Guide for seasonal information.'
      },

      mangoes: {
        name: 'Mangoes',
        emoji: '🥭',
        season: 'Summer',
        advice:
          'Try searching Mangoes in the Market Directory. You can also check the Produce Guide for seasonal information.'
      },

      spinach: {
        name: 'Spinach',
        emoji: '🥬',
        season: 'Cooler months',
        advice:
          'Search Spinach in the Market Directory or browse the Produce Guide for seasonal information.'
      },

      tomato: {
        name: 'Tomatoes',
        emoji: '🍅',
        season: 'Common produce',
        advice:
          'Search Tomatoes in the Market Directory to check available listings.'
      },

      tomatoes: {
        name: 'Tomatoes',
        emoji: '🍅',
        season: 'Common produce',
        advice:
          'Search Tomatoes in the Market Directory to check available listings.'
      },

      potato: {
        name: 'Potatoes',
        emoji: '🥔',
        season: 'Common produce',
        advice:
          'Try searching Potatoes in the Market Directory.'
      },

      potatoes: {
        name: 'Potatoes',
        emoji: '🥔',
        season: 'Common produce',
        advice:
          'Try searching Potatoes in the Market Directory.'
      },

      onion: {
        name: 'Onions',
        emoji: '🧅',
        season: 'Common produce',
        advice:
          'Search Onions in the Market Directory or check individual market listings.'
      },

      onions: {
        name: 'Onions',
        emoji: '🧅',
        season: 'Common produce',
        advice:
          'Search Onions in the Market Directory or check individual market listings.'
      },

      banana: {
        name: 'Bananas',
        emoji: '🍌',
        season: 'Common produce',
        advice:
          'Search Bananas in the Market Directory.'
      },

      bananas: {
        name: 'Bananas',
        emoji: '🍌',
        season: 'Common produce',
        advice:
          'Search Bananas in the Market Directory.'
      },

      apple: {
        name: 'Apples',
        emoji: '🍎',
        season: 'Seasonal',
        advice:
          'Search Apples in the Market Directory. If there is no matching listing, try another market or product.'
      },

      apples: {
        name: 'Apples',
        emoji: '🍎',
        season: 'Seasonal',
        advice:
          'Search Apples in the Market Directory. If there is no matching listing, try another market or product.'
      },

      lettuce: {
        name: 'Lettuce',
        emoji: '🥬',
        season: 'Cooler months',
        advice:
          'Search Lettuce in the Market Directory or browse the Produce Guide.'
      },

      cucumber: {
        name: 'Cucumber',
        emoji: '🥒',
        season: 'Common seasonal produce',
        advice:
          'Search Cucumber in the Market Directory.'
      },

      cucumbers: {
        name: 'Cucumbers',
        emoji: '🥒',
        season: 'Common seasonal produce',
        advice:
          'Search Cucumbers in the Market Directory.'
      },

      carrot: {
        name: 'Carrots',
        emoji: '🥕',
        season: 'Cooler months',
        advice:
          'Search Carrots in the Market Directory or check the Produce Guide.'
      },

      carrots: {
        name: 'Carrots',
        emoji: '🥕',
        season: 'Cooler months',
        advice:
          'Search Carrots in the Market Directory or check the Produce Guide.'
      },

      lemon: {
        name: 'Lemons',
        emoji: '🍋',
        season: 'Common produce',
        advice:
          'Search Lemons in the Market Directory.'
      },

      lemons: {
        name: 'Lemons',
        emoji: '🍋',
        season: 'Common produce',
        advice:
          'Search Lemons in the Market Directory.'
      },

      coriander: {
        name: 'Coriander',
        emoji: '🌿',
        season: 'Herb',
        advice:
          'Search Coriander in the Market Directory or browse the Produce Guide.'
      },

      dhania: {
        name: 'Coriander / Dhania',
        emoji: '🌿',
        season: 'Herb',
        advice:
          'Search Dhania or Coriander in the Market Directory.'
      },

      mint: {
        name: 'Mint',
        emoji: '🌿',
        season: 'Herb',
        advice:
          'Search Mint in the Market Directory or check the Produce Guide.'
      },

      garlic: {
        name: 'Garlic',
        emoji: '🧄',
        season: 'Common produce',
        advice:
          'Search Garlic in the Market Directory.'
      },

      ginger: {
        name: 'Ginger',
        emoji: '🫚',
        season: 'Common produce',
        advice:
          'Search Ginger in the Market Directory.'
      },

      peas: {
        name: 'Peas',
        emoji: '🫛',
        season: 'Cooler months',
        advice:
          'Search Peas in the Market Directory or browse the Produce Guide.'
      },

      cauliflower: {
        name: 'Cauliflower',
        emoji: '🥦',
        season: 'Cooler months',
        advice:
          'Search Cauliflower in the Market Directory.'
      },

      cabbage: {
        name: 'Cabbage',
        emoji: '🥬',
        season: 'Cooler months',
        advice:
          'Search Cabbage in the Market Directory.'
      },

      okra: {
        name: 'Okra / Bhindi',
        emoji: '🥬',
        season: 'Warm season',
        advice:
          'Search Okra or Bhindi in the Market Directory.'
      },

      bhindi: {
        name: 'Okra / Bhindi',
        emoji: '🥬',
        season: 'Warm season',
        advice:
          'Search Bhindi or Okra in the Market Directory.'
      }
    };


    for (const key in products) {

      if (q.includes(key)) {

        const product = products[key];

        return `
          ${product.emoji}
          <strong>${escapeHtml(product.name)}</strong><br><br>

          Typical guide: <strong>${escapeHtml(product.season)}</strong>.<br><br>

          ${escapeHtml(product.advice)}<br><br>

          If you don't see a matching market, try another
          market, use the <strong>Area filter</strong>, or
          explore the <strong>Interactive Market Map</strong>.
        `;
      }
    }

    return null;
  }


  // ============================================================
  // MARKET NAME SEARCH
  // ============================================================

  function findMarketByName(q) {

    const markets = getMarkets();

    if (!markets.length) return null;


    const market = markets.find(item => {

      if (!item || !item.name) return false;

      return q.includes(
        String(item.name).toLowerCase()
      );

    });


    if (!market) return null;


    let status = 'Status is available in the market listing.';

    if (typeof isOpen === 'function') {

      try {
        status = isOpen(market)
          ? '🟢 This market is currently showing as open.'
          : '🔴 This market is currently showing as closed.';
      } catch (error) {
        status = 'Check the market listing for its current schedule.';
      }
    }


    return `
      🏪 <strong>${escapeHtml(market.name)}</strong><br><br>

      ${status}<br><br>

      ${market.area
        ? `📍 Area: <strong>${escapeHtml(market.area)}</strong><br><br>`
        : ''
      }

      Open the market card in the
      <strong>Market Directory</strong> for more information.
    `;
  }


  // ============================================================
  // SMART FALLBACK
  // ============================================================

  function getSmartFallback(q) {

    /*
     * Product-like words
     */

    const productWords = [
      'buy',
      'find',
      'sell',
      'selling',
      'available',
      'available at',
      'where',
      'looking for'
    ];


    if (productWords.some(word => q.includes(word))) {

      return `
        🔎 I can help you look for that.<br><br>

        Try entering the <strong>market or product name</strong>
        in the Market Directory search.<br><br>

        If you're looking for a location, try:
        <br>• Gulshan-e-Iqbal
        <br>• Gulistan-e-Johar
        <br>• Clifton
        <br>• DHA
        <br>• Bahadurabad
        <br>• North Nazimabad
        <br><br>

        You can also use the <strong>Interactive Market Map</strong>
        to explore locations.
      `;
    }


    /*
     * Location-like questions
     */

    if (
      q.includes('where') ||
      q.includes('location') ||
      q.includes('place')
    ) {

      return `
        📍 I can help you find locations through FreshFind.<br><br>

        Try asking:
        <br>• “Markets near me”
        <br>• “Markets in Gulshan”
        <br>• “Markets in Clifton”
        <br>• “Where is the market map?”
        <br><br>

        You can also open the <strong>Interactive Market Map</strong>
        and explore the available markers.
      `;
    }


    /*
     * Status-like questions
     */

    if (
      q.includes('when') ||
      q.includes('today') ||
      q.includes('now')
    ) {

      return `
        🕒 If you're checking market timing or status,
        try asking <strong>“Which markets are open today?”</strong>
        or <strong>“What are the market hours?”</strong>.<br><br>

        You can also use <strong>Sort: Open Status</strong>
        in the Market Directory.
      `;
    }


    /*
     * General fallback
     */

    return `
      I'm not sure I understood that yet, but I can still
      point you in the right direction. 🌿<br><br>

      <strong>Try asking me:</strong>
      <br>📍 “Which markets are near me?”
      <br>🟢 “Which markets are open today?”
      <br>🥭 “Where can I find mangoes?”
      <br>🥬 “Where can I find spinach?”
      <br>🗺️ “How do I use the map?”
      <br>🕒 “What are the market hours?”
      <br>🔎 “How do I search for a market?”
      <br>📍 “Markets in Gulshan”
      <br>📍 “Markets in Clifton”
      <br><br>

      Or use the <strong>Market Directory</strong>,
      <strong>Produce Guide</strong>, or
      <strong>Interactive Market Map</strong> directly.
    `;
  }


  // ============================================================
  // NORMALIZE QUESTION
  // ============================================================

  function normalize(text) {

    return String(text)
      .toLowerCase()
      .replace(/[?!.;,]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }


  // ============================================================
  // KEYWORD MATCHING
  // ============================================================

  function matches(text, keywords) {

    return keywords.some(keyword => {
      return text.includes(keyword.toLowerCase());
    });
  }


  // ============================================================
  // SAFE MARKET DATA
  // ============================================================

  function getMarkets() {

    if (!Array.isArray(window.markets)) {
      return [];
    }

    return window.markets;
  }


  // ============================================================
  // WEBSITE NAVIGATION
  // ============================================================

  function scrollToSection(sectionId) {

    const section = document.getElementById(sectionId);

    if (!section) return;

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }


  // ============================================================
  // SCROLL CHAT
  // ============================================================

  function scrollMessages() {

    messages.scrollTop = messages.scrollHeight;
  }


  // ============================================================
  // HTML ESCAPE
  // ============================================================

  function escapeHtml(value) {

    return String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[character]));
  }

});
