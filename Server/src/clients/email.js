import Mailgun from 'mailgun-js'
import { EmailClient as EmailClientConfig } from '../config.js'

export class EmailClient {
  #client

  constructor() {
    this.#client = new Mailgun({
      apiKey: EmailClientConfig.API,
      domain: EmailClientConfig.DOMAIN,
    })
  }

  sendEmailVerficationEmail = ({ email, token }) => {
    const payload = {
      from: 'Hiten Vats <hitenvats16@gmail.com>',
      to: [email],
      subject: `Verify your email`,
      template: 'meet_schedule',
      'h:X-Mailgun-Variables': JSON.stringify({
        token,
        email,
      }),
    }
    return this.#client.messages().send(payload)
  }

  sendPasswordResetEmail = ({ email, token }) => {
    const payload = {
      from: 'Hiten Vats <hitenvats16@gmail.com>',
      to: [email],
      subject: `Verify your email`,
      template: 'meet_schedule',
      'h:X-Mailgun-Variables': JSON.stringify({
        email,
        token,
      }),
    }
    return this.#client.messages().send(payload)
  }
}
