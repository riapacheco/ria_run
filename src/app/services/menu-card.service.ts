import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE } from '../constants/supabase.constants';

@Injectable({
  providedIn: 'root'
})
export class MenuCardService {
  private supabaseTable = 'menu_cards';
  private supabaseClient!: any;

  constructor() {
    this.supabaseClient = createClient(SUPABASE.projectUrl, SUPABASE.anonKey);
  }

  async getMenuCards(): Promise<any> {
    const { data, error } = await this.supabaseClient
      .from(this.supabaseTable)
      .select('*')
      .order('id', { ascending: true });
    if (!data || data == undefined) throw 'no data found';
    else if (error) { return error; }
    else { return data; }
  }
}
