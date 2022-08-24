import { animate, state, style, transition, trigger } from '@angular/animations';


export const sidebarWidth = trigger('menuTrigger', [
  state('open', style({ width: '320px' })),
  state('close', style({ width: '70px' })),
  transition('open <=> close', [
    animate('200ms ease-in-out' )
  ])
]);

export const drawerOpenClose = trigger('drawerTrigger', [
  state('open', style({ transform: 'translateX(%)' })),
  state('close', style({ transform: 'translateX(+200%)' })),
  transition('open <=> close', [
    animate('200ms ease-in-out')
  ])
]);

export const sidebarOpenClose = trigger('sidebarTrigger', [
  state('open', style({ transform: 'translateX(0%)' })),
  state('close', style({ transform: 'translateX(-200%)' })),
  transition('open <=> close', [
    animate('450ms ease-in-out')
  ])
])

export const slideDownUp = trigger('slideDownTrigger',  [
  state('open', style({ transform: 'translateY(0%)' })),
  state('close', style({ transform: 'translateY(-200%)' })),
  transition('open <=> close', [
    animate('450ms ease-in-out')
  ])
])

export const slideLeftAnimation = trigger('slideLeftTrigger', [
  state('open', style({ transform: 'translateX(0%)' })),
  state('close', style({ transform: 'translateX(+150%)', display: 'none' })),
  transition('open <=> close', [
    animate('450ms ease-in-out')
  ])
])