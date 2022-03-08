/*
 * Copyright © 2022 Ben Petrillo. All rights reserved.
 *
 * Project licensed under the MIT License: https://www.mit.edu/~amini/LICENSE.md
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * All portions of this software are available for public use, provided that
 * credit is given to the original author(s).
 */

import {Client, Collection} from "discord.js";
import {REST} from "@discordjs/rest";
import {Routes} from "discord-api-types";
import {AdvancedCommandData} from "./structs/AdvancedCommandData";
import {CommandInfo} from "./structs/CommandInfo";
import {RestPutException} from "./exceptions/DeployException";
import AdvancedCommand from "./structs/AdvancedCommand";
import CommandInteractionEvent from "./events/CommandInteractionEvent";

export class AdvancedCommandHandler {

    private commands: Collection<string, AdvancedCommand> = new Collection<string, AdvancedCommand>();
    private commandClasses: AdvancedCommand[] = [];
    private readonly client: Client;

    constructor(client: Client) {
        this.client = client;
        this.client.once("ready", () => {
            new CommandInteractionEvent(client, "interactionCreate", false);
        });
    }

    public getClient(): Client {
        return this.client;
    }

    public registerCommands(commands: AdvancedCommand[]): AdvancedCommandHandler {
        for (const command of commands) {
            this.commands.set(command.getName(), command);
            this.commandClasses.push(command);
        }
        return this;
    }

    public getCommand(commandName: string) {
        return this.commands.get(commandName);
    }

    public getAllCommands(): CommandInfo[] {
        let commandData: CommandInfo[] = [];
        this.commands.forEach(command => {
            commandData.push({name: command.getName(), data: command.getCommandData()})
        });
        return commandData;
    }

    /**
     * Delete all application commands.
     * @param guilds? The array of guilds to delete the commands from. If null, deletes global commands.
     * @return Promise<void>
     */

    public async deployAll(guilds?: string): Promise<void> {
        try {
            if (!guilds.length) {
                const rest: REST = new REST({version: "9"}).setToken(this.client.token);
                await rest.put(Routes.applicationCommands(this.client.user.id), {
                    body: this.getAllCommandData(this.commandClasses)
                });
            } else {
                const rest: REST = new REST({version: "9"}).setToken(this.client.token);
                for (const guild of guilds) {
                    await rest.put(Routes.applicationGuildCommands(this.client.user.id, guild), {
                        body: this.getAllCommandData(this.commandClasses)
                    });
                }
            }
        } catch (error: any) {
            throw new RestPutException();
        }
    }

    /**
     * Delete all application commands.
     * @param guilds? The array of guilds to delete the commands from. If null, deletes global commands.
     * @return Promise<void>
     */

    public async deleteAll(guilds?: string[]): Promise<void> {
        try {
            if (!guilds.length) {
                const rest = new REST({version: "9"}).setToken(this.client.token);
                await rest.put(Routes.applicationCommands(this.client.user.id), {
                    body: []
                });
            } else {
                const rest = new REST({version: "9"}).setToken(this.client.token);
                for (const guild of guilds) {
                    await rest.put(Routes.applicationGuildCommands(this.client.user.id, guild), {
                        body: []
                    });
                }
            }
        } catch (error: any) {
            throw new RestPutException();
        }
    }

    public getAllCommandData(commands: AdvancedCommand[]): AdvancedCommandData[] {
        let commandData: AdvancedCommandData[] = [];
        for (const data of commands) {
            commandData.push(data.getCommandData())
        }
        return commandData;
    }
}