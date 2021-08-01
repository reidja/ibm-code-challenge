import { Component, Inject, OnDestroy } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from "src/app/interfaces/todo.interface";
import { DateTime } from "luxon";

/** How often the timer is updated visually */
const TIMER_FREQUENCY = 1000; // 1s

@Component({
  selector: 'app-git-bits-dun-dialog',
  templateUrl: './git-bits-dun-dialog.component.html',
  styleUrls: ['./git-bits-dun-dialog.component.css'],
})
export class GitBitsDunDialogComponent implements OnDestroy {
  /** Has the timer started? */
  started: boolean = false;
  
  /** Has the timer ended? */
  ended: boolean = false;
  
  /** The time when the timer has ended */
  endTime!: DateTime;
  
  /** The timer object */
  timer: number = 0;
  
  /** The time remaining string */
  time: string = '30m'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {todo: Todo},
    public dialogRef: MatDialogRef<GitBitsDunDialogComponent>,
  ) {}
  
  onStart(): void {
    clearTimeout(this.timer);
    const now = DateTime.now();
    this.endTime = now.plus({minutes: 30});
    this.timer = setTimeout(() => {
      this.updateTime();
    }, TIMER_FREQUENCY) as any;
    this.started = true;
  }
  
  /**
   * Handler to close the Git Bits Dun dialog
   * @param result Should the todo item be marked as completed?
   */
  onClose(result: boolean): void {
    this.dialogRef.close(result);
  }
  
  /**
   * This is called for every tick of the timer. It will reschedule itself if the timer has not expired.
   */
  updateTime() {
    /** The current time */
    const now = DateTime.now();
    /** The difference between the end time and the current time (ex: 15m 22s) */
    const diff = this.endTime.diff(now, ['minutes', 'seconds']).toFormat("mm'm' ss's'");

    // Update the time string in the components
    this.time = diff;
    
    // Check if the timer has expired
    if(now >= this.endTime) {
      this.ended = true;
    } else {
      // If the timer hasn't expired yet, reschedule this timer
      this.timer = setTimeout(() => {
        this.updateTime();
      }, TIMER_FREQUENCY) as any;
    }
  }
  
  /** Ensure any timers are cleaned up when the component is destroyed */
  ngOnDestroy() {
    clearTimeout(this.timer);
  }
}
