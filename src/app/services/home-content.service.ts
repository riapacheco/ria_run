import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE } from '../constants/supabase.constants';

@Injectable({
  providedIn: 'root'
})
export class HomeContentService {
  private paramUrl = 'https://lvvhyxbvfcygnlzlbsok.supabase.co/rest/v1/home';
  private supabaseTable = 'home';
  private supabaseClient!: any;
  constructor() {
    this.supabaseClient = createClient(SUPABASE.projectUrl, SUPABASE.anonKey);
  }

  async getAllContent(): Promise<any> {
    const { data, error } = await this.supabaseClient
      .from(this.supabaseTable)
      .select('*');
    if (!data || data == undefined) throw `no data found`;
    else if (error) { return error; }
    else { return data; }
  }

  async getContentByRefName(refName: string): Promise<any> {
    const { data, error } = await this.supabaseClient
      .from(this.supabaseTable)
      .select('*')
      .eq('refName', refName);
    
    if (error) { return error; }
    if (data) { return data[0]; }
  }
}
