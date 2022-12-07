const { Scenes, session, Telegraf, Markup } = require('telegraf');
require('dotenv').config()
const { enter, leave } = Scenes.Stage;

const getinf = new Scenes.BaseScene("getinf");

getinf.enter(async ctx => {
    try {
        let indb = await collection.findOne({user_id: ctx.from.id}) /* compleated: [], onwex: 0 */
        
        if (indb == null) {
            await collection.insertOne({user_id: ctx.from.id})
        }else {
            return
        }            
        
        let qf = await ctx.replyWithHTML('Привет! Выберите пожалуйста язык программирования, по которому я смогу присылать вам задачи.', Markup.inlineKeyboard([
            [Markup.button.callback('JavaScript', 'js')]
        ]))

        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {qf: qf.message_id}})
    }catch(e) {
        console.error(e);
    }
})

getinf.action('js', async ctx => {
    try {
        let usdb = await collection.findOne({user_id: ctx.from.id})
        await ctx.deleteMessage(usdb.qf)
        await collection.findOneAndUpdate({user_id: ctx.callbackQuery.from.id}, {$set: {programlang: 'JS'}})
        await collection.findOneAndUpdate({user_id: ctx.callbackQuery.from.id}, {$set:  {onwex: 0}})
        await ctx.scene.enter('getinfperiode')
        await ctx.answerCbQuery()
    }catch(e) {
        console.error(e);
    }
})

getinf.on("message", async ctx => {
    try {
        await ctx.scene.enter('getinf')
    }catch(e) {
        console.error(e);
    }
})

getinf.leave(async ctx => {
    try {
        let usdb = await collection.findOne({user_id: ctx.from.id})
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$unset: {qf: usdb.qf}})
    }catch(e) {
        console.error(e);
    }
})

const getinfperiode = new Scenes.BaseScene("getinfperiode");

getinfperiode.enter(async ctx => {
    try {
        let qs = await ctx.replyWithHTML('Настройте периодичность получения новых задач:', Markup.inlineKeyboard([
            [Markup.button.callback('Раз в день', 'onceaday')],
            [Markup.button.callback('Раз в 2 дня', 'onceatwoday')],
            [Markup.button.callback('Раз в 3 дня', 'onceathreeday')]
        ]))
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {qs: qs.message_id}})
    }catch(e) {
        console.error(e);
    }
})

getinfperiode.action('onceaday', async ctx => {
    try {
        let usdb = await collection.findOne({user_id: ctx.from.id})
        await ctx.deleteMessage(usdb.qs)
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {frequency: 1}})
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {dattosend: 1}})
        await ctx.scene.enter('exerquat')
        await ctx.answerCbQuery()
    }catch(e) {
        console.error(e);
    }
})

getinfperiode.action('onceatwoday', async ctx => {
    try {
        let usdb = await collection.findOne({user_id: ctx.from.id})
        await ctx.deleteMessage(usdb.qs)
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {frequency: 2}})
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {dattosend: 2}})
        await ctx.scene.enter('exerquat')
        await ctx.answerCbQuery()
    }catch(e) {
        console.error(e);
    }
})

getinfperiode.action('onceathreeday', async ctx => {
    try {
        let usdb = await collection.findOne({user_id: ctx.from.id})
        await ctx.deleteMessage(usdb.qs)
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {frequency: 3}})
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {dattosend: 3}})
        await ctx.scene.enter('exerquat')
        await ctx.answerCbQuery()
    }catch(e) {
        console.error(e);
    }
})

getinfperiode.on("message", async ctx => {
    try {
        await ctx.scene.enter('getinfperiode')
    }catch(e) {
        console.error(e);
    }
})

getinfperiode.leave(async ctx => {
    try {
        let usdb = await collection.findOne({user_id: ctx.from.id})
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$unset: {qs: usdb.qs}})
    }catch(e) {
        console.error(e);
    }
})


const exerquat = new Scenes.BaseScene("exerquat");

exerquat.enter(async ctx => {
    try {
        let qt = await ctx.replyWithHTML(' Настройте периодичность получения новых задач:', Markup.inlineKeyboard([
            [Markup.button.callback('1 задача', 'oncex')],
            [Markup.button.callback('3 задачи', 'threeex')],
            [Markup.button.callback('5 задач', 'fiveex')]
        ]))
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {qt: qt.message_id}})
    }catch(e) {
        console.error(e);
    }
})

exerquat.action('oncex', async ctx => {
    try {
        let usdb = await collection.findOne({user_id: ctx.from.id})
        await ctx.deleteMessage(usdb.qt)
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {exerquat: 1}})
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {sendedex: 0}})
        await ctx.scene.leave('exerquat')
        await ctx.answerCbQuery()
    }catch(e) {
        console.error(e);
    }
})

exerquat.action('threeex', async ctx => {
    try {
        let usdb = await collection.findOne({user_id: ctx.from.id})
        await ctx.deleteMessage(usdb.qt)
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {exerquat: 3}})
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {sendedex: 0}})
        await ctx.scene.leave('exerquat')
        await ctx.answerCbQuery()
    }catch(e) {
        console.error(e);
    }
})

exerquat.action('fiveex', async ctx => {
    try {
        let usdb = await collection.findOne({user_id: ctx.from.id})
        await ctx.deleteMessage(usdb.qt)
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {exerquat: 5}})
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {sendedex: 0}})
        await ctx.scene.leave('exerquat')
        await ctx.answerCbQuery()
    }catch(e) {
        console.error(e);
    }
})

exerquat.on("message", async ctx => {
    try {
        await ctx.scene.enter('exerquat')
    }catch(e) {
        console.error(e);
    }
})



exerquat.leave(async ctx => {
    try {
        let usdb = await collection.findOne({user_id: ctx.from.id})
        let exers = await collection.findOne({_id: ObjectId('6385e6b6fa527ee78b367563')})
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$unset: {qt: usdb.qt}})
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {onwex: 0}})
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {daycheck: false}})
        if (exers.JS.length == 0) {
            await ctx.reply('Спасибо! В скором времени пришлю задачи.')
            await ctx.scene.enter('leaves')
        }else {
            for (let i = 0; i < exers.JS.length; i++) {
                let ex = await exers.JS[i].ex;
                await collection.findOneAndUpdate({user_id: ctx.from.id}, {$push: {exercises: {exnum: i,ex: `${ex}`}}})
            }
            await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {onex: false}})
            await ctx.reply('Спасибо! Поехали!')
            await ctx.scene.enter('somesquat')
        }
    }catch(e) {
        console.error(e);
    }
})

const somesquat = new Scenes.BaseScene("somesquat");

somesquat.enter(async ctx => {
    try {
        let usertoglob = await collection.findOne({user_id: ctx.from.id})
        let ex = await collection.findOne({_id: ObjectId('6385e6b6fa527ee78b367563')})
        let res = usertoglob.onwex + 1
        let update = await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {onwex: res}})
        let userq = await collection.findOne({user_id: ctx.from.id})
        if (userq.exerquat == 1) {
            if (userq.onwex == 1) {
                let fq = await ctx.replyWithHTML(`1 Задача\n${ex.JS[0].ex}`, Markup.inlineKeyboard([
                    [Markup.button.callback('Решил', 'compl'), Markup.button.callback('Следующая', 'next')]
                ]))
                await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {quat: fq.message_id}})
            }else {
                await ctx.scene.enter('leaves')
            } 
        }else if(userq.exerquat == 3) {
            if (userq.onwex == 1) {
                let fq = await ctx.replyWithHTML(`1 Задача\n${ex.JS[0].ex}`, Markup.inlineKeyboard([
                    [Markup.button.callback('Решил', 'compl'), Markup.button.callback('Следующая', 'next')]
                ]))
                await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {quat: fq.message_id}})
            }else if(userq.onwex == 2) {
                let sq = await ctx.replyWithHTML(`2 Задача\n${ex.JS[1].ex}`, Markup.inlineKeyboard([
                    [Markup.button.callback('Решил', 'compl'), Markup.button.callback('Следующая', 'next')]
                ]))
                await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {quat: sq.message_id}})
            }else if(userq.onwex == 3) {
                let tq = await ctx.replyWithHTML(`3 Задача\n${ex.JS[2].ex}`, Markup.inlineKeyboard([
                    [Markup.button.callback('Решил', 'compl'), Markup.button.callback('Следующая', 'next')]
                ]))
                await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {quat: tq.message_id}})
            }else {
                await ctx.scene.enter('leaves')
            }
        }else {
            if (userq.onwex == 1) {
                let fq = await ctx.replyWithHTML(`1 задача\n${ex.JS[0].ex}`, Markup.inlineKeyboard([
                    [Markup.button.callback('Решил', 'compl'), Markup.button.callback('Следующая', 'next')]
                ]))
                await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {quat: fq.message_id}})
            }else if(userq.onwex == 2) {
                let sq = await ctx.replyWithHTML(`2 задача\n${ex.JS[1].ex}`, Markup.inlineKeyboard([
                    [Markup.button.callback('Решил', 'compl'), Markup.button.callback('Следующая', 'next')]
                ]))
                await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {quat: sq.message_id}})
            }else if(userq.onwex == 3) {
                let tq = await ctx.replyWithHTML(`3 задача\n${ex.JS[2].ex}`, Markup.inlineKeyboard([
                    [Markup.button.callback('Решил', 'compl'), Markup.button.callback('Следующая', 'next')]
                ]))
                await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {quat: tq.message_id}})
            }else if(userq.onwex == 4) {
                let tq = await ctx.replyWithHTML(`4 задача\n${ex.JS[3].ex}`, Markup.inlineKeyboard([
                    [Markup.button.callback('Решил', 'compl'), Markup.button.callback('Следующая', 'next')]
                ]))
                await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {quat: tq.message_id}})
            }else if(userq.onwex == 5) {
                let tq = await ctx.replyWithHTML(`5 задача\n${ex.JS[4].ex}`, Markup.inlineKeyboard([
                    [Markup.button.callback('Решил', 'compl'), Markup.button.callback('Следующая', 'next')]
                ]))
                await collection.findOneAndUpdate({user_id: ctx.from.id}, {$set: {quat: tq.message_id}})
            }else {
                await ctx.scene.enter('leaves')
            }
        }
        
    }catch(e) {
        console.error(e);
    }
})



somesquat.on('message', async ctx => {
    return
})

const leaves = new Scenes.BaseScene("leaves");

leaves.enter(async ctx => {
    try {
        let udb = await collection.findOne({user_id: ctx.from.id})
        await collection.findOneAndUpdate({user_id: ctx.from.id}, {$unset: {quat: udb.quat}})
        await ctx.reply('На сегодня всё. В скором времени пришлю еще задачи.')
        let usertoglob = await collection.findOne({user_id: ctx.from.id})
        await collection.findOneAndUpdate({_id: ObjectId('6389f75297e694fc6cacf2c5')}, {$push: {users: {user_id: usertoglob.user_id}}})
    }catch(e) {
        console.error(e);
    }
})

const deletee = new Scenes.BaseScene("deletee");  

deletee.enter(async ctx => {
    try {
        let ex = await collection.findOne({_id: ObjectId('6385e6b6fa527ee78b367563')})
        await ctx.reply('Получение всех задач...')
        for (let i = 0; i < ex.JS.length; i++) {
            await ctx.reply(`Номер задачи: #${i}\n\nТекст задачи:\n${ex.JS[i].ex}`)  
        }
        await ctx.scene.enter('getnum')
    }catch(e) {
        console.error(e);
    }
})

const getnum = new Scenes.BaseScene("getnum");  

getnum.enter(async ctx => {
    try {
        await ctx.reply('Введите номер задачи из списка выше(без знака #):')  
    }catch(e) {
        console.error(e);
    }
})

getnum.on('text', async ctx => {
    try {
        let text = await Number(ctx.message.text)
        let num = await collection.findOne({allex: {exnum: text}})
        if (num == null) {
            await ctx.reply('Не смог найти задачу под данным id :{')
            await ctx.scene.enter('getnum')
        } else {
            let quatadm = await ctx.replyWithHTML(`Вы точно уверены то что хотите удалить задание под id <b>${text}</b> для всех?`, Markup.inlineKeyboard([
                [Markup.button.callback('Да, удалить', 'dy'), Markup.button.callback('Нет, отмена', 'dn')],
                [Markup.button.callback('Выбрать другое', 'dr')]
            ]))
            await collection.findOneAndUpdate({_id: ObjectId('638f9a6693c6d1be75117ddf')}, {$set: {quatadm: quatadm.message_id}})
            await collection.findOneAndUpdate({_id: ObjectId('638f9a6693c6d1be75117ddf')}, {$set: {num: text}})        
        }
    } catch (e) {
        console.error();
    }
})

const add = new Scenes.BaseScene("add");

add.enter(async ctx => {
    try {
        await ctx.reply('Введите текст задачи:')  
    }catch(e) {
        console.error(e);
    }
})

add.on("text", async ctx => {
    try {
        let quatadm = await ctx.replyWithHTML(`Вы точно уверены то что хотите добавить следующее задание для всех?\n\n${ctx.message.text}`, Markup.inlineKeyboard([
            [Markup.button.callback('Да, внести', 'ay'), Markup.button.callback('Нет, отмена', 'an')],
            [Markup.button.callback('Редактировать', 'ar')]
        ]))
        await collection.findOneAndUpdate({_id: ObjectId('638f9a6693c6d1be75117ddf')}, {$set: {quatadm: quatadm.message_id}})
        await collection.findOneAndUpdate({_id: ObjectId('638f9a6693c6d1be75117ddf')}, {$set: {text: ctx.message.text}})
    } catch (e) {
        console.error(e);
    }
})

const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Scenes.Stage([getinf, getinfperiode, exerquat, somesquat, leaves, deletee, getnum, add]);
bot.use(session());
bot.use(stage.middleware());

const { MongoClient, ObjectId } = require('mongodb');
const { ObjectID } = require('bson');
const url = process.env.DB;
const client = new MongoClient(url);
client.connect();  
const db = client.db("bot");
const collection = db.collection('progexer');

const { DateTime } = require('luxon');

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min
}

bot.command('admin', async ctx => {
    try {
        if (ctx.from.id == '298921380') {
            await ctx.replyWithHTML('Выберите инструмент для редактирования базу задач:', Markup.inlineKeyboard([
                [Markup.button.callback('Удалить задачу', 'delete')],
                [Markup.button.callback('Добавить задачу', 'add')]
            ]))
        } else {
            await ctx.reply('Недостаточно прав.')
        }
        
    } catch (e) {
        console.error(e);
    }
})

bot.action('delete', async ctx => {
    try {
        await ctx.deleteMessage(ctx.callbackQuery.message.message_id)
        await ctx.scene.enter('deletee')
    } catch (e) {
        console.error(e);
    }
})

bot.action('dr', async ctx => {
    try {
        let adm = await collection.findOne({_id: ObjectId('638f9a6693c6d1be75117ddf')})
        await ctx.deleteMessage(adm.quatadm)
        await ctx.answerCbQuery('Обработка...')
        await ctx.scene.enter('getnum')
    } catch (e) {
        console.error(e);
    }
})

bot.action('dn', async ctx => {
    try {
        let adm = await collection.findOne({_id: ObjectId('638f9a6693c6d1be75117ddf')})
        await ctx.deleteMessage(adm.quatadm)
        await ctx.reply('Отменено.')
        await ctx.answerCbQuery('Отменено')
        await ctx.scene.leave('getnum')
    } catch (e) {
        console.error(e);
    }
})

bot.action('dy', async ctx => {
    try {
        let adm = await collection.findOne({_id: ObjectId('638f9a6693c6d1be75117ddf')})
        await ctx.deleteMessage(adm.quatadm)
        let users = await collection.findOne({_id: ObjectId('6389f75297e694fc6cacf2c5')})
        let ex = await collection.findOne({_id: ObjectId('6385e6b6fa527ee78b367563')})
        await collection.findOneAndUpdate({_id: ObjectId('6385e6b6fa527ee78b367563')}, {$pull: {JS: {exnum: adm.num}}})
        await collection.findOneAndUpdate({_id: ObjectId('638f9a6693c6d1be75117ddf')}, {$pull: {allex: {exnum: adm.num}}})
        for (let i = 0; i < users.users.length; i++) {
            let user = users.users[i].user_id;
            let eachuser = await collection.findOne({user_id: user})
            await collection.findOneAndUpdate({user_id: user}, {$pull: {exercises: {exnum: adm.num}}})
        }
        await ctx.reply('Изменения успешно внесены!')
        await ctx.answerCbQuery('Успех!', {show_alert: true})
        await ctx.scene.leave('getnum')
    } catch (e) {
        console.error(e);
    }
})

bot.action('ar', async ctx => {
    try {
        let adm = await collection.findOne({_id: ObjectId('638f9a6693c6d1be75117ddf')})
        await ctx.deleteMessage(adm.quatadm)
        await ctx.answerCbQuery('Обработка...')
        await ctx.scene.enter('add')
    } catch (e) {
        console.error(e);
    }
})

bot.action('ay', async ctx => {
    try {
        let adm = await collection.findOne({_id: ObjectId('638f9a6693c6d1be75117ddf')})
        await ctx.deleteMessage(adm.quatadm)
        let users = await collection.findOne({_id: ObjectId('6389f75297e694fc6cacf2c5')})
        let ex = await collection.findOne({_id: ObjectId('6385e6b6fa527ee78b367563')})
        await collection.findOneAndUpdate({_id: ObjectId('6385e6b6fa527ee78b367563')}, {$push: {JS: {ex: adm.text, exnum: ex.JS.length}}})
        await collection.findOneAndUpdate({_id: ObjectId('638f9a6693c6d1be75117ddf')}, {$push: {allex: {exnum: ex.JS.length}}})
        let extwo = await collection.findOne({_id: ObjectId('6385e6b6fa527ee78b367563')})
        for (let i = 0; i < users.users.length; i++) {
            let user = users.users[i].user_id;
            let eachuser = await collection.findOne({user_id: user})
            await collection.findOneAndUpdate({user_id: user}, {$push: {exercises: {exnum: ex.JS.length, ex: adm.text}}})
        }
        await ctx.reply('Изменения успешно внесены!')
        await ctx.answerCbQuery('Успех!', {show_alert: true})
        await ctx.scene.leave('add')
    } catch (e) {
        console.error(e);
    }
})

bot.action('an', async ctx => {
    try {
        let adm = await collection.findOne({_id: ObjectId('638f9a6693c6d1be75117ddf')})
        await ctx.deleteMessage(adm.quatadm)
        await ctx.reply('Отменено.')
        await ctx.answerCbQuery('Отменено')
        await ctx.scene.leave('add')
    } catch (e) {
        console.error(e);
    }
})
 
bot.action('add', async ctx => {
    try {
        await ctx.deleteMessage(ctx.callbackQuery.message.message_id)
        await ctx.scene.enter('add')
    } catch (e) {
        console.error(e);
    }
})

setInterval(async () => {
    try {
        let date = await DateTime.now().setZone('Europe/Moscow').setLocale('ru-RU');
        let exdata = await collection.findOne({_id: ObjectId('6385e6b6fa527ee78b367563')})
        let users = await collection.findOne({_id: ObjectId('6389f75297e694fc6cacf2c5')})
        let day = date.c.day
        if (day == exdata.day) {  
            if (exdata.sended == false) {
                if (users.users.length == 0) {
                    return
                } else {
                    for (let i = 0; i < users.users.length; i++) {
                        let user = await users.users[i].user_id  
                        let eachuser = await collection.findOne({user_id: user})
                        await collection.findOneAndUpdate({user_id: user}, {$set: {sendedex: 0}})
                        if (eachuser.daycheck == false) {
                            if (eachuser.dattosend == 1) {
                                let res = await eachuser.dattosend - 1;
                                await collection.findOneAndUpdate({user_id: user}, {$set: {dattosend: res}})
                                let chekdat = await collection.findOne({user_id: user})
                                let length = await eachuser.exercises.length - 1;
                                let exnum = await getRandomIntInclusive(0, length)
    
                                if(eachuser.exercises.length == 0) {       
                                    await collection.findOneAndUpdate({user_id: user}, {$set: {dattosend: 1}})
                                    await collection.findOneAndUpdate({user_id: user}, {$set: {daycheck: true}})                                 
                                }else {
                                    if (eachuser.onex == true) {
                                        return
                                    } else {
                                        let res = await eachuser.sendedex + 1;
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {sendedex: res}})
                                        let quationts = await bot.telegram.sendMessage(eachuser.user_id, `${res} задача:\n\n${eachuser.exercises[exnum].ex}`, {parse_mode: 'HTML', ...Markup.inlineKeyboard([[Markup.button.callback('Решил', 'comleated'), Markup.button.callback('Следующая', 'setnext')]])})
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {onwexex: eachuser.exercises[exnum].ex}})
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {onwex: eachuser.exercises[exnum].exnum}}) 
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {onex: true}}) 
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {setnextex: []}})
    
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {quattst: quationts.message_id}})      
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {dattosend: chekdat.frequency}})
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {daycheck: true}})
                                    }   
                                }
                            }else if(eachuser.dattosend == 2) {
                                let res = await eachuser.dattosend - 1;
                                await collection.findOneAndUpdate({user_id: user}, {$set: {dattosend: res}})
                                await collection.findOneAndUpdate({user_id: user}, {$set: {daycheck: true}})
                            }else if(eachuser.dattosend == 3) {
                                let res = await eachuser.dattosend - 1;
                                await collection.findOneAndUpdate({user_id: user}, {$set: {dattosend: res}})
                                await collection.findOneAndUpdate({user_id: user}, {$set: {daycheck: true}})
                            }else {
                                let chekdat = await collection.findOne({user_id: user})
                                let length = await eachuser.exercises.length - 1;
                                let exnum = await getRandomIntInclusive(0, length)
    
                                if(eachuser.exercises.length == 0) {
                                    return
                                }else {
                                    if (eachuser.onex == true) {
                                        return
                                    } else {
                                        let res = await eachuser.sendedex + 1;
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {sendedex: res}})
                                        let quationts = await bot.telegram.sendMessage(eachuser.user_id, `${res} задача:\n\n${eachuser.exercises[exnum].ex}`, {parse_mode: 'HTML', ...Markup.inlineKeyboard([[Markup.button.callback('Решил', 'comleated'), Markup.button.callback('Следующая', 'setnext')]])})
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {onwexex: eachuser.exercises[exnum].ex}})
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {onwex: eachuser.exercises[exnum].exnum}}) 
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {onex: true}}) 
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {setnextex: []}})
    
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {quattst: quationts.message_id}})      
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {dattosend: chekdat.frequency}})
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {daycheck: true}})
                                    }
                                }
                            }
                        }else {
                            return
                        } 
                    } 
                    await collection.findOneAndUpdate({_id: ObjectId('6385e6b6fa527ee78b367563')}, {$set: {sended: true}})               
                }
            }else {
                return
            }
        }else if (day > exdata.day) {
            await collection.findOneAndUpdate({_id: ObjectId('6385e6b6fa527ee78b367563')}, {$set: {sended: false}})
            await collection.findOneAndUpdate({_id: ObjectId('6385e6b6fa527ee78b367563')}, {$set: {day: day}})
            for(let i = 0; i < users.users.length; i++) {
                let user = await users.users[i].user_id  
                let eachuser = await collection.findOne({user_id: user}) 
                await collection.findOneAndUpdate({user_id: user}, {$set: {daycheck: false}})
                await collection.findOneAndUpdate({user_id: user}, {$set: {sendedex: 0}})
            }
            let exdatab = await collection.findOne({_id: ObjectId('6385e6b6fa527ee78b367563')})
            if (exdatab.sended == false) {
                if (users.users.length == 0) {
                    return
                }else {
                    for (let i = 0; i < users.users.length; i++) {
                        let user = await users.users[i].user_id    
                        let eachuser = await collection.findOne({user_id: user})  
                        if (eachuser.daycheck == false) {
                            if (eachuser.dattosend == 1) {
                                let res = await eachuser.dattosend - 1;
                                await collection.findOneAndUpdate({user_id: user}, {$set: {dattosend: res}})
    
                                let chekdat = await collection.findOne({user_id: user})
                                let length = await eachuser.exercises.length - 1;
                                let exnum = await getRandomIntInclusive(0, length)
        
                                if(eachuser.exercises.length == 0) {
                                    await collection.findOneAndUpdate({user_id: user}, {$set: {dattosend: 1}})
                                    await collection.findOneAndUpdate({user_id: user}, {$set: {daycheck: true}})
                                }else {
                                    if (eachuser.onex == true) {
                                        return
                                    } else {
                                        let res = await eachuser.sendedex + 1;
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {sendedex: res}})
                                        let quationts = await bot.telegram.sendMessage(eachuser.user_id, `${res} задача:\n\n${eachuser.exercises[exnum].ex}`, {parse_mode: 'HTML', ...Markup.inlineKeyboard([[Markup.button.callback('Решил', 'comleated'), Markup.button.callback('Следующая', 'setnext')]])})
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {onwexex: eachuser.exercises[exnum].ex}})
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {onwex: eachuser.exercises[exnum].exnum}}) 
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {onex: true}}) 
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {setnextex: []}})
    
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {quattst: quationts.message_id}})      
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {dattosend: chekdat.frequency}})
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {daycheck: true}})
                                    }
                                }
                            }else if(eachuser.dattosend == 2) {
                                let res = await eachuser.dattosend - 1;
                                await collection.findOneAndUpdate({user_id: user}, {$set: {dattosend: res}})
                                await collection.findOneAndUpdate({user_id: user}, {$set: {daycheck: true}})
                            }else if(eachuser.dattosend == 3) {
                                let res = await eachuser.dattosend - 1;
                                await collection.findOneAndUpdate({user_id: user}, {$set: {dattosend: res}})
                                await collection.findOneAndUpdate({user_id: user}, {$set: {daycheck: true}})
                            }else {
                                let chekdat = await collection.findOne({user_id: user})
                                let length = await eachuser.exercises.length - 1;
                                let exnum = await getRandomIntInclusive(0, length)
        
                                if(eachuser.exercises.length == 0) {
                                    await collection.findOneAndUpdate({user_id: user}, {$set: {dattosend: 1}})
                                    await collection.findOneAndUpdate({user_id: user}, {$set: {daycheck: true}})
                                }else {
                                    if (eachuser.onex == true) {
                                        return
                                    } else {
                                        let res = await eachuser.sendedex + 1;
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {sendedex: res}})
                                        let quationts = await bot.telegram.sendMessage(eachuser.user_id, `${res} задача:\n\n${eachuser.exercises[exnum].ex}`, {parse_mode: 'HTML', ...Markup.inlineKeyboard([[Markup.button.callback('Решил', 'comleated'), Markup.button.callback('Следующая', 'setnext')]])})
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {onwexex: eachuser.exercises[exnum].ex}})
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {onwex: eachuser.exercises[exnum].exnum}}) 
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {onex: true}}) 
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {setnextex: []}})
    
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {quattst: quationts.message_id}})      
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {dattosend: chekdat.frequency}})
                                        await collection.findOneAndUpdate({user_id: user}, {$set: {daycheck: true}})
                                    }                                                                        
                                }
                            }
                        }else {
                            return
                        } 
                    }
                    await collection.findOneAndUpdate({_id: ObjectId('6385e6b6fa527ee78b367563')}, {$set: {sended: true}})
                }
            } else {
                return
            }
        }else {  
            await collection.findOneAndUpdate({_id: ObjectId('6385e6b6fa527ee78b367563')}, {$set: {day: day}})
        }
    } catch (e) {
        if (e.response.description == 'Forbidden: bot was blocked by the user') {
            await collection.findOneAndUpdate({_id: ObjectId('6389f75297e694fc6cacf2c5')}, {$pull: {users: {user_id: e.on.payload.chat_id}}})
            await collection.findOneAndDelete({user_id: e.on.payload.chat_id})
        } else {
            console.log(e);
        }
    }
}, 10000 /* 1800000 */);

bot.start(async (ctx) => {
    try {
        let alreadyinbd = await collection.findOne({user_id: ctx.message.from.id})
        if (alreadyinbd == null) {
            await ctx.scene.enter('getinf')
        }else {
            await ctx.reply(`Здравствуйте, ${ctx.message.from.first_name}!`)
        } 
    }catch(e) {
        console.error(e);
    }
});

bot.launch({dropPendingUpdates: true});


bot.action('comleated', async ctx => {
    try {
        let checksendedex = await collection.findOne({user_id: ctx.from.id})
        let res = await checksendedex.sendedex + 1;
        if (checksendedex.sendedex == checksendedex.exerquat) {
            let userdb = await collection.findOne({user_id: ctx.from.id})
            await ctx.tg.editMessageText(userdb.user_id, userdb.quattst, ctx.inlineMessageId, `${userdb.sendedex} задача:\n\n${userdb.onwexex}\n\n✅`)
            await collection.findOneAndUpdate({user_id: userdb.user_id}, {$pull: {exercises: {exnum: userdb.onwex}}})
            await ctx.reply('На сегодня всё. В скором времени пришлю еще задачи.')

            if (userdb.exercises.length == 0) {
                await collection.findOneAndUpdate({user_id: userdb.user_id}, {$set: {onex: false}})
                let thdb = await collection.findOne({user_id: userdb.user_id})

                if (thdb.updated == true) {
                    return
                } else {
                    if (thdb.setnextex.length == 0) {
                        await collection.findOneAndUpdate({user_id: thdb.user_id}, {$set: {updated: true}})
                        await collection.findOneAndUpdate({user_id: thdb.user_id}, {$unset: {setnextex: []}}) 
                    } else {
                        for (let i = 0; i < thdb.setnextex.length; i++) {
                            await collection.findOneAndUpdate({user_id: thdb.user_id}, {$push: {exercises: {exnum: thdb.setnextex[i].exnum, ex: thdb.setnextex[i].ex}}}) 
                        }  
                        await collection.findOneAndUpdate({user_id: thdb.user_id}, {$set: {updated: true}})
                        await collection.findOneAndUpdate({user_id: thdb.user_id}, {$unset: {setnextex: []}})                         
                    }
                } 

                await ctx.answerCbQuery()
            } else {
                await collection.findOneAndUpdate({user_id: userdb.user_id}, {$pull: {exercises: {exnum: userdb.onwex}}})
                await collection.findOneAndUpdate({user_id: userdb.user_id}, {$set: {onex: false}})

                let thdb = await collection.findOne({user_id: userdb.user_id})

                if (thdb.updated == true) {
                    return
                } else {
                    if (thdb.setnextex.length == 0) {
                        await collection.findOneAndUpdate({user_id: thdb.user_id}, {$set: {updated: true}})
                        await collection.findOneAndUpdate({user_id: thdb.user_id}, {$unset: {setnextex: []}}) 
                    } else {
                        for (let i = 0; i < thdb.setnextex.length; i++) {
                            await collection.findOneAndUpdate({user_id: thdb.user_id}, {$push: {exercises: {exnum: thdb.setnextex[i].exnum, ex: thdb.setnextex[i].ex}}}) 
                        }  
                        await collection.findOneAndUpdate({user_id: thdb.user_id}, {$set: {updated: true}})
                        await collection.findOneAndUpdate({user_id: thdb.user_id}, {$unset: {setnextex: []}})                         
                    }
                    
                }
                await ctx.answerCbQuery()
            }
        }else {
            let userdb = await collection.findOne({user_id: ctx.callbackQuery.from.id})
            if (userdb.exercises.length == 0) {
                await ctx.tg.editMessageText(userdb.user_id, userdb.quattst, ctx.inlineMessageId, `${userdb.sendedex} задача:\n\n${userdb.onwexex}\n\n✅`)
                await ctx.reply('У вас не осталось не выполненных задач.')
                await collection.findOneAndUpdate({user_id: userdb.user_id}, {$set: {sendedex: userdb.exerquat}})
            }else {
                await ctx.tg.editMessageText(userdb.user_id, userdb.quattst, ctx.inlineMessageId, `${userdb.sendedex} задача:\n\n${userdb.onwexex}\n\n✅`)
                await collection.findOneAndUpdate({user_id: userdb.user_id}, {$pull: {exercises: {exnum: userdb.onwex}}})
                await collection.findOneAndUpdate({user_id: userdb.user_id}, {$set: {sendedex: res}})
                await collection.findOneAndUpdate({user_id: userdb.user_id}, {$set: {updated: false}})

                let secdbus = await collection.findOne({user_id: userdb.user_id})
                let length = await secdbus.exercises.length - 1;
                let exnum = await getRandomIntInclusive(0, length)
                if (secdbus.exercises.length == 0) {
                    await ctx.reply('У вас не осталось не выполненных задач.')
                    
                    let userdbs = await collection.findOne({user_id: secdbus.user_id})

                    await collection.findOneAndUpdate({user_id: userdbs.user_id}, {$pull: {exercises: {exnum: userdbs.onwex}}})
                    await ctx.reply('На сегодня всё. В скором времени пришлю еще задачи.')
        
                    if (userdbs.exercises.length == 0) {
                        await collection.findOneAndUpdate({user_id: userdbs.user_id}, {$set: {onex: false}})
                        let thdb = await collection.findOne({user_id: userdbs.user_id})
        
                        if (thdb.updated == true) {
                            return
                        } else {
                            if (thdb.setnextex.length == 0) {
                                await collection.findOneAndUpdate({user_id: thdb.user_id}, {$set: {updated: true}})
                                await collection.findOneAndUpdate({user_id: thdb.user_id}, {$unset: {setnextex: []}}) 
                            } else {
                                for (let i = 0; i < thdb.setnextex.length; i++) {
                                    await collection.findOneAndUpdate({user_id: thdb.user_id}, {$push: {exercises: {exnum: thdb.setnextex[i].exnum, ex: thdb.setnextex[i].ex}}}) 
                                }  
                                await collection.findOneAndUpdate({user_id: thdb.user_id}, {$set: {updated: true}})
                                await collection.findOneAndUpdate({user_id: thdb.user_id}, {$unset: {setnextex: []}})                         
                            }
                        } 
        
                        await ctx.answerCbQuery()
                    } else {
                        await collection.findOneAndUpdate({user_id: userdbs.user_id}, {$pull: {exercises: {exnum: userdbs.onwex}}})
                        await collection.findOneAndUpdate({user_id: userdbs.user_id}, {$set: {onex: false}})
        
                        let thdb = await collection.findOne({user_id: userdbs.user_id})
        
                        if (thdb.updated == true) {
                            return
                        } else {
                            if (thdb.setnextex.length == 0) {
                                await collection.findOneAndUpdate({user_id: thdb.user_id}, {$set: {updated: true}})
                                await collection.findOneAndUpdate({user_id: thdb.user_id}, {$unset: {setnextex: []}}) 
                            } else {
                                for (let i = 0; i < thdb.setnextex.length; i++) {
                                    await collection.findOneAndUpdate({user_id: thdb.user_id}, {$push: {exercises: {exnum: thdb.setnextex[i].exnum, ex: thdb.setnextex[i].ex}}}) 
                                }  
                                await collection.findOneAndUpdate({user_id: thdb.user_id}, {$set: {updated: true}})
                                await collection.findOneAndUpdate({user_id: thdb.user_id}, {$unset: {setnextex: []}})                         
                            }
                            
                        }
                        await ctx.answerCbQuery()
                    }                    
                } else {
                    let editedex = await ctx.reply(`${secdbus.sendedex} задача:\n\n${secdbus.exercises[exnum].ex}`, Markup.inlineKeyboard([[Markup.button.callback('Решил', 'comleated'), Markup.button.callback('Следующая', 'setnext')]]))

                    await collection.findOneAndUpdate({user_id: secdbus.user_id}, {$set: {quattst: editedex.message_id}})
                    await collection.findOneAndUpdate({user_id: secdbus.user_id}, {$set: {onwexex: secdbus.exercises[exnum].ex}})
                    await collection.findOneAndUpdate({user_id: secdbus.user_id}, {$set: {onwex: secdbus.exercises[exnum].exnum}})                    
                }

                await ctx.answerCbQuery()                                                    
            }
        }                        
    } catch (e) {
        console.error(e);
    }
})

bot.action('setnext', async ctx => {
    try {
        let userdb = await collection.findOne({user_id: ctx.callbackQuery.from.id})

        let res = await userdb.sendedex + 1;
        if (userdb.sendedex == userdb.exerquat) {
            let userdb = await collection.findOne({user_id: ctx.from.id})
            await ctx.tg.editMessageText(userdb.user_id, userdb.quattst, ctx.inlineMessageId, `${userdb.sendedex} задача:\n\n${userdb.onwexex}\n\n❌`)
            await ctx.reply('На сегодня всё. В скором времени пришлю еще задачи.')

            if (userdb.exercises.length == 0) {
                await collection.findOneAndUpdate({user_id: userdb.user_id}, {$set: {onex: false}})
                let thdb = await collection.findOne({user_id: userdb.user_id})

                if (thdb.updated == true) {
                    return
                } else {
                    if (thdb.setnextex.length == 0) {
                        await collection.findOneAndUpdate({user_id: thdb.user_id}, {$set: {updated: true}})
                        await collection.findOneAndUpdate({user_id: thdb.user_id}, {$unset: {setnextex: []}}) 
                    } else {
                        for (let i = 0; i < thdb.setnextex.length; i++) {
                            await collection.findOneAndUpdate({user_id: thdb.user_id}, {$push: {exercises: {exnum: thdb.setnextex[i].exnum, ex: thdb.setnextex[i].ex}}}) 
                        }  
                        await collection.findOneAndUpdate({user_id: thdb.user_id}, {$set: {updated: true}})
                        await collection.findOneAndUpdate({user_id: thdb.user_id}, {$unset: {setnextex: []}})                         
                    }
                } 

                await ctx.answerCbQuery()
            } else {
                await collection.findOneAndUpdate({user_id: userdb.user_id}, {$pull: {exercises: {exnum: userdb.onwex}}})
                await collection.findOneAndUpdate({user_id: userdb.user_id}, {$set: {onex: false}})

                let thdb = await collection.findOne({user_id: userdb.user_id})

                if (thdb.updated == true) {
                    return
                } else {
                    if (thdb.setnextex.length == 0) {
                        await collection.findOneAndUpdate({user_id: thdb.user_id}, {$set: {updated: true}})
                        await collection.findOneAndUpdate({user_id: thdb.user_id}, {$unset: {setnextex: []}}) 
                    } else {
                        for (let i = 0; i < thdb.setnextex.length; i++) {
                            await collection.findOneAndUpdate({user_id: thdb.user_id}, {$push: {exercises: {exnum: thdb.setnextex[i].exnum, ex: thdb.setnextex[i].ex}}}) 
                        }  
                        await collection.findOneAndUpdate({user_id: thdb.user_id}, {$set: {updated: true}})
                        await collection.findOneAndUpdate({user_id: thdb.user_id}, {$unset: {setnextex: []}})                         
                    }
                    
                }
                await ctx.answerCbQuery()
            }            
        } else {
            if (userdb.exercises.length == 0) {
                await ctx.tg.editMessageText(userdb.user_id, userdb.quattst, ctx.inlineMessageId, `${userdb.sendedex} задача:\n\n${userdb.onwexex}\n\n❌`)
                await ctx.reply('У вас не осталось не выполненных задач.')
                await collection.findOneAndUpdate({user_id: userdb.user_id}, {$set: {sendedex: userdb.exerquat}})
            } else {
                await ctx.tg.editMessageText(userdb.user_id, userdb.quattst, ctx.inlineMessageId, `${userdb.sendedex} задача:\n\n${userdb.onwexex}\n\n❌`)
                await collection.findOneAndUpdate({user_id: userdb.user_id}, {$push: {setnextex: {exnum: userdb.onwex, ex: userdb.onwexex}}})
                await collection.findOneAndUpdate({user_id: userdb.user_id}, {$pull: {exercises: {exnum: userdb.onwex}}})
                await collection.findOneAndUpdate({user_id: userdb.user_id}, {$set: {sendedex: res}})
                await collection.findOneAndUpdate({user_id: userdb.user_id}, {$set: {updated: false}})

                let secdbus = await collection.findOne({user_id: userdb.user_id}) 
                let length = await secdbus.exercises.length - 1;
                let exnum = await getRandomIntInclusive(0, length)

                if (secdbus.exercises.length == 0) {
                    await ctx.reply('У вас не осталось не выполненных задач.')
                    let userdbs = await collection.findOne({user_id: ctx.from.id})
                    
                    await ctx.reply('На сегодня всё. В скором времени пришлю еще задачи.')
        
                    if (userdbs.exercises.length == 0) {
                        await collection.findOneAndUpdate({user_id: userdbs.user_id}, {$set: {onex: false}})
                        let thdb = await collection.findOne({user_id: userdbs.user_id})
        
                        if (thdb.updated == true) {
                            return
                        } else {
                            if (thdb.setnextex.length == 0) {
                                await collection.findOneAndUpdate({user_id: thdb.user_id}, {$set: {updated: true}})
                                await collection.findOneAndUpdate({user_id: thdb.user_id}, {$unset: {setnextex: []}}) 
                            } else {
                                for (let i = 0; i < thdb.setnextex.length; i++) {
                                    await collection.findOneAndUpdate({user_id: thdb.user_id}, {$push: {exercises: {exnum: thdb.setnextex[i].exnum, ex: thdb.setnextex[i].ex}}}) 
                                }  
                                await collection.findOneAndUpdate({user_id: thdb.user_id}, {$set: {updated: true}})
                                await collection.findOneAndUpdate({user_id: thdb.user_id}, {$unset: {setnextex: []}})                         
                            }
                        } 
        
                        await ctx.answerCbQuery()
                    } else {
                        await collection.findOneAndUpdate({user_id: userdbs.user_id}, {$pull: {exercises: {exnum: userdbs.onwex}}})
                        await collection.findOneAndUpdate({user_id: userdbs.user_id}, {$set: {onex: false}})
        
                        let thdb = await collection.findOne({user_id: userdbs.user_id})
        
                        if (thdb.updated == true) {
                            return
                        } else {
                            if (thdb.setnextex.length == 0) {
                                await collection.findOneAndUpdate({user_id: thdb.user_id}, {$set: {updated: true}})
                                await collection.findOneAndUpdate({user_id: thdb.user_id}, {$unset: {setnextex: []}}) 
                            } else {
                                for (let i = 0; i < thdb.setnextex.length; i++) {
                                    await collection.findOneAndUpdate({user_id: thdb.user_id}, {$push: {exercises: {exnum: thdb.setnextex[i].exnum, ex: thdb.setnextex[i].ex}}}) 
                                }  
                                await collection.findOneAndUpdate({user_id: thdb.user_id}, {$set: {updated: true}})
                                await collection.findOneAndUpdate({user_id: thdb.user_id}, {$unset: {setnextex: []}})                         
                            }
                            
                        }
                        await ctx.answerCbQuery()
                    }                    
                } else {
                    let editedex = await ctx.reply(`${secdbus.sendedex} задача:\n\n${secdbus.exercises[exnum].ex}`, Markup.inlineKeyboard([[Markup.button.callback('Решил', 'comleated'), Markup.button.callback('Следующая', 'setnext')]]))
                
                    await collection.findOneAndUpdate({user_id: secdbus.user_id}, {$set: {quattst: editedex.message_id}})
                    await collection.findOneAndUpdate({user_id: secdbus.user_id}, {$set: {onwex: secdbus.exercises[exnum].exnum}})
                    await collection.findOneAndUpdate({user_id: secdbus.user_id}, {$set: {onwexex: secdbus.exercises[exnum].ex}})                    
                }
                
                await ctx.answerCbQuery()                      
            } 
        }
    } catch (e) {
        console.error(e);
    }  
})

bot.action("compl", async ctx => {
    try {
        let usertoglob = await collection.findOne({user_id: ctx.from.id})
        let ex = await collection.findOne({_id: ObjectId('6385e6b6fa527ee78b367563')})
        if (usertoglob.onwex == 1) {
            await ctx.tg.editMessageText(ctx.chat.id, usertoglob.quat, ctx.inlineMessageId, `1 задача\n${ex.JS[0].ex}\n\n✅`)
            await collection.findOneAndUpdate({user_id: usertoglob.user_id}, {$pull: {exercises: {exnum: 0}}}) 
        } else if (usertoglob.onwex == 2) {
            await ctx.tg.editMessageText(ctx.chat.id, usertoglob.quat, ctx.inlineMessageId, `2 задача\n${ex.JS[1].ex}\n\n✅`)
            await collection.findOneAndUpdate({user_id: usertoglob.user_id}, {$pull: {exercises: {exnum: 1}}}) 
        } else if (usertoglob.onwex == 3) {
            await ctx.tg.editMessageText(ctx.chat.id, usertoglob.quat, ctx.inlineMessageId, `3 задача\n${ex.JS[2].ex}\n\n✅`)
            await collection.findOneAndUpdate({user_id: usertoglob.user_id}, {$pull: {exercises: {exnum: 2}}}) 
        }else if (usertoglob.onwex == 4) {
            await ctx.tg.editMessageText(ctx.chat.id, usertoglob.quat, ctx.inlineMessageId, `4 задача\n${ex.JS[3].ex}\n\n✅`)
            await collection.findOneAndUpdate({user_id: usertoglob.user_id}, {$pull: {exercises: {exnum: 3}}}) 
        }else if (usertoglob.onwex == 5) {
            await ctx.tg.editMessageText(ctx.chat.id, usertoglob.quat, ctx.inlineMessageId, `5 задача\n${ex.JS[4].ex}\n\n✅`)
            await collection.findOneAndUpdate({user_id: usertoglob.user_id}, {$pull: {exercises: {exnum: 4}}}) 
        }else {
            return
        }
        await ctx.scene.enter('somesquat')
        await ctx.answerCbQuery('Присылаю следующее...', {show_alert: false}) 
    }catch(e) {
        console.error(e);
    }
})

bot.action("next", async ctx => {
    try {
        let usertoglob = await collection.findOne({user_id: ctx.callbackQuery.from.id})
        let ex = await collection.findOne({_id: ObjectId('6385e6b6fa527ee78b367563')})
        if (usertoglob.onwex == 1) {
            await ctx.tg.editMessageText(ctx.chat.id, usertoglob.quat, ctx.inlineMessageId, `1 задача\n${ex.JS[0].ex}\n\n❌`) 
        } else if (usertoglob.onwex == 2) {
            await ctx.tg.editMessageText(ctx.chat.id, usertoglob.quat, ctx.inlineMessageId, `2 задача\n${ex.JS[1].ex}\n\n❌`)
        } else if (usertoglob.onwex == 3) {
            await ctx.tg.editMessageText(ctx.chat.id, usertoglob.quat, ctx.inlineMessageId, `3 задача\n${ex.JS[2].ex}\n\n❌`)
        }else if (usertoglob.onwex == 4) {
            await ctx.tg.editMessageText(ctx.chat.id, usertoglob.quat, ctx.inlineMessageId, `4 задача\n${ex.JS[3].ex}\n\n❌`)
        }else if (usertoglob.onwex == 5) {
            await ctx.tg.editMessageText(ctx.chat.id, usertoglob.quat, ctx.inlineMessageId, `5 задача\n${ex.JS[4].ex}\n\n❌`)
        }else {
            return
        }
        await ctx.scene.enter('somesquat')
        await ctx.answerCbQuery('Присылаю следующее...', {show_alert: false})
    }catch(e) {
        console.error(e);
    }
})


bot.command('admin', async ctx => {
    try {
        
    } catch (e) {
        console.error(e);
    }
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));