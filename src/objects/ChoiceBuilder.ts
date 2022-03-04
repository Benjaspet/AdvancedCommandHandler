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
import {InvalidCommandDataException} from "../exceptions/InvalidCommandDataException";

export default class ChoiceBuilder {

    private choices: AdvancedCommandChoice[];

    constructor() {}

    /**
     * Add a singular choice to an option.
     * @param name The name of the choice.
     * @param value The value returned by the choice.
     * @return ChoiceBuilder
     */

    public addChoice(name: string, value: string|number|boolean): ChoiceBuilder {
        this.choices.push({name: name, value: value});
        return this;
    }

    /**
     * Add multiple choices to an option.
     * @param choices The array of choices to add.
     * @return ChoiceBuilder
     */

    public addChoices(choices: AdvancedCommandChoice[]): ChoiceBuilder {
        for (const choice of choices) {
            this.choices.push(choice);
        }
        return this;
    }

    /**
     * Build these command choices.
     * @return AdvancedCommandChoice[]
     */

    public build(): AdvancedCommandChoice[] {
        if (!this.choices.length) {
            throw new InvalidCommandDataException();
        }
        return this.choices;
    }
}