import type { APIRoute } from 'astro'
import xata from '@/utils/xataClient'

export const prerender = false

export const GET: APIRoute = async ({ request }) => {

  try {
    const urlParams = new URL(request.url).searchParams
    const surveyId = urlParams.get('id')

    if (surveyId) {
      const response = await xata.surveys
        .select(['survey'])
        .filter({
          xata_id: surveyId
        })
        .getFirst()

      return new Response(JSON.stringify(response), {
        status: 200,
      })
    } else {
      return new Response(JSON.stringify('Survey não encontrado'), {
        status: 400,
      })
    }

  } catch (error: any) {
    return new Response(JSON.stringify(error.errors), {
      status: error.status,
    })
  }
}