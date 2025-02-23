// タブ切り替え機能
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // アクティブなタブを更新
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // タブコンテンツの表示を切り替え
    const tabId = tab.dataset.tab;
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
  });
});

// サイトブロッカー機能
document.getElementById('add-block').addEventListener('click', () => {
  const url = document.getElementById('block-url').value;
  if (url) {
    chrome.storage.sync.get(['blockedSites'], (result) => {
      const blockedSites = result.blockedSites || [];
      blockedSites.push(url);
      chrome.storage.sync.set({ blockedSites }, () => {
        updateBlockList();
        document.getElementById('block-url').value = '';
      });
    });
  }
});

function updateBlockList() {
  chrome.storage.sync.get(['blockedSites'], (result) => {
    const blockedSites = result.blockedSites || [];
    const blockList = document.getElementById('block-list');
    blockList.innerHTML = '';
    blockedSites.forEach((site, index) => {
      const div = document.createElement('div');
      div.textContent = site;
      const removeButton = document.createElement('button');
      removeButton.textContent = '削除';
      removeButton.onclick = () => {
        blockedSites.splice(index, 1);
        chrome.storage.sync.set({ blockedSites }, updateBlockList);
      };
      div.appendChild(removeButton);
      blockList.appendChild(div);
    });
  });
}

// タイマー機能
let timerInterval;
document.getElementById('start-timer').addEventListener('click', function() {
  const workTime = document.getElementById('work-time').value;
  const breakTime = document.getElementById('break-time').value;
  
  if (this.textContent === '開始') {
    startTimer(workTime * 60);
    this.textContent = '停止';
  } else {
    stopTimer();
    this.textContent = '開始';
  }
});

function startTimer(seconds) {
  const display = document.getElementById('timer-display');
  const endTime = Date.now() + seconds * 1000;

  function updateDisplay() {
    const remaining = Math.round((endTime - Date.now()) / 1000);
    if (remaining <= 0) {
      stopTimer();
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'assets/icon128.png',
        title: '時間です！',
        message: '休憩を取りましょう！'
      });
      return;
    }

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    display.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  updateDisplay();
  timerInterval = setInterval(updateDisplay, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  document.getElementById('timer-display').textContent = '';
  document.getElementById('start-timer').textContent = '開始';
}

// 環境音機能
let audioContext;
let audioBuffer;
let audioSource;

document.getElementById('play-sound').addEventListener('click', function() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  const soundType = document.getElementById('sound-type').value;
  const volume = document.getElementById('volume').value / 100;

  if (this.textContent === '再生') {
    playSound(soundType, volume);
    this.textContent = '停止';
  } else {
    stopSound();
    this.textContent = '再生';
  }
});

async function playSound(type, volume) {
  try {
    const response = await fetch(`assets/sounds/${type}.mp3`);
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioBuffer(arrayBuffer);
    
    audioSource = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    
    audioSource.buffer = audioBuffer;
    audioSource.loop = true;
    
    gainNode.gain.value = volume;
    
    audioSource.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    audioSource.start();
  } catch (error) {
    console.error('音声の再生に失敗しました:', error);
  }
}

function stopSound() {
  if (audioSource) {
    audioSource.stop();
    audioSource = null;
  }
}

// モチベーションメッセージ機能
document.getElementById('add-message').addEventListener('click', () => {
  const message = document.getElementById('message').value;
  if (message) {
    chrome.storage.sync.get(['messages'], (result) => {
      const messages = result.messages || [];
      messages.push(message);
      chrome.storage.sync.set({ messages }, () => {
        updateMessageList();
        document.getElementById('message').value = '';
      });
    });
  }
});

function updateMessageList() {
  chrome.storage.sync.get(['messages'], (result) => {
    const messages = result.messages || [];
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = '';
    messages.forEach((message, index) => {
      const div = document.createElement('div');
      div.textContent = message;
      const removeButton = document.createElement('button');
      removeButton.textContent = '削除';
      removeButton.onclick = () => {
        messages.splice(index, 1);
        chrome.storage.sync.set({ messages }, updateMessageList);
      };
      div.appendChild(removeButton);
      messageList.appendChild(div);
    });
  });
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  updateBlockList();
  updateMessageList();
}); 