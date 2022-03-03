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

import {AdvancedCommandData} from "./structs/AdvancedCommandData";
import {InvalidCommandDataException} from "./exceptions/InvalidCommandDataException";
import {AdvancedCommandOptionData} from "./structs/AdvancedCommandOptionData";

export default class DefaultCommandBuilder {

    private name: string;
    private description: string;
    private options: AdvancedCommandOptionData[];
    private data: AdvancedCommandData;

    constructor() {}

    /**
     * Set the name of this command instance.
     * @param name
     * @return DefaultCommand
     */

    public setName(name: string): DefaultCommandBuilder {
        this.name = name;
        return this;
    }

    /**
     * Set the description of this command instance.
     * @param description
     * @return DefaultCommand
     */

    public setDescription(description: string): DefaultCommandBuilder {
        this.description = description;
        return this;
    }

    /**
     * Add a singular option to this command.
     * @param option
     * @return DefaultCommand
     */

    public addOption(option: AdvancedCommandOptionData): DefaultCommandBuilder {
        this.options.push(option);
        return this;
    }

    /**
     * Add an array of options to this command.
     * @param options
     * @return DefaultCommand
     */

    public addOptions(options: AdvancedCommandOptionData[]): DefaultCommandBuilder {
        for (const option of options) {
            this.options.push(option);
        }
        return this;
    }

    /**
     * Build this command instance.
     * @return void
     * @throws InvalidCommandDataException
     */

    public build(): DefaultCommandBuilder {
        if (!this.name || !this.description) {
            throw new InvalidCommandDataException();
        }
        if (this.options.length !> 0) {
            this.data = {
                name: this.name,
                description: this.description
            };
        } else {
            this.data = {
                name: this.name,
                description: this.description,
                options: this.options
            };
        }
        return this;
    }

    public getData(): AdvancedCommandData {
        return this.data;
    }
}