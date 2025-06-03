import type { APIRoute } from 'astro'
import xata from '@/utils/xataClient'

export const GET: APIRoute = async ({ request }) => {
  try {
    const urlParams = new URL(request.url).searchParams
    const password = urlParams.get('password')
    const passwordId = urlParams.get('passwordId')

    let passwordIdMatch

    if (passwordId) {
      const response = await xata.passwords
        .select(['xata_id'])
        .filter({
          xata_id: passwordId
        })
        .getFirst()

      if (response) {
        passwordIdMatch = passwordId
      }
    } else if (password) {
      const response = await xata.passwords.getAll()
      passwordIdMatch = response.find((item) => item.password === password)?.xata_id
    } else {
      return new Response(JSON.stringify('Password is required'), {
        status: 400,
      })
    }


    if (passwordIdMatch) {
      return new Response(JSON.stringify({ passwordId: passwordIdMatch }), {
        status: 200,
      })
    } else {
      return new Response(JSON.stringify('Wrong password'), {
        status: 401,
      })
    }

  } catch (error: any) {
    return new Response(JSON.stringify(error.errors), {
      status: error.status,
    })
  }
}