import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChampionsComponent } from "./components/champions/champions.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChampionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lol-champions';
}
