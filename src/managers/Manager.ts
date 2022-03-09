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

import {AdvancedCommandHandler} from "../AdvancedCommandHandler";
import {CommandInfo} from "../structs/CommandInfo";
import {AdvancedCommandData} from "../structs/AdvancedCommandData";
import AdvancedCommand from "../structs/AdvancedCommand";

export default class Manager {

    private readonly declare handler: AdvancedCommandHandler;

    constructor(handler: AdvancedCommandHandler) {
        this.handler = handler;
    }

    /**
     * Get a command by name.
     * @param commandName The name of the command to get.
     * @return AdvancedCommand
     */

    public getCommand(commandName: string): AdvancedCommand {
        return this.handler.getCommandMap().get(commandName);
    }

    /**
     * Get all command info.
     * @return CommandInfo[]
     */

    public getAllCommands(): CommandInfo[] {
        let commandData: CommandInfo[] = [];
        this.handler.getCommandMap().forEach(command => {
            commandData.push({name: command.getName(), data: command.getCommandData()})
        });
        return commandData;
    }

    /**
     * Get all command data.
     * @return AdvancedCommandData[]
     */

    public getAllCommandData(): AdvancedCommandData[] {
        let commandData: AdvancedCommandData[] = [];
        for (const data of this.handler.getCommandClasses()) {
            commandData.push(data.getCommandData());
        }
        return commandData;
    }
}