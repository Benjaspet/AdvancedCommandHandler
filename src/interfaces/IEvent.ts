import {Client, ClientEvents} from "discord.js";

export interface IEvent {
    name: keyof ClientEvents;
    once: boolean;
    readonly client: Client;
    execute(...args: any): any;
}