import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
  constructor(private router: Router) {}
  
  /**
   * Check if the active route matches the requested route
   * @param route The path to match against the active route
   * @returns Does the active route match the requested path?
   */
  hasRoute(route: string): boolean {
    return this.router.url == route;    
  }
}
