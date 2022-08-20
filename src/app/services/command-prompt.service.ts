import { Injectable } from '@angular/core';
import { SUPABASE } from '../constants/supabase.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICommandPrompt } from '../interfaces/command-prompt.interface';
import { createClient } from '@supabase/supabase-js';

export const getCommandPromptHeaders = {
  headers: new HttpHeaders({
    'apiKey': `${SUPABASE.anonKey}`,
    'Authorization': `Bearer ${SUPABASE.anonKey}`,
    'Content-Type': 'application/json'
  })
};
export const postCommandPromptHeaders = {
  headers: new HttpHeaders({
    'apiKey': `${SUPABASE.anonKey}`,
    'Authorization': `Bearer ${SUPABASE.anonKey}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CommandPromptService {
  private paramUrl = 'https://lvvhyxbvfcygnlzlbsok.supabase.co/rest/v1/commands';
  private supabaseTable = 'commands';
  private supabaseClient!: any;
  commandPrompt!: ICommandPrompt;

  constructor(
    private http: HttpClient
  ) { this.supabaseClient = createClient(SUPABASE.projectUrl, SUPABASE.anonKey); }

  // GET ALL
  getAllPrompts() {
    return this.http.get(this.paramUrl, getCommandPromptHeaders);
  }

  // Run submitted command against all rows' nested `commands` arrays
  async runCommand(commandString: string): Promise<any> {
    const { data, error } = await this.supabaseClient
      .from(this.supabaseTable)
      .select('*')
      .cs('commands', [commandString]);

    if (!data[0] || data[0] == undefined) throw `command not found: \"${commandString}\"`;
    else if (error) { return error; }
    else { return data[0]; }
  }

  // ADD ONE
  async addPrompt(promptData: ICommandPrompt): Promise<any> {
    const { data, error } = await this.supabaseClient.from(this.supabaseTable).insert([promptData]);
    if (data) { return data; }
    if (error) { return error.details; }
  }

  // ADD MANY
  async addManyPrompts(promptsData: ICommandPrompt[]): Promise<any> {
    const { data, error } = await this.supabaseClient.from(this.supabaseTable).insert([promptsData]);
    if (data) { return data; }
    if (error) { return error.message; }
  }

  // UPDATE ONE
  async updatePrompt(promptId: any, promptData: ICommandPrompt): Promise<any> {
    const { data, error } = await this.supabaseClient.from(this.supabaseTable)
      .update(promptData)
      .match({ id: promptId });

    if (data) { return data; }
    if (error) { return error; }
  }

  // DELETE ONE
  async deletePrompt(promptId: number): Promise<any> {
    const { data, error } = await this.supabaseClient.from(this.supabaseTable)
      .delete()
      .match({ id: promptId });
    if (error) { return error.message; }
    else { return data; }
  }
}
