import { Component, OnInit } from '@angular/core';
import { ChampionsService } from '../../services/champions.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-champions',
  imports: [CommonModule, FormsModule],
  templateUrl: './champions.component.html',
  styleUrl: './champions.component.css'
})
export class ChampionsComponent implements OnInit {
  champions: any[] = [];
  displayedChampions: any[] = [];
  selectedChampion: any = null;
  currentPage: number = 1;
  championsPerPage: number = 10;
  lore: string | null = null;
  filterText: string = '';
  filteredChampions: any[] = [];
  noChampionsFound: boolean = false;

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
    const championsToDisplay = this.filteredChampions.length > 0 ? this.filteredChampions : this.champions;
    const start = (this.currentPage - 1) * this.championsPerPage;
    const end = start + this.championsPerPage;
    this.displayedChampions = championsToDisplay.slice(start, end);
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


  selectChampion(championName: string): void {
    if(this.selectedChampion && this.selectedChampion.id === championName) {
      this.selectedChampion = null;
      this.lore = null;
      return;
    };
    this.championsService.getChampionsByName(championName).subscribe(data => {
      this.selectedChampion = data.data[championName];
      this.getLore();
    })
  }

  getLore(): void {
    if(this.selectedChampion) {
      this.lore = this.selectedChampion.lore;
    }
  }

  filterChampions(): void {
    const lowerCaseFilter = this.filterText.toLowerCase();
    this.displayedChampions = this.champions.filter((champion) => 
    champion.name.toLowerCase().includes(lowerCaseFilter));
    this.noChampionsFound = this.displayedChampions.length === 0;
  };

}
