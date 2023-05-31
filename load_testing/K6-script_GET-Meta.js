import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    {duration: '1s', target: 1000},
    {duration: '28s', target: 1000},
    {duration: '1s', target: 1000}
  ]
};


export default function () {
  let testId = Math.floor(900000 + Math.random() * 100000);
  const res = http.get(`http://localhost:8080/reviews/meta?product_id=${testId}`,
  {tags: {name: 'productId'}});
  // check(res, {
  //   'is status 200': (r) => r.status === 200
  // });

}


