import type { APIRoute } from 'astro'
import xata from '@/utils/xataClient'

export const prerender = false

export const GET: APIRoute = async ({ request }) => {

  try {
    const urlParams = new URL(request.url).searchParams
    const surveyId = urlParams.get('id')

    if (surveyId) {
      const response = await xata.surveys
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

export const PUT: APIRoute = async ({ request }) => {
  const body = await request.json()

  try {
    const response = await xata.surveys.update(
      body.id,
      {survey: body.survey}
    )

    return new Response(JSON.stringify(response), {
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify(error.errors), {
      status: error.status,
    })
  }
}
