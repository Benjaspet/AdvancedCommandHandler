import {Client, ClientEvents} from "discord.js";

export interface EvenListener {
    name: keyof ClientEvents;
    once: boolean;
    readonly client: Client;
    execute(...args: any): any;
}