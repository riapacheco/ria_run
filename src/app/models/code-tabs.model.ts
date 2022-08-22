

/* -------------------------------- INTERFACE ------------------------------- */
export interface ICodeTab {
  id?: number | any;
  component: string;
  language: string;
  description?: string;
  fileName: string;
  code: string;
  stackBlitzLink?: string;
  previewLink?: string;
}

export class CodeTabsState {
  private _allTabData: ICodeTab[] = [];
  private _indicatorTabData: ICodeTab[] = [];
  private _htmlData!: ICodeTab | undefined;
  private _typescriptData!: ICodeTab | undefined;
  private _scssData!: ICodeTab | undefined;

  constructor(allCodeTabs: ICodeTab[]) {
    const tabData = [...allCodeTabs];
    this._allTabData = tabData;   // All data

    const indicatorCardsData = tabData.filter((codeTab: ICodeTab) => codeTab.code == 'Indicator Card');
    if (indicatorCardsData !== undefined) { this._indicatorTabData = indicatorCardsData; }
  }

  getAllTabData() {
    return this._allTabData;
  }
  getIndicatorTabData() {
    return this._indicatorTabData;
  }

  getLanguageType(componentName: string, languageType: string) {
    const langType = languageType.toLowerCase();
    const indicatorCard = (componentName == 'Indicator Card');
    const isHtml = (langType == 'html');
    const isTypescript = (langType == 'typescript');
    const isScss = (langType == 'scss');

    switch (true) {
      case indicatorCard && isHtml:
        this._htmlData = this._indicatorTabData.find((data: any) => data.language == langType);
        return this._htmlData;
        break;
      case indicatorCard && isTypescript:
        this._typescriptData = this._indicatorTabData.find((data: any) => data.language == langType);
        return this._typescriptData;
        break;
      case indicatorCard && isScss:
        this._scssData = this._indicatorTabData.find((data: any) => data.language == langType);
        return this._scssData;
        break;
    }
  }


}
