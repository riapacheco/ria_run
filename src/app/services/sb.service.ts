import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SUPABASE } from '../constants/supabase.constants';
import { map } from 'rxjs';
import { TTable } from '../types/supabase.type';



@Injectable({
  providedIn: 'root'
})
export class SbService {
  private _supabase!: any;
  constructor() { this._supabase = createClient(SUPABASE.projectUrl, SUPABASE.anonKey); }

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
}
