export const prerender = false

import xata from '@/utils/xataClient'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {

  const body = await request.json()

  try {
    const response = await xata.answers.create({
      answer: body.answer,
      survey: import.meta.env.SURVEY_ID
    })

    return new Response(JSON.stringify(response), {
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify(error.errors), {
      status: error.status,
    })
  }
}