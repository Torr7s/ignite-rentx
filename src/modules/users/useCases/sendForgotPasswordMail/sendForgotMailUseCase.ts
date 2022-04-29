import { injectable } from 'tsyringe';

@injectable()
class SendForgotMailUseCase {
  async perform(email: string) {
    
  }
}

export { SendForgotMailUseCase }