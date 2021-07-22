> 感谢您参与 halo-common-sakura 的开发，以下是参与贡献代码的参考指南，以供参考。

## 代码贡献流程
#### 1. 提交 issue （非必需）

在提交任何代码之前，尽量先前往 https://github.com/LIlGG/halo-comment-sakura/issues 创建一个 issue，以供讨论问题的合理性再进行开发，

#### 2. Fork 此仓库

点击本仓库右上角的 Fork 即可，将本仓库复制一份副本至你的仓库。

#### 3. Clone 仓库至本地

```bash
git clone https://github.com/{YOUR_USERNAME}/halo

git submodule init

git submodule update
```

#### 4. 创建新的开发分支
```bash
git checkout -b {BRANCH_NAME}
```

#### 5. 提交代码

```bash
git push origin {BRANCH_NAME}
```

#### 6. 提交 pull request

回到自己的仓库页面，选择 `New pull request` 按钮，创建 `Pull request` 到原仓库的 `master` 分支。

然后等待我们 Review 即可，如有 `Change Request`，再本地修改之后再次提交即可。

#### 7. 更新主仓库代码到自己的仓库

```bash
git remote add upstream git@github.com:LIlGG/halo-comment-sakura.git

git pull upstream master

git push
```

## 评论组件开发流程
推荐使用 [Visual Studio Code](https://visual-studio-code.en.softonic.com/) ，并且推荐安装插件 `Live Server`，方便快速调试。

#### 安装依赖
```bash
npm install
```

#### 启用热部署开发模式
```bash
npm run serve
```

#### 打包为单组件，供主题使用
```bash
npm run build 
```

打包之后的文件，在 `dist` 目录下，该内的文件 `halo-comment.js` 以及 `halo-comment.min.js`，将可以用于主题。

开发调试建议：`dist` 下会生成 `demo.html`，该文件可以使用 `Live Service` 插件在本地生成一个 http 访问路径，例如 `http://127.0.0.1:5501/dist/demo.html`，因此可以将 `http://127.0.0.1:5501/dist/halo-comment.js` 填写至博客后台的评论组件地址中用于开发调试。

#### Lints 及 文件修复
```bash
npm run lint
```

开发调试建议：如果实在需要在打包后的评论组件中使用 `console` 及 `debuger`，那么可以在开发时临时将 `.eslintrc.js` 文件中的 `rules` 改为如下设置以允许使用：
```js
rules: {
    'no-console': 0,
    'no-debugger': 0
},
```

但在提交 PR 时，务必保证禁用 `console` 及 `debuger`