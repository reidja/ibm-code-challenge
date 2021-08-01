import { animate, style, transition, trigger } from '@angular/animations';

export const enterExitAnimation = trigger(
  'enterExit', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('1000ms', style({ opacity: 1 })),
    ])
  ]
);
