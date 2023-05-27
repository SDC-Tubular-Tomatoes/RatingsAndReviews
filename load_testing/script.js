import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  let testId = Math.floor(Math.random() * (1000011 - 900009)) + 900009;
  const res = http.get(`http://localhost:8080/reviews?product_id=${testId}`,
  {tags: {name: 'productId'}});
  check(res, {
    'is status 200': (r) => r.status === 200
  });
  sleep(1);
}


