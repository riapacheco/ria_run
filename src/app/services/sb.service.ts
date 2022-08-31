import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SUPABASE } from '../constants/supabase.constants';
import { map } from 'rxjs';
import { TTable } from '../types/supabase.type';
import { SUPABASE_TABLE } from '../enums/supabase.enums';
import { ToastService } from './toast.service';



@Injectable({
  providedIn: 'root'
})
export class SbService {
  private _supabase!: any;
  constructor(
    private toast: ToastService
  ) { this._supabase = createClient(SUPABASE.projectUrl, SUPABASE.anonKey); }

  get(tableName: TTable, column?: string, matchValue?: any): Observable<any> {
    const query = this._supabase.from(tableName).select('*')
    if (column !== undefined && matchValue !== undefined) { query.match({ column, matchValue }); }
    return from(query).pipe(map((res: any) => res['body']));
  }

  getFromArray(table: TTable, column?: string, searchArray?: Array<number | string>): Observable<any> {
    const query = this._supabase.from(table).select('*')
    if (column !== undefined && searchArray !== undefined) {
      query.in(column, searchArray);
      return from (query).pipe(map((res: any) => res['body']));
    } else { return from(query).pipe(map((res: any) => res['body'])); }
  }

  async sendMessage(fullName: string, email: string, message: string) {
    const { data, error } = await this._supabase
      .from(SUPABASE_TABLE.MESSAGES)
      .insert([{
        fullName: fullName,
        email: email,
        message: message
      }]);
    if (error) {
      this.toast.callToast(
        'Oops!',
        `Something happened. Email me directly at <strong>me@riapacheco.com</strong> just to be safe!`,
        false
      );
      return;
    }
    if (data) {
      this.toast.callToast(
        'Message successfully sent!',
        `Thank you for sending me a note! I'll get back to you as soon as I can :)`,
        false
      );
      return true;
    }
  }
}
