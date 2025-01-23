import { Component, OnInit } from '@angular/core';
import { ChampionsService } from '../../services/champions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-champions',
  imports: [CommonModule],
  templateUrl: './champions.component.html',
  styleUrl: './champions.component.css'
})
export class ChampionsComponent implements OnInit {
  champions: any[] = [];
  selectedChampionLore: string = '';
  selectedChampionName: string = '';

  constructor(private championsService: ChampionsService) {};

  ngOnInit(): void {
    this.championsService.getChampions().subscribe(data => {
      this.champions = Object.values(data.data);
      console.log(this.champions)
    });
  };


}
