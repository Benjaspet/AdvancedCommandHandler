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

import {AdvancedCommandChoice} from "../structs/AdvancedCommandChoice";
import {AdvancedCommandOptionData} from "../structs/AdvancedCommandOptionData";
import {InvalidCommandDataException} from "../exceptions/InvalidCommandDataException";
import {ApplicationCommandOptionType} from "discord.js";

export default class OptionBuilder {

    private name: string;
    private description: string;
    private type: ApplicationCommandOptionType;
    private required: boolean = true;
    private autocomplete: boolean = false;
    private choices: AdvancedCommandChoice[] = [];

    constructor() {}

    /**
     * Set the name of this command option.
     * @param name The name of the option.
     * @return OptionBuilder
     */

    public setName(name: string): OptionBuilder {
        this.name = name;
        return this;
    }

    /**
     * Set the description of this command option.
     * @param description The description of the option.
     * @return OptionBuilder
     */

    public setDescription(description: string): OptionBuilder {
        this.description = description;
        return this;
    }

    /**
     * Set the type of this option.
     * @param type The type of this option.
     * @return OptionBuilder
     */

    public setType(type: ApplicationCommandOptionType): OptionBuilder {
        this.type = type;
        return this;
    }

    /**
     * Determine if this option is required or optional.
     * @param required Whether or not this option is required.
     * @return OptionBuilder
     */

    public setRequired(required: boolean): OptionBuilder {
        this.required = required;
        return this;
    }

    /**
     * Determine if this option is autocompletable or not.
     * @param autocomplete Whether or not this option is autocompletable.
     * @return OptionBuilder
     */

    public setAutocompletable(autocomplete: boolean) {
        this.autocomplete = autocomplete;
        return this;
    }

    /**
     * Add an array of choices to this command option.
     * @param choices The array of AdvancedCommandChoices to add.
     * @return OptionBuilder
     */

    public addChoices(choices: AdvancedCommandChoice[]): OptionBuilder {
        for (const choice of choices) {
            this.choices.push(choice);
        }
        return this;
    }

    /**
     * Build this command option.
     * @return AdvancedCommandOptionData
     */

    public build(): AdvancedCommandOptionData {
        if (!this.name || !this.description) {
            throw new InvalidCommandDataException();
        }
        return {
            name: this.name,
            description: this.description,
            type: this.type,
            required: this.required,
            autocomplete: this.autocomplete,
            choices: this.choices
        };
    }
}