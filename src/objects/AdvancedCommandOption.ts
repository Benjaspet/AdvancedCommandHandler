import {AdvancedCommandChoice} from "../structs/AdvancedCommandChoice";
import {AdvancedCommandOptionData} from "../structs/AdvancedCommandOptionData";
import {InvalidCommandDataException} from "../exceptions/InvalidCommandDataException";
import {ApplicationCommandOptionType} from "discord.js";

export default class AdvancedCommandOption {

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
     * @return AdvancedCommandOption
     */

    public setName(name: string): AdvancedCommandOption {
        this.name = name;
        return this;
    }

    /**
     * Set the description of this command option.
     * @param description The description of the option.
     * @return AdvancedCommandOption
     */

    public setDescription(description: string): AdvancedCommandOption {
        this.description = description;
        return this;
    }

    /**
     * Set the type of this option.
     * @param type The type of this option.
     * @return AdvancedCommandOption
     */

    public setType(type: ApplicationCommandOptionType): AdvancedCommandOption {
        this.type = type;
        return this;
    }

    /**
     * Determine if this option is required or optional.
     * @param required Whether or not this option is required.
     * @return AdvancedCommandOption
     */

    public setRequired(required: boolean): AdvancedCommandOption {
        this.required = required;
        return this;
    }

    /**
     * Determine if this option is autocompletable or not.
     * @param autocomplete Whether or not this option is autocompletable.
     * @return AdvancedCommandOption
     */

    public setAutocompletable(autocomplete: boolean) {
        this.autocomplete = autocomplete;
        return this;
    }

    /**
     * Add an array of choices to this command option.
     * @param choices The array of AdvancedCommandChoices to add.
     * @return AdvancedCommandOption
     */

    public addChoices(choices: AdvancedCommandChoice[]): AdvancedCommandOption {
        for (const choice of choices) {
            this.choices.push(choice)
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