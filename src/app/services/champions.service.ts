import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChampionsService {
  private apiUrl = 'https://ddragon.leagueoflegends.com/cdn/15.2.1/data/pt_BR/champion.json';
  private baseUrl = 'https://ddragon.leagueoflegends.com/cdn/15.2.1/data/pt_BR/champion/';

  constructor(private http: HttpClient) { };

  getChampions(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

  getChampionsByName(championName: string): Observable<any> {
    const url = `${this.baseUrl}${championName}.json`;
    return this.http.get<any>(url);
  }

}

