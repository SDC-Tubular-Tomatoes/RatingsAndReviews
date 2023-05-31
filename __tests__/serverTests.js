const request = require('supertest');
const app = require('../server/index.js');

const routeTest = request(app);

  const productId = 40344;
  const reviewId = 232059;



  describe('GET reviews', () => {

    test('Should get reviews array with a length of 3', (done) => {
      app
      .get(`/reviews?product_id=${productId}`, (req, res) => {
        console.log("test123");
        expect(res.body.length).toEqual(3);
        done();
      });
    }, 16000);
  });


