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

export default class DefaultCommand {

    private name: string;
    private description: string;
    private data: AdvancedCommandData;

    constructor() {}

    /**
     * Set the name of this command instance.
     * @param name
     * @return DefaultCommand
     */

    public setName(name: string): DefaultCommand {
        this.name = name;
        return this;
    }

    /**
     * Set the description of this command instance.
     * @param description
     * @return DefaultCommand
     */

    public setDescription(description: string): DefaultCommand {
        this.description = description;
        return this;
    }

    /**
     * Build this command instance.
     * @return void
     * @throws InvalidCommandDataException
     */

    public build(): void {
        if (!this.name || !this.description) {
            throw new InvalidCommandDataException();
        }
        this.data = {
            name: this.name,
            description: this.description
        };
    }

    public getData(): AdvancedCommandData {
        return this.data;
    }
}