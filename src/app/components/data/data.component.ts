import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IUseCase } from 'src/app/models/positions.model';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  @Output() useCaseData: EventEmitter<any> = new EventEmitter<any>();

  useCases: IUseCase[] = [
    {
      id: 1,
      name: 'Enterprise Portfolio ReLaunch',
      parentCompany: 'Cold Bore Technology',
      description: '',
      isDevelopment: false,
      icon: 'rocket_launch',
      projectIds: [0],
      projects: [
        {
          id: 1,
          name: 'Portfolio Strategy',
          parentCompany: 'Cold Bore Technology',
          description: `Completely owned and executed full enterprise product portfolio relaunch, re-positioning flagship product (SmartPad) to include all sensor-to-cloud capabilities, the inclusion of underpromoted data products (under new product line <i>ColdEDGE Web Services</i>), and legacy downhole acoustic monitoring product (<i>IntelliSONIC</i>), resulting in immediate customer self-upselling`,
          isDevelopment: false,
          isOpen: true,
          contents: `
            <h4 class="mb-2 mt-2 ml-1">SmartPAD Flagship Product</h4>
            <div class="mb-3 ml-1">
              Re-Positioned to include all Sensor-to-Cloud Capabilities
            </div>
            <div class="flex-row nowrap align-start justify-between ml-4">
              <img class="mr-2" width="400px" src="../../../assets/img/about_me/About_DataSheets1.png" alt=""/>
              <img width="400px" src="../../../assets/img/about_me/About_DataSheets_2.png" alt=""/>
            </div>
            <br>
            <br>
            <br>
            <br>
            <h4 class="mb-2 mt-2 ml-1">ColdEDGE Web Services Product</h4>
            <div class="mb-3 ml-1">
              New product line that includes all previously missed data products
            </div>
            <div class="flex-row nowrap align-start justify-between ml-4 pb-10">
              <img class="mr-2" width="400px" src="../../../assets/img/about_me/About_DataSheets_3.png" alt=""/>
              <img width="400px" src="../../../assets/img/about_me/About_DataSheets_4.png" alt=""/>
            </div>
          `,
          targetLabel: 'Data sheets',
          target: 'Portfolio Re-Launch',
          galleryImages: ['']
        },
        {
          id: 3,
          name: 'Elements Scan',
          parentCompany: 'Cold Bore Technology',
          description: 'Performed internal and external scan of all product elements, features, and capabilities for proper inclusion of all sensor-to-cloud features based on market, business, and customer needs.',
          isDevelopment: false,
          isOpen: true,
          contents: `

            <h4 class="ml-3 mb-3">Core Content</h4>
            <img class="mb-4 ml-2" src="../../../assets/img/about_me/featureRepo.gif" alt="" />

            <h4 class="ml-3 mb-3">Applied to Sales Use-Cases</h4>
            <img class="mb-4 ml-2" src="../../../assets/img/about_me/QueryMarketingList.jpg" alt=""/>
          `,
          targetLabel: 'View examples',
          target: 'Segmented Product Elements',
          galleryImages: ['']
        },
        {
          id: 4,
          name: 'Discovery Activities',
          parentCompany: 'Cold Bore Technology',
          description: `Leveraged market, department vertical, and innovation type research against interview insights for product development and portfolio governance`,
          isDevelopment: false,
          isOpen: true,
          contents: `
            <div class="ml-2 mb-3 mt-4">
              Gathered from accumulated years of experience
            </div>

            <img src="../../../assets/img/about_me/marketPatterns1.jpeg" alt=""/>
          `,
          targetLabel: 'View framework',
          target: 'Market Patterns',
          galleryImages: ['']
        }
      ]
    },
    {
      id: 3,
      name: 'Asset Tracker (internal) App',
      parentCompany: 'Cold Bore Technology',
      description: '',
      isDevelopment: true,
      icon: 'code',
      projectIds: [0],
      projects: [
        {
          id: 4,
          name: 'Data Modelling',
          parentCompany: 'Cold Bore Technology',
          description: 'Re-modelled legacy data schema for effective mapping against existing database infrastructure, user workflows, and to enable frontend application performance',
          isDevelopment: true,
          isOpen: true,
          contents: `<img src="../../../assets/img/about_me/About_AssetTrackerModel.png" alt=""/>`,
          targetLabel: 'View ERD',
          target: 'Entity Relationship Diagram',
          galleryImages: ['']
        },
        {
          id: 5,
          name: 'Inventory Mgmt',
          parentCompany: 'Cold Bore Technology',
          description: `Scoped and developed application's Inventory Manager module to enable hardware management team members with full (user-friendly) CRUD capabilities and visibility for in-field hardware locations`,
          isDevelopment: true,
          isOpen: true,
          contents: `<img src="../../../assets/img/about_me/createAsset_Tracker.gif" alt=""/>`,
          targetLabel: 'View screenshot',
          target: 'Inventory Manager: Create',
          galleryImages: ['']
        },
        {
          id: 6,
          name: 'Lab Kanban',
          parentCompany: 'Cold Bore Technology',
          description: '',
          isDevelopment: true,
          isOpen: true,
          contents: `<img src="../../../assets/img/about_me/labKanban.gif" alt="" />`,
          targetLabel: 'View screenshot',
          target: 'Lab Kanban: Pre-Draft Permitted Only',
          galleryImages: ['']
        }
      ]
    },
    {
      id: 4,
      name: 'Scrum Transition',
      parentCompany: 'Mydoma Studio',
      description: '',
      isDevelopment: false,
      icon: '',
      projectIds: [0],
      projects: [
        {
          id: 8,
          name: 'Audit and Pitch',
          parentCompany: 'Mydoma Studio',
          description: 'Audited utilized methods & approaches to develop proposal on dev team transitions (accepted)',
          isDevelopment: false,
          isOpen: true,
          contents: ``,
          targetLabel: 'View pitch',
          target: '',
          galleryImages: ['']
        },
        {
          id: 9,
          name: 'DoD Implementation',
          parentCompany: 'Mydoma Studio',
          description: 'Implemented full scrum DoD framework with software team enabling team member successive growth and an increased output of ~400%',
          isDevelopment: false,
          isOpen: true,
          contents: ``,
          targetLabel: 'View summary',
          target: '',
          galleryImages: ['']
        }
      ]
    },
    {
      id: 5,
      name: 'Hands-On Dev',
      parentCompany: 'Mydoma Studio',
      description: '',
      isDevelopment: true,
      icon: 'code',
      projectIds: [0],
      projects: [
        {
          id: 10,
          name: 'Flutter Frontend UI',
          parentCompany: 'Mydoma Studio',
          description: 'Refined and developed frontend UI components prior to each sprint end',
          isDevelopment: true,
          isOpen: true,
          contents: ``,
          targetLabel: 'View examples',
          target: ``
        },
        {
          id: 11,
          name: 'Backend Unit Test Writing',
          parentCompany: 'Mydoma Studio',
          description: 'Wrote backend NodeJS unit tests utilizing postman services / swagger documentation to assist backend team',
          isDevelopment: true,
          isOpen: true,
          contents: ``,
          targetLabel: 'View examples',
          target: ``
        },
        {
          id: 12,
          name: 'Complete UI Design',
          parentCompany: 'Mydoma Studio',
          description: 'Completely re-designed user interface for v3 implementation (AdobeXD)',
          isDevelopment: true,
          isOpen: true,
          contents: ``,
          targetLabel: 'View examples',
          target: ``
        }
      ]
    }
  ];
  constructor() { }

  ngOnInit(): void {
    this.useCaseData.emit(this.useCases);
  }

}
