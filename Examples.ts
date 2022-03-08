
import {AdvancedCommandHandler} from "./AdvancedCommandHandler";
import {Client, CommandInteraction, Options} from "discord.js";
import DefaultCommand from "./DefaultCommandBuilder";
import AdvancedCommand from "./structs/AdvancedCommand";
import {IAdvancedCommand} from "./interfaces/IAdvancedCommand";
import DefaultCommandBuilder from "./DefaultCommandBuilder";
import {AdvancedCommandData} from "./structs/AdvancedCommandData";

const client = new Client(Options.createDefault())

class TestCommand extends AdvancedCommand {

    private readonly client: Client;

    constructor(client: Client) {
        const data: AdvancedCommandData = new DefaultCommandBuilder()
            .setName("test")
            .setDescription("testCommand")
            .build()
            .getData();
        super(data.name, data);
        this.client = client;
    }

    public async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.reply({content: "Hello."});
    }

    public getName(): string {
        return this.name;
    }

    public getCommandData(): AdvancedCommandData {
        return this.data;
    }

}

const handler: AdvancedCommandHandler = new AdvancedCommandHandler(client);
handler.register([new TestCommand(client)])
const data = handler.getAllCommandData([new TestCommand(client)])
let d = data[0].options[0].name;