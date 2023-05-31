import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    {duration: '2s', target: 1100},
    {duration: '60s', target: 1000},
    {duration: '1s', target: 1100}
  ]
};


export default function () {
  let testId = Math.floor(900000 + Math.random() * 100000);
  const res = http.get(`http://localhost:8080/reviews?product_id=${testId}`,
  {tags: {name: 'productId'}});
  //check(res, {
   // 'is status 200': (r) => r.status === 200
 // });

}


