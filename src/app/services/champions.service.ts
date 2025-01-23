import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChampionsService {
  private apiUrl = 'http://ddragon.leagueoflegends.com/cdn/11.23.1/data/pt_BR/champion.json';

  constructor(private http: HttpClient) { };

  getChampions(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

}

