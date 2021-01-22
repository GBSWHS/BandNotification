export const BASEURL = 'https://openapi.band.us/v2'

export const GET_POSTS = (token: string, bandId: string, locale: string) =>
  BASEURL + '/band/posts?access_token=' + token + '&band_key=' + bandId + '&locale=' + locale
