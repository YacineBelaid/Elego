import request from 'supertest';
import App from '@/app';
import IndexRoute from '@/routes/index.route';

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      const route = new IndexRoute();
      const app = new App([route]);
      return request(app.getServer()).get('/').expect(200);
    });
  });
});
