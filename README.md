# Focus Assist Chrome Extension

集中力を高め、生産性を向上させるためのChrome拡張機能です。

## 機能

- **サイトブロッカー**: 指定したウェブサイトへのアクセスをブロック
- **作業・休憩タイマー**: ポモドーロテクニックなどの時間管理をサポート
- **環境音再生**: 集中力を高めるための環境音を提供
- **モチベーションメッセージ**: 定期的にモチベーションを維持するメッセージを表示

## インストール方法

1. このリポジトリをクローンまたはダウンロード
```bash
git clone [repository-url]
```

2. 依存パッケージをインストール
```bash
npm install
```

3. 拡張機能をビルド
```bash
npm run build
```

4. Chrome拡張機能をインストール
   - Chromeブラウザで `chrome://extensions` を開く
   - 「デベロッパーモード」を有効にする
   - 「パッケージ化されていない拡張機能を読み込む」をクリック
   - ビルドされた `dist` ディレクトリを選択

## 使用方法

1. Chromeツールバーの拡張機能アイコンをクリック
2. 各機能を設定
   - ブロックしたいサイトのURLを追加
   - 作業時間と休憩時間を設定
   - 好みの環境音を選択
   - モチベーションメッセージを追加

## 開発

### 必要な環境

- Node.js (v14以上)
- npm (v6以上)

### 開発用コマンド

```bash
# 依存パッケージのインストール
npm install

# 開発モードでビルド（ファイル変更を監視）
npm run watch

# 本番用にビルド
npm run build
```

## ライセンス

MIT License

## 作者

[Your Name]

## 貢献

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成 