import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { SUPABASE } from '../constants/supabase.constants';
import { ICompany, IProductMgmt } from '../models/xp.model';

@Injectable({
  providedIn: 'root'
})
export class XpService {
  private _companiesTable = 'companies';
  private _productMgmtTable = 'product_mgmt';
  private _devProjectsTable = 'dev_projects';
  private _supabaseClient!: any;

  private companies!: ICompany[];
  private company!: ICompany;
  private productMgmts!: IProductMgmt[];
  private productMgmt!: IProductMgmt;


  private _companies$: BehaviorSubject<object[]> = new BehaviorSubject<object[]>([{}]);
  public companies$: Observable<object[]> = this._companies$.asObservable();

  constructor() {
    this._supabaseClient = createClient(SUPABASE.projectUrl, SUPABASE.anonKey);
  }

  async getCompanies() {
    const { data, error } = await this._supabaseClient
      .from(this._companiesTable)
      .select('*')
      .order('index', { ascending: true });
    if (error) { return error; }
    if (data) { return data; }
  }

  async getCompany(companyId: number) {
    const { data, error } = await this._supabaseClient
      .from(this._companiesTable)
      .select('*')
      .match({ id: companyId });

    if (error) { return error; }
    if (data) {
      this._companies$.next(data);
      return data;
    }
  }

  async getProductProjects(ids: any) {
    const { data, error } = await this._supabaseClient
      .from(this._productMgmtTable)
      .select('*')
      .in('id', ids);
    if (error) { return error; }
    if (data) { return data; }
  }

  async getDevProjects(ids: any) {
    const { data, error } = await this._supabaseClient
      .from(this._devProjectsTable)
      .select('*')
      .in('id', ids);
    if (error) { return error; }
    if (data) { return data; }
  }


}
