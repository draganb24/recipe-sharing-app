import { Component } from '@angular/core';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './pages/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthService } from './services/auth/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, HomePageComponent, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipe-sharing';
  user:any = null;

  constructor(public authService: AuthService){}

  ngOnInit(){
    this.authService.getUserProfile().subscribe({
      next:data=>console.log("req user ", data),
      error:error=>console.log("error", error)
    });
    this.authService.authSubject.subscribe(
      (auth)=>{
        this.user = auth.user
      }
    )
  }
}
