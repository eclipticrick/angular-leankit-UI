import { Injectable } from '@angular/core';
import {APP_CONFIG} from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly _teams = [];
  private _selectedTeams = [];
  private _selectedTeamId;

  constructor() {
    this._teams = Object.keys(APP_CONFIG.boards).map(key => key.toString());
    this.setSelectedTeams(this._teams.slice());
  }

  getPossibleTeams() {
    return this._teams;
  }

  getSelectedTeams() {
    return this._selectedTeams;
  }

  setSelectedTeams(selectedTeams: any[]) {
    this._selectedTeams = selectedTeams;
    if (this._selectedTeams[0]) this._selectedTeamId = this._selectedTeams[0];
  }

  addToSelectedTeams(teamIdToAdd: string) {
    if (!this._selectedTeams.includes(teamIdToAdd)) {
      this._selectedTeams.push(teamIdToAdd);
    }
  }
  removeFromSelectedTeams(teamIdToRemove: string) {
    this._selectedTeams.filter(teamId => teamId !== teamIdToRemove);
  }

  getSelectedTeam() {
    return this._selectedTeamId;
  }

  setSelectedTeam(selectedTeamId: string) {
    this._selectedTeamId = selectedTeamId;
    this.addToSelectedTeams(selectedTeamId);
  }

}
