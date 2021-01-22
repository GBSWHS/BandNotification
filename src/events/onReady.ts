import { get } from 'superagent'
import { MessageEmbed, TextChannel } from 'discord.js'

import Client from '../classes/Client'
import { GET_POSTS } from '../consts/band'

const MINUTES_IN_MILLISECOND = 60 * 1000

export default function (client: Client) {
  if (client.user) console.log(client.user.username + ' is now online!')
  if (client.config) console.log('ㄴPrefix: ' + client.config.prefix)

  let prevPostKey: string | undefined
  const { token, bandId, locale } = client.config.band
  const { notice } = client.config.channels

  setInterval(async () => {
    const res = await get(GET_POSTS(token, bandId, locale))
    const posts: any[] = res.body.result_data.items

    if (!prevPostKey) {
      prevPostKey = posts[0].post_key
      return
    }

    if (prevPostKey !== posts[0].post_key) {
      prevPostKey = posts[0].post_key

      const embed = new MessageEmbed({
        color: 0xB6E1F2,
        author: {
          name: posts[0].author.name,
          icon_url: posts[0].author.profile_image_url
        },
        description: posts[0].content
      })

      const channel = client.channels.fetch(notice) as unknown as TextChannel
      channel.send(embed)
    }
  }, 6 * MINUTES_IN_MILLISECOND)
}
