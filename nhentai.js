const Discord = require("discord.js");
const client = new Discord.Client();
const nhentai = require('nhentai-js');
const { API } = require('nhentai-api');
const nhentaiAPI = new API();

client.on("message", async message => {

    if (message.author.bot) return;
    if (message.content.startsWith("nh")) {
        var com = message.content
        var comm = com.replace("nh ", "")



     
        await message.channel.send("**Nhentai**").then(async (msg) => {
            if (nhentai.exists(comm)) { 
                const dojin = await nhentai.getDoujin(comm)


                var ddd = dojin.details.tags;
                var tag = JSON.stringify(ddd);

                if (tag.toLowerCase().includes("loli") || tag.toLowerCase().includes("bestiality") || tag.toLowerCase().includes("torture") || tag.toLowerCase().includes("minigirl") || tag.toLowerCase().includes("lolicon") || tag.toLowerCase().includes("blood") || tag.toLowerCase().includes("shotacon") || tag.toLowerCase().includes("lolicon") || tag.toLowerCase().includes("guro") || tag.toLowerCase().includes("cannibalism")) {
                    return;
                }



                api.getBook(comm).then(async book => {
                    n = 0
                    page = api.getImageURL(book.pages[n])




                    const sentEmbed = await message.channel.send(page)
                                await sentEmbed.react('⏪')
                                await sentEmbed.react('⏩')
                                await sentEmbed.react('❎')

                   
                    const filter = (reaction, user) => (['⏪', '⏩', '❎'].includes(reaction.emoji.name) && !user.bot)
                   
                    const collector = sentEmbed.createReactionCollector(filter, {
                        time: 500000
                    }) 

             
                    collector.on("collect", async (reaction, user) => {

                        switch (reaction.emoji.name) {
                            case '⏩':

                                await sentEmbed.reactions.removeAll()
                                await sentEmbed.react('⏪')
                                 await sentEmbed.react('⏩')
                                 await sentEmbed.react('❎')

                                if (n >= 0) {
                                    ++n;


                                    var img = nhentaiAPI.getImageURL(book.pages[n]);



                                    await sentEmbed.edit(img)

                                    return n;
                                }
                                break;
                            case '⏪':

                                await sentEmbed.reactions.removeAll()
                                await sentEmbed.react('⏪')
                                await sentEmbed.react('⏩')
                                await sentEmbed.react('❎')
            
                                if (n > 0) {
                                    --n;


                                    var img = nhentaiAPI.getImageURL(book.pages[n]);


                                    await sentEmbed.edit(img)

                                    return n;
                                }
                                break;
                            case '⚠️':
                                sentEmbed.edit("Ended");
                                await sentEmbed.reactions.removeAll()
                                await sentEmbed.react('⏪')
                                await sentEmbed.react('⏩')
                                await sentEmbed.react('❎')
            
                                break;
                        }
                    });

                   
                    collector.on("end", (collected) => {

                        sentEmbed.edit(
                            `This embed inactive`
                        );

                        sentEmbed.reactions.removeAll(); 
                    });


                   

                })
            }


        })



    }


});

client.login(process.env.TOKEN)
