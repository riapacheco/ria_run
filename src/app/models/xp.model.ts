/**
 * @table     'companies'
 * @desc      Employer
 *            Has one-to-many relationship with Product Experiences
 *            Has one-to-many relationship with Development Experience
 */
export interface ICompany {
  id?: number;
  index: number;
  name: string;
  jobTitle?: string;
  tenure: string;
  blurb?: string;
  productMgmtIds: [number];
  devProjectIds: [number];
}

/**
 * @table     'product_mgmt'
 * @desc      Product Experience [projects]
 */
export interface IProductMgmt {
  id?: number | any;
  name: string;
  description?: string;
  mainImage?: string;
  imageGallery?: [string];
  targetUrl?: string;
  outcome?: string;
}

/**
 * @table     'dev_projects'
 * @desc      Development experience [projects]
 */
export interface IDevProjects {
  id?: number | any;
  name: string;
  description?: string;
  mainImage?: string;
  imageGallery?: [string];
  targetUrl?: string;
  outcome?: string;
}
