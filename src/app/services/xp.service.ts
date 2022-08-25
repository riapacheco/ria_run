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

  async getProductMgmtData(companyId: number) {
    const { data, error } = await this._supabaseClient
      .from(this._companiesTable)
      .select('*')
      .match({ id: companyId });

    if (error) { return error; }
    if (data) {
      this.companies = data;

      this.getCompany(companyId).then((co: any) => {
        const returnedCompany = co;
        this.company = returnedCompany;
        
        // const pmIdsArray = this.company.productMgmtIds;
        // this.getPmData(pmIdsArray)
      })
    }
  }

  private async getPmData(pmIds: Array<string>) {
    const { data, error } = await this._supabaseClient
      .from(this._productMgmtTable)
      .select('*');

    if (error) { return error; }
    if (data) {
      const selectPmData = data.filter((pm: any) => pm.id.includes())
    }
  }
}
