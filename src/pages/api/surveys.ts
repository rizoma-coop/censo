export const prerender = false

import type { APIRoute } from 'astro'
import xata from '@/utils/xataClient'
import type { Status } from '@/types'

export const GET: APIRoute = async ({ request }) => {

  try {
    const urlParams = new URL(request.url).searchParams
    const status = urlParams.get('status') as Status

    let filter: object | undefined
    const now = new Date
    if (status === 'previous') {
      filter = {
        end: { $lt: now }
      }
    } else if (status === 'current') {
      filter = {
        start: { $le: now },
        end: { $gt: now }
      }
    } else if (status === 'future') {
      filter = {
        $any: [
          {
            start: { $gt: now }
          }
        ]
      }
    }

    const response = await xata.surveys
      .select(['title', 'start', 'end'])
      .filter({
        active: true,
        ...filter
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