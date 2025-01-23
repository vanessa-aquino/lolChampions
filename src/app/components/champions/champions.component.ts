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
  displayedChampions: any[] = [];
  selectedChampion: any = null;
  currentPage: number = 1;
  championsPerPage: number = 10;

  constructor(private championsService: ChampionsService) {};

  ngOnInit(): void {
    this.championsService.getChampions().subscribe({
      next: (data) => {
        this.champions = Object.values(data.data);
        this.loadChampionsForCurrentPage();
      }, 
      error: (err) => {
        console.error('Erro ao carregar campeões', err);
      }, 
    });
  }
  
  loadChampionsForCurrentPage(): void {
    const start = (this.currentPage - 1) * this.championsPerPage;
    const end = start + this.championsPerPage;
    this.displayedChampions = this.champions.slice(start, end);
  };

  goToNextPage(): void {
    if(this.currentPage * this.championsPerPage < this.champions.length) {
      this.currentPage++;
      this.loadChampionsForCurrentPage();
    };
  };

  goToPreviousPage(): void {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.loadChampionsForCurrentPage();
    }
  }

  selectChampion(championName: string) {
    this.championsService.getChampionsByName(championName).subscribe(data => {
      this.selectedChampion = data.data[championName];
      console.log(this.selectedChampion);
    })
  }


}
