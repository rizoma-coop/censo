import xata from '@/utils/xataClient'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {

  const body = await request.json()

  try {
    if (body.surveyId) {
      const response = await xata.answers.create({
        answer: body.answer,
        survey: body.surveyId
      })

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