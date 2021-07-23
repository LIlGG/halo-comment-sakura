<h1 align="center"><a href="https://github.com/LIlGG/halo-comment-sakura" target="_blank">halo-comment-sakura</a></h1>
<p align="center">
  <a href="https://github.com/LIlGG/halo-theme-sakura"><img alt="Build Status" src="https://img.shields.io/badge/build-positive-brightgreen?style=for-the-badge"></a>
  <a href="https://github.com/prettier/prettier"><img alt="Code Style: Prettier" src="https://img.shields.io/badge/release-1.3.5-blue?style=for-the-badge"></a>
  <a href="./LICENSE"><img alt="LICENSE MIT" src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge"></a>
</p>

> 适用于 halo-theme-sakura 的评论组件。
>> 可能也适用于其他主题，但不确保完全适配。

### 使用指南

1. 进入后台 -> 系统 -> 博客设置 -> 评论设置

2. 将 `评论模块 JS` 修改为：`https://cdn.jsdelivr.net/gh/LIlGG/halo-comment-sakura@v1.3.5/dist/halo-comment.min.js`

### 自定义配置

如果你需要自定义该评论组件，下面提供了一些属性：

| 属性           | 说明                     | 默认值                              | 可选                       |
| -------------- | ------------------------ | ---------------------------------- | -------------------------- |
| autoLoad       | 是否自动加载评论列表      | `true`                             | `true` `false`             |
| showUserAgent  | 是否显示评论者的 UA 信息  | `true`                             | `true` `false`             |
| gravatarSource | Gravatar 源地址          | `//cn.gravatar.com/avatar`          | -                          |
| loadingStyle   | 评论加载样式              | `default`                         | `default` `circle` `balls` |
| aWord          | 评论框内的一言            | `你是我一生只会遇见一次的惊喜 ...`  | -                          |
| authorPopup    | 填写昵称时的提示          | `输入QQ号将自动拉取昵称和头像`      | -                          |
| emailPopup     | 填写 email 时的提示       | `你将收到回复通知`                 | -                          |
| urlPopup       | 填写网站链接时的提示      | `禁止小广告😀`                     | -                          |
| notComment     | 没有评论时显示的语句      | `暂无评论`                         | -                          |

配置方法：

#### Freemarker
在引入评论组件的页面加上：

```freemarker
<#local
  configs = '{
		"autoLoad": true,
    "showUserAgent": true
	}'
>
```
`<#local>` 标签需要在宏模板或者函数中才能使用，如果评论组件不包括在内部，则使用 `<#assign>` 标签

修改评论组件标签加上：

```html
configs='${configs}'
```

示例：

```html
<halo-comment id='${target.id?c}' type='${type}' configs='${configs}'/>
```

<font color="red">注：单引号和双引号要保持正确</font>

### 主题开发引用指南

#### 方法一

新建 comment.ftl：

```html
<#macro comment target,type>
    <#if !post.disallowComment!false>
        <script src="//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js"></script>
        <script src="${options.comment_internal_plugin_js!'//cdn.jsdelivr.net/gh/LIlGG/halo-comment-sakura@v1.3.5/dist/halo-comment.min.js'}"></script>
        <#assign
          configs = '{
            "autoLoad": true,
            "showUserAgent": true
          }'
        >
        <halo-comment id='${target.id?c}' type='${type}' configs='${configs}'/>
    </#if>
</#macro>
```

然后在 post.ftl/sheet.ftl 中引用：

post.ftl：

```html
<#include "comment.ftl">
<@comment target=post type="post" />
```

sheet.ftl：

```html
<#include "comment.ftl">
<@comment target=sheet type="sheet" />
```

#### 方法二

一般在主题制作过程中，我们可以将 head 部分抽出来作为宏模板，如：<https://github.com/halo-dev/halo-theme-anatole/blob/master/module/macro.ftl>，那么我们就可以将所需要的依赖放在 head 标签中：

```html
<head>
    ...
    
    <#if is_post?? && is_sheet??>
        <script src="//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js"></script>
        <script src="${options.comment_internal_plugin_js!'//cdn.jsdelivr.net/npm/halo-comment-normal@1.1.1/dist/halo-comment.min.js'}"></script>
        <#local
          configs = '{
            "autoLoad": true,
            "showUserAgent": true
          }'
        >
    </#if>
    
    ...
</head>
```

然后在 post.ftl/sheet.ftl 中引用：

post.ftl：

```html
<#if !post.disallowComment!false>
    <halo-comment id='${post.id?c}' type='post' configs='${configs}'/>
</#if>
```

sheet.ftl：

```html
<#if !sheet.disallowComment!false>
    <halo-comment id='${sheet.id?c}' type='sheet' configs='${configs}'/>
</#if>
```

#### 进阶：

可以将 configs 中的属性通过 settings.yaml 保存数据库中，以供用户自行选择，如：

settings.yaml：

```yaml
...

comment:
  label: 评论设置
  items:
    autoLoad:
      name: autoLoad
      label: 自动加载评论
      type: radio
      data-type: bool
      default: true
      options:
        - value: true
          label: 开启
        - value: false
          label: 关闭
    showUserAgent:
      name: showUserAgent
      label: 评论者 UA 信息
      type: radio
      data-type: bool
      default: true
      options:
        - value: true
          label: 显示
        - value: false
          label: 隐藏

...
```

那么我们需要将上面的 script 改为下面这种写法：

```freemarker
<#local
  configs = '{
    "autoLoad": ${settings.autoLoad!},
    "showUserAgent": ${settings.showUserAgent!}
  }'
>
```

#### 说明

1. configs 可以不用配置。
2. 具体主题开发文档请参考：<https://halo.run/develop/theme/ready.html>。

### 样式自定义
> 由于组件化的原因，嵌入式的代码一般不会由外部样式影响到。但基于实际需求，评论组件通常需要与主题样式相关联，因此必须使用外部样式来改动评论组件样式，所以必须能够自定义样式

本组件推荐将外部 CSS 使用 style 标签的方式，嵌入至 Shadow DOM 中，此方法也可以用于其他任何评论组件，具体做法如下：

1. 在主题的自定义 CSS 中，编写供评论组件使用的外部 CSS，例如
```css
<style id="comment-style" type="text/css" media="noexist">
    .halo-comment.dark .body p {
        color: #bebebe !important;
    }

    <#if settings.comment_custom_style??>
        ${settings.comment_custom_style!}
    </#if>
</style>
```
当 media 为 noexist 时，将不会污染主题样式。

2. 在主题的 JS 文件中，编写将上述外部 CSS 嵌入至评论组件内部的代码，例如
```js
// 复制一个css副本
var commentStyle = $("#comment-style").clone();
commentStyle.attr("media", "all");
var comments = $("halo-comment");
for (var i = 0; i < comments.length; i++) {
  // 注入外部css
  comments[i].shadowRoot.appendChild(commentStyle[0]);
}
```

<font color="red">注：使用上述方法注入 CSS，需要保证 Shadow DOM 的 mode 处于 open 状态，否则无法使用 JS 进行修改。</font>



