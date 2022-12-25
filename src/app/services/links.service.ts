import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE } from '../constants/supabase.constants';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  private supabaseTable = 'external_links';
  private supabaseClient!: any;

  constructor() {
    this.supabaseClient = createClient(SUPABASE.projectUrl, SUPABASE.anonKey);
  }

  async getLinks(category?: string): Promise<any> {
    if (category) {
      const { data, error } = await this.supabaseClient
        .from(this.supabaseTable)
        .select('*')
        .eq('category', category);

      if (error) {
        console.warn(error);
      }

      if (data) {
        return data;
      }
    }

    if (category == undefined) {
      const { data, error } = await this.supabaseClient
        .from(this.supabaseTable)
        .select('*');

      if (error) {
        console.warn(error);
        return error;
      }

      if (data) {
        return data;
      }
    }
  }

  async getLinkByName(name: string): Promise<any> {
    if (name) {
      const { data, error } = await this.supabaseClient
        .from(this.supabaseTable)
        .select('*')
        .eq('name', name);

      if (error) { console.warn(error); }
      if (data) { return data[0]; }
    }
  }
}
