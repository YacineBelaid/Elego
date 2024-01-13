import request from 'supertest';
import App from '@/app';
import GeoCodingRoute from '@routes/geocoding.route';
import sinon from 'sinon';
import axios, { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';
import { expect } from 'chai';

describe('Testing GeoCodingRoute', () => {
  describe('[POST] /', () => {
    it('should call and return the same data as the upstream API', async (): Promise<void> => {
      const geoCodingRoute = new GeoCodingRoute();
      const app = new App([geoCodingRoute]);

      const body = { query: 'foo' };
      const mockData = [
        {
          fullAddressSuggestion: 'foo',
          lat: 1,
          lng: 2,
        },
        {
          fullAddressSuggestion: 'bar',
          lat: 3,
          lng: 4,
        },
      ];
      const mockResponse: AxiosResponse = {
        data: JSON.stringify(mockData),
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders({
          'content-type': 'application/json',
        }),
        config: {
          headers: new AxiosHeaders(),
        },
      };
      const postStub = sinon.stub(axios, 'post').resolves(mockResponse);

      try {
        const response = await request(app.getServer())
          .post(`${geoCodingRoute.path}`)
          .send(body);
        expect(response.status).eq(200);
        expect(response.headers['content-type']).matches(/json/);

        const parsedResponseBody = JSON.parse(response.body);
        expect(parsedResponseBody).deep.equals(mockData);

        sinon.assert.calledWith(postStub, sinon.match.any, sinon.match(body));
      } finally {
        postStub.restore();
      }
    });

    it('should replicate status code from upstream API', async (): Promise<void> => {
      const geoCodingRoute = new GeoCodingRoute();
      const app = new App([geoCodingRoute]);

      const body = { query: 'foo' };
      const error = new AxiosError();
      error.response = {
        data: 'test',
        status: 404,
        statusText: 'Not Found',
        headers: new AxiosHeaders({
          'content-type': 'text/plain',
        }),
        config: {
          headers: new AxiosHeaders(),
        },
      };
      const postStub = sinon.stub(axios, 'post').rejects(error);

      try {
        const response = await request(app.getServer())
          .post(`${geoCodingRoute.path}`)
          .send(body);
        expect(response.status).eq(404);
        expect(response.headers['content-type']).matches(/text\/plain/);
        expect(response.text).eq('test');

        sinon.assert.calledWith(postStub, sinon.match.any, sinon.match(body));
      } finally {
        postStub.restore();
      }
    });
  });
});
