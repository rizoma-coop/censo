import xata from '@/utils/xataClient'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request }) => {
  try {
    const response = await xata.answers
      .select(['xata_id'])
      .filter({
        survey: import.meta.env.SURVEY_ID
      })
      .getAll()

    return new Response(JSON.stringify(response), {
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify(error.errors), {
      status: error.status,
    })
  }
}
