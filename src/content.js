// ブロックされたサイトの警告メッセージを表示
function showBlockedWarning() {
  const warning = document.createElement('div');
  warning.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  `;

  const message = document.createElement('h1');
  message.textContent = 'このサイトはブロックされています';
  message.style.marginBottom = '20px';

  const subMessage = document.createElement('p');
  subMessage.textContent = '作業に集中するため、このサイトへのアクセスは制限されています。';

  const button = document.createElement('button');
  button.textContent = '戻る';
  button.style.cssText = `
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  `;
  button.onclick = () => {
    history.back();
  };

  warning.appendChild(message);
  warning.appendChild(subMessage);
  warning.appendChild(button);
  document.body.appendChild(warning);
}

// URLがブロックリストに含まれているか確認
chrome.storage.sync.get(['blockedSites'], (result) => {
  const blockedSites = result.blockedSites || [];
  const currentUrl = window.location.hostname;

  if (blockedSites.some(site => currentUrl.includes(site))) {
    showBlockedWarning();
  }
}); 