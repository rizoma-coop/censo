import dates from '@/config'

const isSurveyAvailable = new Date() > dates.start && new Date() < dates.end

export default isSurveyAvailable
