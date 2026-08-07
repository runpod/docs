# Runpodのドキュメントサイト

<!-- hy-mt2-i18n:start -->
[English](./README.md) | [中文](./README_zh-CN.md) | **日本語** | [Español](./README_es.md)
<!-- hy-mt2-i18n:end -->


このウェブサイトは[Mintlify](https://mintlify.com/)を使用して構築されています。

## 変更の公開

ドキュメントの変更を加えるにはプルリクエストを作成し、[@lavanya-gunreddi](https://github.com/lavanya-gunreddi) にレビューを依頼してください。変更内容が `main` ブランチにプッシュされると、自動的に本番環境にデプロイされます。

## ローカルでドキュメントを実行する

Mintlifyのインストール：

```shell
npm i -g mintlify
```

ブラウザでローカル開発サーバーを起動します：

```shell
mintlify dev
```

ほとんどの変更は、サーバーを再起動することなく即座に反映されます。

## リンティング

- [vale](https://vale.sh/docs/vale-cli/installation/) をインストールする  
- 特定のフォルダやファイルをチェックするには、次のコマンドを実行します：

```bash
vale path/to/docs/
# または
vale path/to/*.md
```

## Pythonコード例のフォーマット設定

`blacken-docs`をインストールしてください。

```bash
python3 -m pip install blacken-docs
```

フォーマッタを実行します。

```bash
yarn format
```

```bash
git ls-files -z -- '*.md' | xargs -0 blacken-docs
```

## CPUとGPUの更新

```bash
# 仮想環境の構築
python3 -m venv helpers/.venv
source helpers/.venv/bin/activate
pip install -r helpers/requirements.txt

# スクリプトの実行
python3 helpers/gpu_types.py
python3 helpers/sls_cpu_types.py
```

## エージェント体験テスト

`tests/TESTS.md` ファイルには、AIエージェントを用いたテストを通じてドキュメントの品質を検証するためのテスト定義が含まれています。これらのテストでは実際のユーザーからの入力をシミュレートし、コーディングエージェントは現在存在するドキュメントのみを利用して目的を達成しなければなりません。

### 必要条件

# 厳格な制約事項
1. **構造の維持**：元の Markdown のデータ構造、インデント、見出し階層、表、リンク、URL、バッジ、コードブロック、インラインコードを一切変更しないこと。
2. **選択的翻訳**：ユーザーに表示される可視的な自然言語コンテンツのみを翻訳すること。
3. **変更禁止**：コードタグ、キー名、変数プレースホルダー（{{var}}、${var}、%s、%d など）、コマンド例、ファイルパス、プロジェクト名、API名、パッケージ名、モデル名、識別子、コード記号を翻訳または変更することは**固く禁じられている**。背景情報に対応する訳名が既に記載されている場合を除く。
4. 用語、スタイル、専有名詞の翻訳は、提供された背景情報と一致させること。

### テストの実行

Claude Codeでは、自然言語を使ってください：

```
flash-quickstart テストを実行する
```

```
すべてのvLLMテストを実行する
```

未公開のドキュメント変更を検証するには、ローカルドキュメントモードを使用してください：

```
ローカルドキュメントを使用して vllm-deploy テストを実行する
```

Claudeは以下のように動作します：
1. `tests/TESTS.md`からテスト内容を読み込みます
2. ドキュメントのみを利用して目標を達成しようと試みます
3. 作成されたすべてのリソース（`doc_test_`で始まるもの）を削除します
4. `tests/reports/`にレポートを作成します
5. ドキュメントの改善点を提案します

### テストの定義

すべてのテストは、[`tests/TESTS.md`](tests/TESTS.md) 内の表として定義されています。

### 新規テストの追加

`tests/TESTS.md`の該当するセクションに次の情報を含む行を追加してください：
- **ID**: ユニークなテスト識別子
- **Goal**: ユーザーが何をしたいかを1文で記述したもの
- **Cleanup**: 削除すべきリソースの種類（`endpoints`、`pods`、`templates`、`network-volumes`、または`none`）

### レポート

テストレポートは `tests/reports/` に保存されます（gitignored）。その内容には以下が含まれます：
- うまく動作した部分と動作しなかった部分
- エージェントが行き詰まった箇所
- 具体的なドキュメント改善の提案
