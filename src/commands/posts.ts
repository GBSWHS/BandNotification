import { get } from 'superagent'
import { Message, MessageEmbed } from 'discord.js'

import Client from '../classes/Client'
import { GET_POSTS } from '../consts/band'

export default async function (client: Client, msg: Message) {
  const { token, bandId, locale } = client.config.band

  const m = await msg.channel.send('읽는중입니다... 잠시만 기다려 주세요')

  const res = await get(GET_POSTS(token, bandId, locale))
  const posts: any[] = res.body.result_data.items

  let postIndex = 0

  nextPost()
  m.react('➡️')
  m.createReactionCollector((r) => r.emoji.name === '➡️', { dispose: true })
    .on('collect', nextPost).on('remove', nextPost)

  function nextPost () {
    const post = posts[postIndex]
    if (!post) return

    const embed = new MessageEmbed({
      color: 0xB6E1F2,
      author: {
        name: post.author.name,
        icon_url: post.author.profile_image_url
      },
      description: post.content,
      footer: {
        text: '아래 화살표를 눌러 다음 게시글을 읽어올 수 있어요!'
      }
    })

    postIndex++
    m.edit('', embed)
  }
}

export const aliases = ['', '최근', '게시글']
