# 2019-nCoV 疫情患者同程查询小程序（云开发版）

> 本小程序提供新型冠状病毒（2019-nCoV）确诊患者相同行程信息查询，数据来自央视新闻等官方媒体。欢迎扫描以下小程序码体验。

<img src="https://github.com/jayjun0805/2019-nCoV/blob/master/wxchat.jpg" width="200px">

## 如何使用

要在微信开发者工具上体验，请按如下步骤准备所需环境，否则可能报错。

1. 参考 [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html#%E5%BC%80%E9%80%9A%E4%BA%91%E5%BC%80%E5%8F%91) 开通云开发环境。如果已开通，请忽略此步
2. 在微信开发者工具中，将 `/cloudFunctions/` 下的云函数上传到云端，具体操作方式可参考文档中的云函数相关章节
3. 打开云开发控制台，进入数据库管理页，添加如下集合：
- ncov
- message
4. 对如下集合设置权限：
- ncov：所有用户可读，仅创建者可写
- message：仅创建者可写
5. 部分集合需要初始记录，请把 `resources/` 下的json文件导入到对应集合

## 贡献

如果你有 bug 反馈或其他任何建议，欢迎提 issue 给我们。

