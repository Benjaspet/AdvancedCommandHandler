# AdvancedCommandHandler
An advanced command handler for Discord.js.

- Please note: this build is a work-in-progress and is not functional at the moment.

### Example Usage

`BotClient.ts`

```ts
import {Intents} from "discord.js";
import {AdvancedCommandHandler} from "./AdvancedCommandHandler";

const client: Client = new Client({
    intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false,
    }
});

const handler: AdvancedCommandHandler = new AdvancedCommandHandler(client)
    .registerCommands([])

client.login("TOKEN-HERE").then(response => console.log("Logged in!"));

export default {client, handler};
```

`TestCommand.ts`

```ts
import AdvancedCommand from "./AdvancedCommand";
import {IAdvancedCommand} from "./IAdvancedCommand";
import {Client, CommandInteraction} from "discord.js";
import DefaultCommandBuilder from "./DefaultCommandBuilder";

export default class TestCommand extends AdvancedCommand implements IAdvancedCommand {

    private readonly client: Client;

    constructor(client: Client) {
        super("test", 
            new DefaultCommandBuilder()
                .setName("test")
                .setDescription("A test command.")
                .addOption({
                    name: "option1",
                    description: "An option for the test command.",
                    type: "STRING",
                    required: false,
                    autocomplete: false
                })
                .build().getData()
        );
        this.client = client;
    }

    public async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.reply("This is a test command.");
    }
}

```