import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE } from '../constants/supabase.constants';

@Injectable({
  providedIn: 'root'
})
export class IframeService {
  private supabaseTable = 'iframes';
  private supabaseClient!: any;

  constructor() {
    this.supabaseClient = createClient(SUPABASE.projectUrl, SUPABASE.anonKey);
  }

  async getAllIframes(): Promise<any> {
    const { data, error } = await this.supabaseClient
      .from(this.supabaseTable)
      .select('*');
    
    if (data) { return data; }
    if (error) { return error;}
  }
}
