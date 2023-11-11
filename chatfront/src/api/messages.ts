import { AxiosResponse } from "axios";

import client from ".";

export function getMessages(chatId: string, identifier: string): Promise<AxiosResponse>{
    return client.get(`/conversation/${chatId}/messages?identifier=${identifier}`)
}