import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE } from '../constants/supabase.constants';
import { CodeTabsState } from '../models/code-tabs.model';

@Injectable({
  providedIn: 'root'
})
export class CodeTabService {
  private _supabaseTable = 'code_tabs';
  private _supabaseClient!: any;
  constructor() {
    this._supabaseClient = createClient(SUPABASE.projectUrl, SUPABASE.anonKey);
  }

  async getAllCodeTabs() {
    const { data, error } = await this._supabaseClient
      .from(this._supabaseTable)
      .select('*')
      .order('id', { ascending: true });

      return data;
  }

  async getIndicatorCardTabs() {
    const { data, error } = await this._supabaseClient
      .from(this._supabaseTable)
      .select('*')
      .order('id', { ascending: true });

    if (error) { throw 'Something is wrong - let me figure it out'}
    let indicatorData = new CodeTabsState(data);
    return indicatorData.getIndicatorTabData();
  }

  async getTabFor(componentName: string, languageType: string) {
    const { data, error } = await this._supabaseClient
      .from(this._supabaseTable)
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      return error;
    } else {
      const requestedData = new CodeTabsState(data);
      const tabData = requestedData.getLanguageType(componentName, languageType);
      console.log(tabData);
      return tabData;
    }
  }
}
