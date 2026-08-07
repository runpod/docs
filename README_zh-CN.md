# Runpod 文档网站

<!-- hy-mt2-i18n:start -->
[English](./README.md) | **中文** | [日本語](./README_ja.md) | [Español](./README_es.md)
<!-- hy-mt2-i18n:end -->


该网站是使用[Mintlify](https://mintlify.com/)构建的。

## 发布变更

创建一个拉取请求来提交文档修改内容，并向[@lavanya-gunreddi](https://github.com/lavanya-gunreddi)请求审核。一旦这些修改被推送到`main`分支，就会自动部署到生产环境。

## 在本地运行文档服务器

安装 Mintlify：

```shell
npm i -g mintlify
```

在浏览器中启动本地开发服务器：

```shell
mintlify dev
```

大多数更改都无需重启服务器即可实时生效。

## 代码检查

- 安装 [vale](https://vale.sh/docs/vale-cli/installation/)  
- 要对特定文件夹或文件进行代码检查，请运行：

```bash
vale /路径/to/docs/
# 或
vale /路径/to/*.md
```

## 格式化 Python 代码示例

安装 `blacken-docs`。

```bash
python3 -m pip install blacken-docs
```

运行格式化工具。

```bash
yarn format
```

```bash
git ls-files -z -- '*.md' | xargs -0 blacken-docs
```

## 更新 CPU 和 GPU 驱动

```bash
# 设置虚拟环境
python3 -m venv helpers/.venv
source helpers/.venv/bin/activate
pip install -r helpers/requirements.txt

# 运行脚本
python3 helpers/gpu_types.py
python3 helpers/sls_cpu_types.py
```

## 智能体体验测试

`tests/TESTS.md` 文件中包含了通过 AI 智能体测试来验证文档质量的测试定义。这些测试会模拟真实用户的提示——编码智能体必须仅依据现有的文档来完成目标。

### 要求条件

- 已配置 Runpod MCP 服务器的 [Claude Code](https://docs.anthropic.com/en/docs/claude-code)：
  ```bash
  # 添加 Runpod API MCP 服务器
  claude mcp add runpod --scope user -e RUNPOD_API_KEY=your_key -- npx -y @runpod/mcp-server@latest

  # 添加 Runpod Docs MCP 服务器
  claude mcp add runpod-docs --scope user --transport http https://docs.runpod.io/mcp
  ```

### 运行测试

在 Claude Code 中，使用自然语言输入即可：

运行 flash-quickstart 测试

```
运行所有 vLLM 测试
```

要验证未发布的文档更改，可使用本地文档模式：

```
使用本地文档运行 vllm-deploy 测试
```

Claude 将会：
1. 从 `tests/TESTS.md` 中读取测试用例
2. 仅使用文档中的信息尝试实现目标
3. 清理所有已创建的资源（这些资源的名称以 `doc_test_` 为前缀）
4. 将报告写入 `tests/reports/` 目录
5. 提出文档改进建议

### 测试定义

所有测试均以表格形式定义在[`tests/TESTS.md`](tests/TESTS.md)中。

### 添加新测试

在 `tests/TESTS.md` 的相应部分添加一行，内容包含：
- **ID**：唯一的测试标识符
- **Goal**：用一句话描述用户的期望目标
- **Cleanup**：需要删除的资源类型（`endpoints`、`pods`、`templates`、`network-volumes` 或 `none`）

### 报告

测试报告会被保存到 `tests/reports/` 目录中（该目录已设置为 gitignored），内容包括：
- 哪些部分正常运行，哪些没有
- 智能体在何处卡住了
- 具体的文档改进建议
