# AdvancedCommandHandler
An advanced command handler for Discord.js.

- Please note: this build is a work-in-progress and is not functional at the moment.

### Example Usage

`BotClient.ts`

```ts
import {Intents} from "discord.js";
import {AdvancedCommandHandler} from "./AdvancedCommandHandler";
import TestCommand from "./TestCommand";

const client: Client = new Client({
    intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false,
    }
});

const handler: AdvancedCommandHandler = new AdvancedCommandHandler(client)
    .registerCommands([new TestCommand(client)])

client.login("TOKEN-HERE").then(response => console.log("Logged in!"));

export default {client, handler};
```

`TestCommand.ts`

```ts
import AdvancedCommand from "./AdvancedCommand";
import {IAdvancedCommand} from "./IAdvancedCommand";
import {Client, CommandInteraction} from "discord.js";
import CommandBuilder from "./CommandBuilder";
import OptionBuilder from "./OptionBuilder";

export default class TestCommand extends AdvancedCommand implements IAdvancedCommand {

    private readonly client: Client;

    constructor(client: Client) {
        super("test",
            new CommandBuilder()
                .setName("test")
                .setDescription("A test command.")
                .addOption(
                    new OptionBuilder()
                        .setName("option1")
                        .setDescription("An option for the test command.")
                        .setType("STRING")
                        .setRequired(true)
                        .setAutocompletable(false)
                        .addChoices([])
                        .build()
                ).build().getData());
        this.client = client;
    }

    public async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.reply("This is a test command.");
    }
}

```

## Documentation 

### Classes

`AdvancedCommandHandler`
- Create a new instance of the command handler.

#### Constructor

```ts
new AdvancedCommandHandler(client);
```

Parameter | Type | Description
:---: | :---: | :---: |
`client` | `Discord.Client` | The Discord client to use. |

### Methods

### `getCommand(): AdvancedCommand`
- Get a command by name.

Parameter | Type | Description
:---: | :---: | :---: |
`commandName` | `string` | The `AdvancedCommand` to fetch, by name. |

#### Returns: `AdvancedCommand`

### `deployAll(): Promise<void>`
- Deploy all application commands.

Parameter | Type | Description
:---: | :---: | :---: |
| `commands` | `AdvancedCommand[]` | The `AdvancedCommand` instances to deploy. |
| `guilds?` | `string[]` | The guilds to deploy the commands to. |

#### Returns: `Promise<void>`

### `deleteAll(): Promise<void>`
- Delete all application commands.

Parameter | Type | Description
:---: | :---: | :---: |
| `guilds?` | `string[]` | The guilds to delete the commands from. |

#### Returns: `Promise<void>`

### `registerCommands(): AdvancedCommandHandler`
- Register a list of commands to the handler.

Parameter | Type | Description
:---: | :---: | :---: |
| `commands` | `AdvancedCommand[]` | The command classes to register. |

#### Returns: `AdvancedCommandHandler`