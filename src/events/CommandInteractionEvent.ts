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

import {EvenListener} from "../interfaces/EvenListener";
import {Client, ClientEvents, Interaction} from "discord.js";
import {AdvancedCommandHandler} from "../AdvancedCommandHandler";
import AdvancedCommand from "../structs/AdvancedCommand";

export default class CommandInteractionEvent implements EvenListener {

    public declare name: keyof ClientEvents;
    public declare once: boolean;
    public readonly declare client: Client;

    constructor(client: Client, name: keyof ClientEvents, once: boolean) {
        this.name = name;
        this.once = once;
        this.client = client;
    }

    public async execute(interaction: Interaction): Promise<void> {
        if (interaction.isCommand()) {
            const name: string = interaction.commandName;
            const command: AdvancedCommand = new AdvancedCommandHandler(this.client).getManager().getCommand(name);
            if (command != null) {
                command.execute(interaction);
            }
        }
    }
}