import { AxiosResponse } from "axios";
import client from ".";

export function getMessages(chatId: string): Promise<AxiosResponse>{
    return client.get(`/conversation/${chatId}/messages`)
}