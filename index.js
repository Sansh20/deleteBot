require('dotenv').config();
const Discord = require('discord.js');
const Token = process.env.TOKEN;
const Bot= new Discord.Client();

Bot.login(Token)
Bot.on('ready', (client)=>{
    console.log('Logged in as '+ Bot.user.tag);
    Bot.user.setStatus('idle');
})

const helpEmbed = new Discord.MessageEmbed()
    .setTitle('Commands: ')
    .setColor('#00FF00')
    .attachFiles(['./res/delete1.gif'])
    .setImage('attachment://delete1.gif')
    .addFields(
        {name: 'Unleash me and I shall DELETE', value: '---------------------------------------'},
        {name: '&del', value: '-userTag <mention user>\n -userName <Username>\n -text <text>', inline: true},
        {name: '&help', value: 'List out commands', inline: true}, 
    )
    .setFooter('Note: &del can only be used by Owners/Admins');

function confirmation(title){
    const confirmEmbed = new Discord.MessageEmbed()
        .setTitle(title)
        .setColor('#FF0000')
        .attachFiles(['./res/delete2.gif'])
        .setImage('attachment://delete2.gif');
    return confirmEmbed;
}
   

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
                let chnl = Bot.channels.cache.get(msg.channel.id);
                switch (msgText[1]) {
                    case '-userTag':
                        var userID = msgText[2].substring(3, msgText[2].length-1)
                        var userName;
                        Bot.user.setStatus('online');
                        Bot.users.fetch(userID).then(user=> userName=user.username).catch(console.log)
                        chnl.messages.fetch({ limit: 99 }).then(msgs => {
                            msg.channel.send(confirmation('Deleting messages from '+userName+'...'))
                            msgs.map(cb=>{
                                if(cb.author.id==userID){
                                    cb.delete();
                                }
                            })
                        })
                        break;
                    case '-userName':
                        Bot.user.setStatus('online');
                        chnl.messages.fetch({ limit: 99 }).then(msgs => {
                            msg.channel.send(confirmation('Deleting messages from '+msgText[2]+'...'))
                            msgs.map(cb=>{
                                if(cb.author.username==msgText[2]){
                                    cb.delete();
                                }
                            })
                        })
                        break;
                    case '-text':
                        Bot.user.setStatus('online');
                        msg.channel.send(confirmation('Deleting messages starting with "'+msgText[2]+'"...'))
                        chnl.messages.fetch({limit: 99}).then(msgs => {
                            msgs.map(cb=>{
                                if(cb.content.startsWith(msgText[2])){
                                    cb.delete();
                                }
                            })
                        })
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
    Bot.user.setStatus('idle');
})