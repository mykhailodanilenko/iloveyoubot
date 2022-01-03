import { Bot, Keyboard } from "https://deno.land/x/grammy/mod.ts";
import { Questions } from "./strings/questions.ts";
import { Responses } from "./strings/responses.ts";

let counter = 419;

export const bot = new Bot(Deno.env.toObject().TG_TOKEN);

const startMenu = new Keyboard()
  .text(Questions.doYouLove).row();

const menu = new Keyboard()
  .text(Questions.doYouLove).row().text(Questions.chestno).row().text(
    Questions.howStrong1to10,
  ).row();

bot.command(
  "start",
  (ctx) =>
    ctx.reply("Привет, Эльма!", {
      reply_markup: { keyboard: startMenu.build() },
    }),
);

bot.on("message:text", (ctx) => {
  const getReply = (text: string) => {
    switch (text) {
      case (Questions.doYouLove): {
        return Responses.da;
      }
      case (Questions.chestno): {
        return Responses.chestno;
      }
      case (Questions.howStrong1to10): {
        counter += 1;
        return String(counter);
      }
      default: {
        return "Unrecognized command";
      }
    }
  };
  ctx.reply(getReply(ctx.message.text), {
    reply_markup: { keyboard: menu.build() },
  });
});

bot.start();
