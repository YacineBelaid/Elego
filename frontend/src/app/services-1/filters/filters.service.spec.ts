import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http'
import { FiltersService, FILTERS_URL } from './filters.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Filtre } from 'src/app/interfaces/filtre';

const URL = FILTERS_URL;

const filterMock: Filtre = {     
  sessionId: "123",
  price_min: 10,
  price_max: 100,
  seats_2: true,
  seats_4: true,
  seats_5: true,
  seats_7: false,
  seats_n: false,
  suv: true,
  compact: false,
  sport: false}

const partialFilterMock: Partial<Filtre> = { price_min: 10, suv: true}

describe('FiltersService', () => {
  let service: FiltersService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  const routerMock = {
    navigate: (url: Array<String>) => {}
  }


  afterEach(() => {
    localStorage.clear();
  })

  describe('on getFilters', () => {
    beforeEach(() => {
      localStorage.clear();
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [{provide: Router, useValue: routerMock }]
      });
      httpTestingController = TestBed.inject(HttpTestingController);
      service = TestBed.inject(FiltersService);
    });

    it('Should call a get HTTP request without session id, and set local session id', async () => {
      
      let filterPromise : Promise<Filtre> = service.getFilters()

      let req = httpTestingController.expectOne(URL);

      expect(req.request.method).toBe("GET");
      expect(req.request.headers.get("sessionId")).toBe("");
      
      req.flush({
        data:{
          ...filterMock
        }});

      let filtres : Filtre = await filterPromise;
      expect(filtres).toEqual(filterMock);
      expect(localStorage.getItem("sessionId")).toBe("123");
    })

    it('Should call a get HTTP request with an existing session id, and NOT set new local session id', async () => {
      localStorage.setItem("sessionId","456")
      let filterPromise : Promise<Filtre> = service.getFilters();

      let req = httpTestingController.expectOne(URL);

      expect(req.request.method).toBe("GET");
      expect(req.request.headers.get("sessionId")).toBe("456")

      req.flush({
        data:{
          ...filterMock
        }});
      
      let filtres : Filtre = await filterPromise;
      expect(filtres).toEqual(filterMock);
      expect(localStorage.getItem("sessionId")).toBe("456");
    })

    it('Should call a post HTTP request without a session id, with a filter, and set local session id', async () => {
      let filterPromise : Promise<Filtre> = service.postFilters(filterMock);

      let req = httpTestingController.expectOne(URL);

      req.flush({
        data:{
          ...filterMock
        }});

      expect(req.request.method).toBe("POST");
      expect(req.request.headers.get("sessionId")).toBe("");
      expect(req.request.body.filtre).toBe(filterMock);

      let filtres : Filtre = await filterPromise;
      expect(filtres).toEqual(filterMock);
      expect(localStorage.getItem("sessionId")).toBe("123");
    })

    it('Should call a post HTTP request with a session id, with a filter, and NOT set new local session id', async () => {
      localStorage.setItem("sessionId","456")
      let filterPromise : Promise<Filtre> = service.postFilters(filterMock);

      let req = httpTestingController.expectOne(URL);

      req.flush({
        data:{
          ...filterMock
        }});

      expect(req.request.method).toBe("POST");
      expect(req.request.headers.get("sessionId")).toBe("456")
      expect(req.request.body.filtre).toBe(filterMock)

      let filtres : Filtre = await filterPromise;
      expect(filtres).toEqual(filterMock);
      expect(localStorage.getItem("sessionId")).toBe("456");
    })

    it('Should call a post HTTP request with a session id, with a partial filter', async () => {
      localStorage.setItem("sessionId","456")
      let filterPromise = service.postFilters(partialFilterMock);

      let req = httpTestingController.expectOne(URL);

      req.flush({
        data:{
          ...filterMock
        }});

      expect(req.request.method).toBe("POST");
      expect(req.request.headers.get("sessionId")).toBe("456")
      expect(req.request.body.filtre).toBe(partialFilterMock)

      await filterPromise;
    })

    it('Should call a post HTTP request without a session id, with a partial filter', async () => {
      localStorage.setItem("sessionId","")
      let filterPromise = service.postFilters(partialFilterMock);

      let req = httpTestingController.expectOne(URL);

      req.flush({
        data:{
          ...filterMock
        }});

      expect(req.request.method).toBe("POST");
      expect(req.request.headers.get("sessionId")).toBe("")
      expect(req.request.body.filtre).toBe(partialFilterMock)

      await filterPromise;
    })

  });


});
