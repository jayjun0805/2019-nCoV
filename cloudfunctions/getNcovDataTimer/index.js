// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

const rp = require('request-promise');

const URL = 'http://2019ncov.nosugartech.com/data.json';

const MAX_LIMIT = 100;

const ncovCollection = db.collection('ncov');

// 云函数入口函数
exports.main = async (event, context) => {
  const countResult = await ncovCollection.count();
  const total = countResult.total;
  const batchTimes = Math.ceil(total / MAX_LIMIT);
  const tasks = [];
  for (let i = 0; i < batchTimes; i++) 
  {
    let promise = ncovCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
    tasks.push(promise);
  }

  let list = {
    data: []
  };

  if (tasks.length > 0) 
  {
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }

  const ncov = await rp(URL).then((res) => {
    return JSON.parse(res).data;
  })

  const newData = [];
  for (let i = 0, len1 = ncov.length; i < len1; i++) 
  {
    let flag = true;
    for (let j = 0, len2 = list.data.length; j < len2; j++) 
    {
      if (ncov[i].id === list.data[j].id) 
      {
        flag = false;
        break;
      }
    }
    if (flag) 
    {
      newData.push(ncov[i]);
    }
  }

  for (let i = 0, len = newData.length; i < len; i++) 
  {
    await ncovCollection.add({
      data: {
        ...newData[i]
      }
    }).then((res) => {
      console.log('插入成功');
    }).catch((err) => {
      console.error('插入失败');
    })
  }

  return newData.length;
}