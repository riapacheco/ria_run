import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE } from '../constants/supabase.constants';

@Injectable({
  providedIn: 'root'
})
export class AboutMeService {
  private _table = 'about_me';
  private _client!: any;
  constructor() {
    this._client = createClient(SUPABASE.projectUrl, SUPABASE.anonKey);
  }

  async getAllContent() {
    const { data, error } = await this._client
      .from(this._table)
      .select('*')
      .order('index', { ascending: true });

    if (error) { return error; }
    if (data) { return data; }
  }

  async getByType(typeName: string) {
    const { data, error } = await this._client
      .from(this._table)
      .select(typeName);

    if (error) { return error; }
    if (data) { return data; }
  }
}
