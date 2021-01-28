import { User as MockUser } from '../utils/mocks'
export = {}

declare global {
  interface Window {
    APP_STATE: AppState
  }

  namespace Express {
    interface User extends MockUser {}
  }
}


