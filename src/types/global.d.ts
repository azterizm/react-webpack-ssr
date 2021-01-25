import { User as MockUser } from '../utils/mocks'
export = {}

declare global {
  interface Window {
    APP_STATE: {
      name: string,
      user: MockUser,
      flash: Flash
    }
  }

  namespace Express {
    interface User extends MockUser {}
  }
}


