
export interface IAboutMe {
  id?: any;               // default UID
  type?: string | any;    // if resources differ
  body?: string;          // main text content
  target?: string | any;  // if there's a URL or target string
  abstract?: string;      // plain text
  index?: number;         // in case ordering is required

}
