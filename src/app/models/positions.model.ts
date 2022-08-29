/* -------------------------------------------------------------------------- */
/*                                  POSITIONS                                 */
/* -------------------------------------------------------------------------- */
/* -------------------------------- INTERFACE ------------------------------- */
export interface IPosition {
  id: number;
  title: string;
  company: string;
  tenure: string;
}
/* ---------------------------------- CLASS --------------------------------- */
export class Position {
  private _id!: number;
  private _title!: string;
  private _company!: string;
  private _tenure!: string;
  private _position!: IPosition;

  constructor(positionData: IPosition) {
    this._id = positionData.id;
    this._title = positionData.title;
    this._company = positionData.company;
    this._tenure = positionData.tenure;
    this._position = positionData;
  }


  get position() {
    return this._position;
  }
}
export class Positions {
  private _positions!: IPosition[];

  constructor(positionsArray: IPosition[]) {
    this._positions = positionsArray;
  }

  get positions() {
    return this._positions;
  }
}
/* -------------------------------------------------------------------------- */
/*                                  USE-CASES                                 */
/* -------------------------------------------------------------------------- */
/* -------------------------------- INTERFACE ------------------------------- */
export interface IUseCase {
  id: number;
  name: string;
  parentCompany: string;
  description?: string;
  isDevelopment: boolean;
  icon: string;
  projectIds: [number];
  projects?: IProject[]; // for template
}
/* ---------------------------------- CLASS --------------------------------- */
export class UseCase {
  private _id!: number;
  private _name!: string;
  private _parentCompany!: string;
  private _description!: string | undefined;
  private _isDevelopment!: boolean;
  private _icon!: string;
  private _projectIds!: [number];
  private _projects!: IProject[] | undefined;

  private _useCase!: IUseCase;

  constructor(useCaseData: IUseCase) {
    this._id = useCaseData.id;
    this._name = useCaseData.name;
    this._parentCompany = useCaseData.parentCompany;
    this._description = useCaseData.description;
    this._isDevelopment = useCaseData.isDevelopment;
    this._icon = useCaseData.icon;
    this._projectIds = useCaseData.projectIds;
    this._useCase = useCaseData;
  }

  get useCase() { return this._useCase; }
}
export class UseCases {
  private _useCases!: IUseCase[];

  constructor(useCaseData: IUseCase[]) {
    this._useCases = useCaseData;
  }

  get useCases() {
    return this._useCases;
  }
}

/* -------------------------------------------------------------------------- */
/*                                  PROJECTS                                  */
/* -------------------------------------------------------------------------- */
/* -------------------------------- INTERFACE ------------------------------- */
export interface IProject {
  id: number;
  name: string;
  parentCompany: string;
  description?: string;
  isDevelopment: boolean;
  isOpen: boolean;
  contents?: string;
  targetLabel: string;
  target: string;
  galleryImages?: [string];
}
/* ---------------------------------- CLASS --------------------------------- */
export class Project {
  private _project!: IProject;
  private _id!: number;
  private _name!: string;
  private _parentCompany!: string;
  private _description!: string | undefined;
  private _isDevelopment!: boolean;
  private _isOpen!: boolean;
  private _contents!: string | undefined;
  private _targetLabel!: string;
  private _target!: string;
  private _galleryImages!: [string];

  constructor(projectVal: IProject) {
    this._project = projectVal;
  }
}
export class Projects {
  private _projects!: IProject[];
  constructor(projectsVals: IProject[]) {
    this._projects = projectsVals;
  }

  get projects() {
    return this._projects;
  }
}
