import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { ANIMATED_WIDTH } from '../enums/animations.enums';

export const sidebarWidth = trigger('menuTrigger', [
  state('open', style({ width: '320px' })),
  state('close', style({ width: '70px' })),
  transition('open <=> close', [
    animate('200ms ease-in-out' )
  ])
]);

export const leftSlidesLeft = trigger('leftSlideLeftTrigger', [
  state('open', style({ 
    transform: 'translateX(0%)',
    width: '100vw',
  })),
  state('close', style({
    transform: 'translateX(-100%)',
  })),
  transition('open <=> close', [
    animate('350ms ease-in-out')
  ])
])

export const rightSlideRight = trigger('rightSlideRightTrigger', [
  state('open', style({ 
    transform: 'translateX(0%)',
    width: '100vw',
  })),
  state('close', style({
    transform: 'translateX(+100%)',
  })),
  transition('open <=> close', [
    animate('350ms ease-in-out')
  ])
])



export const shrinkGrowWidth = trigger('shrinkGrowTrigger', [
  state('open', style({ width: ANIMATED_WIDTH.START_WIDTH })),
  state('close', style({ width: ANIMATED_WIDTH.END_WIDTH })),
  transition('open <=> close', [
    animate('200ms ease-in-out')
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
  state('close', style({ transform: 'translateX(+150%)'})),
  transition('open <=> close', [
    animate('450ms ease-in-out')
  ])
])

export const sliderLR = trigger('sliderLR', [
  state('showing', style({ 
    transform: 'translateX(0%)',
    transition: '200ms ease-in-out',
    display: 'block'
  })),
  state('hiding', style({
    transform: 'translateX(0%)',
    transition: '200ms ease-in-out',
    display: 'none'
  })),
  transition(':enter', [
    animate('200ms ease-in-out')
  ]),
  transition(':leave', [
    animate('200ms ease-in-out')
  ])
])