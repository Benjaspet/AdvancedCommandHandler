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

import {REST} from "@discordjs/rest";
import {RestPutException} from "../exceptions/DeployException";
import {AdvancedCommandHandler} from "../AdvancedCommandHandler";
import {Client} from "discord.js";
import {Routes} from "discord-api-types/v10";

export default class CommandManager {

    private readonly handler: AdvancedCommandHandler;
    private readonly client: Client;

    constructor(client: Client, handler: AdvancedCommandHandler) {
        this.client = client;
        this.handler = handler;
    }

    /**
     * Deploy all application commands.
     * @param guilds? The array of guilds to delete the commands from. If null, deletes global commands.
     * @return Promise<void>
     */

    public async deployAll(guilds?: string): Promise<void> {
        try {
            if (!guilds.length) {
                const rest: REST = new REST({version: "9"}).setToken(this.client.token);
                await rest.put(Routes.applicationCommands(this.client.user.id), {
                    body: this.handler.getManager().getAllCommandData()
                });
            } else {
                const rest: REST = new REST({version: "9"}).setToken(this.client.token);
                for (const guild of guilds) {
                    await rest.put(Routes.applicationGuildCommands(this.client.user.id, guild), {
                        body: this.handler.getManager().getAllCommandData()
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
}