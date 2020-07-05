<h1 align="center"><a href="https://github.com/LIlGG/halo-comment-sakura" target="_blank">halo-comment-saiku</a></h1>

> 适用于 halo-theme-sakura 的评论组件。目前为初版，可能会有一定BUG
>> 可能也适用于其他主题，但不确保完全适配。

### 使用指南

1. 进入后台 -> 系统 -> 博客设置 -> 评论设置

2. 将 `评论模块 JS` 修改为：`https://cdn.jsdelivr.net/gh/LIlGG/halo-comment-sakura@v1.3.0/dist/halo-comment.min.js`

### 自定义配置

如果你需要自定义该评论组件，下面提供了一些属性：

| 属性           | 说明                     | 默认值                    | 可选                       |
| -------------- | ------------------------ | ------------------------- | -------------------------- |
| autoLoad       | 是否自动加载评论列表     | true                      | `true` `false`             |
| showUserAgent  | 是否显示评论者的 UA 信息 | true                      | `true` `false`             |
| gravatarSource | Gravatar 源地址          | `//cdn.v2ex.com/gravatar` | -                          |
| loadingStyle   | 评论加载样式             | `default`                 | `default` `circle` `balls` |

配置方法：

在引入评论组件的页面加上：

```javascript
<script>
var configs = {
    autoLoad: true,
    showUserAgent: true
}
</script>
```

修改评论组件标签加上：

```html
:configs="configs"
```

示例：

```html
<halo-comment id="${post.id?c}" type="post" :configs="configs">
```

```html
<halo-comment id="${sheet.id?c}" type="sheet" :configs="configs">
```

```html
<halo-comment id="${journal.id?c}" type="journal" :configs="configs">
```

### 主题开发引用指南

#### 方法一

新建 comment.ftl：

```html
<#macro comment target,type>
    <#if !post.disallowComment!false>
        <script src="//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js"></script>
        <script src="${options.comment_internal_plugin_js!'//cdn.jsdelivr.net/gh/LIlGG/halo-comment-sakura@v1.0.0/dist/halo-comment.min.js'}"></script>
        <script>
        var configs = {
            autoLoad: true,
            showUserAgent: true
        }
        </script>
        <halo-comment id="${target.id?c}" type="${type}" :configs="configs"/>
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
        <script>
        var configs = {
            autoLoad: true,
            showUserAgent: true
        }
        </script>
    </#if>
    
    ...
</head>
```

然后在 post.ftl/sheet.ftl 中引用：

post.ftl：

```html
<#if !post.disallowComment!false>
    <halo-comment id="${post.id?c}" type="post" :configs="configs"/>
</#if>
```

sheet.ftl：

```html
<#if !sheet.disallowComment!false>
    <halo-comment id="${sheet.id?c}" type="sheet" :configs="configs"/>
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

```javascript
<script>
var configs = {
    autoLoad: ${settings.autoLoad!},
    showUserAgent: ${settings.showUserAgent!}
}
</script>
```

#### 说明

1. configs 可以不用配置。
2. 具体主题开发文档请参考：<https://halo.run/develop/theme/ready.html>。

