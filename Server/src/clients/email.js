import Mailgun from 'mailgun-js'
import { EmailClient as EmailClientConfig } from '../clients/email.js'

export class EmailClient {
    #client

    constructor() {
        this.#client = new Mailgun({
            apiKey: EmailClientConfig.API,
            domain: EmailClientConfig.DOMAIN,
        })
    }

    sendEmailVerficationEmail = ({ email, token, name }) => {
        const payload = {
            from: 'Hiten Vats <hitenvats16@gmail.com>',
            to: [email],
            subject: `Verify your email`,
            template: 'email verification',
            'h:X-Mailgun-Variables': JSON.stringify({
                token,
                email,
                name,
            }),
        }
        return this.#client.messages().send(payload)
    }

    sendPasswordResetEmail = ({ email, token, name }) => {
        const payload = {
            from: 'Hiten Vats <hitenvats16@gmail.com>',
            to: [email],
            subject: `Verify your email`,
            template: 'password reset',
            'h:X-Mailgun-Variables': JSON.stringify({
                email,
                token,
                name,
            }),
        }
        return this.#client.messages().send(payload)
    }
}
