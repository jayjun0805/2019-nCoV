# 2019-nCoV 疫情患者同程查询小程序

> 本小程序提供新型冠状病毒（2019-nCoV）确诊患者相同行程信息查询，数据来自央视新闻等官方媒体。欢迎扫描以下小程序码体验。

<img src="https://github.com/jayjun0805/2019-nCoV/blob/master/wxchat.jpg" width="300px">

## 项目背景

疫情牵动人心，你是否担心与确诊患者同行过？

为此，我们开发了一个疫情患者同程查询的小程序，你只需要输入时间、车次即可查询和订阅自己或家人在春运期间出行的各类公共交通工具上是否有确诊患者，以便主动配合相关管理机构进行信息申报，并辅助判断自己的健康状态，避免疫情扩散。

## 核心功能

 **1.数据定时自动入库** 
 
- 数据去重
- 突破获取数据条数的限制
- 利用定时触发器自动录入数据到云数据库

 **2.查询功能实现** 
 
- 疫情患者同程信息查询及分享功能
- 云函数路由优化tcb-router
- 上拉加载与下拉刷新
- 云数据库中分页查询、模糊查询

 **3.订阅功能实现** 

- 订阅预约通知功能，支持用户多次订阅
- 利用定时触发器来定期发送订阅消息
- 云数据库多集合查询
- 云调用实现订阅列表
- 云调用实现取消订阅

## 如何使用

要在微信开发者工具上体验，请按如下步骤准备所需环境，否则可能报错。

1. 参考 [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html#%E5%BC%80%E9%80%9A%E4%BA%91%E5%BC%80%E5%8F%91) 开通云开发环境。如果已开通，请忽略此步
2. 在微信开发者工具中，将 `/cloudfunctions/` 下的云函数上传到云端，具体操作方式可参考云开发文档中的云函数相关章节
3. 打开云开发控制台，进入数据库管理页，添加如下集合：
- ncov
4. 对如下集合设置权限：
- ncov：所有用户可读，仅创建者可写

## 配套教程

《微信小程序云开发－从0打造疫情患者同程查询小程序》  **QQ群：928160141（请备注“小程序”）** 

## 贡献

如果你有 bug 反馈或其他任何建议，欢迎提 issue 给我们。

## 特别鸣谢

- 感谢所有为疫情努力的医务工作者、科研工作者、快递员、程序员和每一个主动在家的你

- 数据采集自2019ncov.nosugartech.com和官方媒体

## 打赏作者

<img src="https://images.gitee.com/uploads/images/2020/0208/101456_9a89fac8_2064944.jpeg" width="300px">
