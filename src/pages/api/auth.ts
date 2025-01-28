import type { APIRoute } from 'astro'
export const prerender = false

export const GET: APIRoute = async ({ request }) => {
  try {
    const urlParams = new URL(request.url).searchParams
    const password = urlParams.get('password')

    if (password === 'rizoma') {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
      })
    } else {
      return new Response(JSON.stringify('wrong password'), {
        status: 401,
      })
    }

  } catch (error: any) {
    return new Response(JSON.stringify(error.errors), {
      status: error.status,
    })
  }
}