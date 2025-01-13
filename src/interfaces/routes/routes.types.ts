export interface IRouteDefinition {
  path: TRoutePaths;
  element: React.ReactNode;
  children?: IRouteDefinition[];
}

export enum TRoutePaths {
  DEFAULT = '*',
  ROOT = '/',
  LOGIN = '/login',
  APP = '/app',
  HOME = '/app/home/:city',
  CONTACT = '/app/contact'
}
