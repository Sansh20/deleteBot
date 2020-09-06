require('dotenv').config();
const Discord = require('discord.js');
const Token = process.env.TOKEN
const Bot= new Discord.Client();

Bot.login(Token)
Bot.on('ready', (client)=>{
    console.log('Logged in as '+ Bot.user.tag)
})

const helpEmbed = new Discord.MessageEmbed()
    .setTitle('Commands: ')
    .setColor('#00FF00')
    .attachFiles(['./res/delete1.gif'])
    .setImage('attachment://delete1.gif')
    .addFields(
        {name: '&del', value: '-user <id>\n -text <text qouted in inverted commas>', inline: true},
        {name: '&help', value: 'List out commands', inline: true}, 
    )
    .setFooter('Note: &del can only be used by Owners/Admins');

const confirmEmbed = new Discord.MessageEmbed()
    .setTitle('Deleting...')
    .setColor('#FF0000')
    .attachFiles(['./res/delete2.gif'])
    .setImage('attachment://delete2.gif');
   
Bot.on('message', (msg)=>{
    var msgText = msg.content.split(' ');
    if(msg.mentions.has(Bot.user)){
        console.log('I only have one pupose, and that is to delete messages');
    }
    switch (msgText[0]) {
        case '&help':
            msg.channel.send(helpEmbed)
            break;
        
        case '&del':
            if(msg.author.id==msg.guild.ownerID){
                switch (msgText[1]) {
                    case '-user':
                        var hello = Bot.channels.cache.get(msg.channel.id).messages
                        console.log(hello)
                        break;
                
                    default:
                        msg.channel.send({embed:{description: 'No method specified, refer &help for more details'}})
                        break;
                }

            }
            break;
    
        default:
            break;
    }
})