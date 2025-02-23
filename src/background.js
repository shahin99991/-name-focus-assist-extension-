// サイトブロック機能の監視
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId === 0) {  // メインフレームのみを対象とする
    chrome.storage.sync.get(['blockedSites'], (result) => {
      const blockedSites = result.blockedSites || [];
      const url = new URL(details.url);
      
      if (blockedSites.some(site => url.hostname.includes(site))) {
        // ブロックされたサイトへのアクセスを検出
        chrome.tabs.update(details.tabId, {
          url: chrome.runtime.getURL('blocked.html')
        });
      }
    });
  }
});

// タイマー機能のバックグラウンド処理
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'workTimer') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'assets/icon128.png',
      title: '作業時間終了',
      message: '休憩を取りましょう！'
    });
  } else if (alarm.name === 'breakTimer') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'assets/icon128.png',
      title: '休憩時間終了',
      message: '作業を再開しましょう！'
    });
  }
});

// モチベーションメッセージの定期表示
function showRandomMotivationMessage() {
  chrome.storage.sync.get(['messages'], (result) => {
    const messages = result.messages || [];
    if (messages.length > 0) {
      const randomIndex = Math.floor(Math.random() * messages.length);
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'assets/icon128.png',
        title: 'モチベーションメッセージ',
        message: messages[randomIndex]
      });
    }
  });
}

// 30分ごとにメッセージを表示
chrome.alarms.create('motivationMessage', {
  periodInMinutes: 30
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'motivationMessage') {
    showRandomMotivationMessage();
  }
}); 