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
import {AdvancedCommandOptions} from "./structs/AdvancedCommandOptions";
import AdvancedCommand from "./structs/AdvancedCommand";
import CommandInteractionEvent from "./events/CommandInteractionEvent";
import Manager from "./managers/Manager";

export class AdvancedCommandHandler {

    private commandClasses: AdvancedCommand[] = [];
    private commands: Collection<string, AdvancedCommand> = new Collection<string, AdvancedCommand>();
    private options: AdvancedCommandOptions;
    private readonly declare manager: Manager;
    private readonly declare client: Client;

    constructor(client: Client, options: AdvancedCommandOptions) {
        this.client = client;
        this.manager = new Manager(this);
        this.client.once("ready", () => {
            new CommandInteractionEvent(client, "interactionCreate", false, this);
        });
        this.options = {
            mongoUri: options.mongoUri ? options.mongoUri : null,
            debugMode: options.debugMode ? options.debugMode : false
        };
    }

    /**
     * Get the array of AdvancedCommand instances for this handler.
     * @return AdvancedCommand[]
     */

    public getCommandClasses(): AdvancedCommand[] {
        return this.commandClasses;
    }

    /**
     * Get the command map for this instance.
     * @return Collection<string, AdvancedCommand>
     */

    public getCommandMap(): Collection<string, AdvancedCommand> {
        return this.commands;
    }

    /**
     * Get the command handler manager.
     * @return Manager
     */
    
    public getManager(): Manager {
        return this.manager;
    }

    /**
     * Get the options for the command handler.
     * @return AdvancedCommandOptions
     */

    public getOptions(): AdvancedCommandOptions {
        return this.options;
    }
}