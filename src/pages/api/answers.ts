import xata from '@/utils/xataClient'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request }) => {
  try {
    const urlParams = new URL(request.url).searchParams
    const surveyId = urlParams.get('surveyId')

    if (surveyId) {
      const response = await xata.answers
        .select(['xata_id'])
        .filter({
          survey: surveyId
        })
        .getAll()

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
