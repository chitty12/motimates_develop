const redis = require('redis');
// env
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/config/.env' });

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true, // v4버전은 promise 객체기반이므로, 옛날문법과의 호환성을 위해 설정.
});

redisClient.connect().then(); // connect to redis v4 (async)

const redisCli = redisClient.v4;
redisClient.on('connect', async () => {
  console.log('Redis에 연결되었습니다');

  redisClient.set('test', '123');
  let data = await redisCli.get('test');
  console.log(data);

  //   // 키에 연결된 값 가져오기
  //   redisClient.get('test', (err, value) => {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       // 값이 문자열이 아니라면 다른 처리를 수행
  //       if (typeof value !== 'string') {
  //         console.error(`키 ${key}에 저장된 데이터의 유형이 문자열이 아닙니다.`);
  //       } else {
  //         console.log(`키 ${key}에 대한 값:`, value);
  //       }
  //     }

  //     // 연결 닫기
  //     // redisClient.quit();
  //   });

  redisClient.on('error', (err) => {
    console.error('redis client error!', err);
  });
});
