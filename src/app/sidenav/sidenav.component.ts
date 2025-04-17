import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { SomeComponent } from "../some/some.component";

interface SideNavToggle2{
  screenWidth2 : number;
  collapsed2 : boolean;
}

interface SideNavToggle{
  screenWidth : number;
  collapsed : boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, SomeComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',

})


export class SidenavComponent implements OnInit{

  @Output()
  onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;

  navData = navbarData;
  
  userType = localStorage.getItem('typeUser');

  @HostListener('window:resize',['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth:this.screenWidth});

    }
  }

  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
  }

  toggleCollapse() : void{
    this.collapsed= !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth:this.screenWidth});
    
  }

  closeSidenav():void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth:this.screenWidth});
  }

  onToggleSideNav2(data2: SideNavToggle2) : void{

    this.collapsed = data2.collapsed2;
    this.screenWidth = data2.screenWidth2

  }

}
