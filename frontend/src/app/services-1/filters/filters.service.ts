import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, firstValueFrom } from 'rxjs'
import { environment } from 'src/environments/environment';
import { Filtre } from 'src/app/interfaces/filtre';

export const FILTERS_URL = `${environment.backendUrl}/filters`

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  
  constructor(private http: HttpClient) { }

  public async postFilters(filters: Partial<Filtre>) : Promise<Filtre> {
    let localSessionId = localStorage.getItem("sessionId")

    let h = new HttpHeaders().set("sessionId",localSessionId || "");
    let observable$ = this.http.post(FILTERS_URL,{"filtre": filters},{headers:h});
    let resultFilters : any = await firstValueFrom(observable$);
    
    if(localSessionId == null)
      localStorage.setItem("sessionId", resultFilters.data.sessionId);
    return resultFilters.data;
  }

  public async getFilters(): Promise<Filtre> {
    let localSessionId = localStorage.getItem("sessionId")
    let h = new HttpHeaders().set("sessionId", localSessionId || "");

    let observable$ = this.http.get(FILTERS_URL,{headers: h});

    let filters : any = await firstValueFrom(observable$);

    if(localSessionId == null)
      localStorage.setItem("sessionId", filters.data.sessionId);
    
    return filters.data;
  }
}
