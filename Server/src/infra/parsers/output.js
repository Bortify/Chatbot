import {z} from 'zod'

export const productRecommendationSchema = z.object({
    output: {
        text: z.string().describe('Output of what user asked in a friendly manner.'),
        product: z.object().describe('Product object from knowledge base that is being recommended')
    }
})

export const generalQuestionResolutionSchema = z.object({
    object:{
        text: z.string().describe('Output of what user asked in a friendly manner.')
    }
})