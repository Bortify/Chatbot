import { TypeOf, z } from 'zod'
import React from 'react'

import { ChatbotConfiguration } from '@/lib/type/chatbot'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Form from '@/components/Form'

const formSchema = z.object({
  errorText: z.string(),
  maxUserMsgAllowed: z.number(),
  greetingMessage: z.string(),
  limitExceedText: z.string(),
  thinkingText: z.string(),
  placeholder: z.string(),
  style: z.object({
    color: z.object({
      icon: z.object({
        background: z.string(),
        text: z.string(),
      }),
      typingArea: z.object({
        background: z.string(),
        text: z.string(),
      }),
      sendButton: z.object({
        background: z.string(),
        text: z.string(),
      }),
      header: z.object({
        background: z.string(),
        text: z.string(),
      }),
      message: z.object({
        user: z.object({
          background: z.string(),
          text: z.string(),
        }),
        machine: z.object({
          background: z.string(),
          text: z.string(),
        }),
      }),
      thinkingContainer: z.object({
        text: z.string(),
      }),
      body: z.string(),
    }),
    iconPosition: z.object({
      right: z.string(),
      bottom: z.string(),
    }),
  }),
  initialPrompts: z.array(
    z.object({
      label: z.string(),
      message: z.string(),
    })
  ),
})

type FormType = z.infer<typeof formSchema>

export default function BuilderForm({
  configurations,
  updateFunction,
}: {
  configurations: ChatbotConfiguration
  updateFunction: (param: ChatbotConfiguration) => void
}) {
  const { register, handleSubmit, formState } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: configurations,
  })
  
  const submitHandler = async (data: ChatbotConfiguration) => {
    updateFunction(data)
  }
  
  return (
    <div className='w-full'>
      <Form.Field.Input
        className='w-full mt-3'
        label={'Error Text'}
        {...register('errorText', {
          required: 'This field is required',
        })}
        type='text'
        error={formState.errors.errorText?.message}
        onChange={(e)=>{
          const value = e.currentTarget.value
          const config = configurations
          config.errorText = value
          updateFunction(config)
        }}
      />
      <div className='flex gap-3 mt-3'>
        <Form.Field.Input
          className='w-full'
          label={'Limit Exceeded Text'}
          {...register('limitExceedText', {
            required: 'This field is required',
          })}
          type='text'
          error={formState.errors.limitExceedText?.message}
          onChange={(e)=>{
            const value = e.currentTarget.value
            const config = configurations
            config.limitExceedText = value
            updateFunction(config)
          }}
        />
        <Form.Field.Input
          className='w-full'
          label={'Maximum User Message Allowed'}
          {...register('maxUserMsgAllowed', {
            required: 'This field is required',
          })}
          type='number'
          error={formState.errors.maxUserMsgAllowed?.message}
        />
      </div>
      <Form.Field.Input
        className='w-full mt-3'
        label={'Greeting Message'}
        {...register('greetingMessage', {
          required: 'This field is required',
        })}
        type='text'
        error={formState.errors.greetingMessage?.message}
        onChange={(e)=>{
          const value = e.currentTarget.value
          const config = configurations
          config.greetingMessage = value
          updateFunction(config)
        }}
      />
      <Form.Field.Input
        className='w-full mt-3'
        label={'Thinking Text'}
        {...register('thinkingText', {
          required: 'This field is required',
        })}
        type='text'
        error={formState.errors.thinkingText?.message}
        onChange={(e)=>{
          const value = e.currentTarget.value
          const config = configurations
          config.thinkingText = value
          updateFunction(config)
        }}
      />
      <Form.Field.Input
        className='w-full mt-3'
        label={'Placeholder'}
        {...register('placeholder', {
          required: 'This field is required',
        })}
        type='text'
        error={formState.errors.placeholder?.message}
        onChange={(e)=>{
          const value = e.currentTarget.value
          const config = configurations
          config.placeholder = value
          updateFunction(config)
        }}
      />
      <div className='flex gap-3 mt-3'>
        <Form.Field.Input
          className='w-full'
          label={'Header Background Color'}
          {...register('style.color.header.background', {
            required: 'This field is required',
          })}
          type='color'
          error={formState.errors.style?.color?.header?.background?.message}
          onChange={(e)=>{
            const value = e.currentTarget.value
            const config = configurations
            config.style.color.header.background = value
            updateFunction(config)
          }}
        />
        <Form.Field.Input
          className='w-full'
          label={'Header Text Color'}
          {...register('style.color.header.text', {
            required: 'This field is required',
          })}
          type='color'
          error={formState.errors.style?.color?.header?.text?.message}
          onChange={(e)=>{
            const value = e.currentTarget.value
            const config = configurations
            config.style.color.header.text = value
            updateFunction(config)
          }}
        />
      </div>
      <Form.Field.Input
        className='w-full mt-3'
        label={'Body Color'}
        {...register('style.color.body', {
          required: 'This field is required',
        })}
        type='color'
        error={formState.errors.style?.color?.body?.message}
        onChange={(e)=>{
          const value = e.currentTarget.value
          const config = configurations
          config.style.color.body = value
          updateFunction(config)
        }}
      />
      <div className='flex gap-3 mt-3'>
        <Form.Field.Input
          className='w-full'
          label={'User Message Background Color'}
          {...register('style.color.message.user.background', {
            required: 'This field is required',
          })}
          type='color'
          onChange={(e)=>{
            const value = e.currentTarget.value
            const config = configurations
            config.style.color.message.user.background = value
            updateFunction(config)
          }}
        />
        <Form.Field.Input
          className='w-full'
          label={'User Message Text Color'}
          {...register('style.color.message.user.text', {
            required: 'This field is required',
          })}
          type='color'
          onChange={(e)=>{
            const value = e.currentTarget.value
            const config = configurations
            config.style.color.message.user.text = value
            updateFunction(config)
          }}
        />
      </div>
      <div className='flex gap-3'>
        <Form.Field.Input
          className='w-full'
          label={'AI Message Background Color'}
          {...register('style.color.message.machine.background', {
            required: 'This field is required',
          })}
          type='color'
          onChange={(e)=>{
            const value = e.currentTarget.value
            const config = configurations
            config.style.color.message.machine.background = value
            updateFunction(config)
          }}
        />
        <Form.Field.Input
          className='w-full'
          label={'AI Message Text Color'}
          {...register('style.color.message.machine.text', {
            required: 'This field is required',
          })}
          type='color'
          onChange={(e)=>{
            const value = e.currentTarget.value
            const config = configurations
            config.style.color.message.machine.text = value
            updateFunction(config)
          }}
        />
      </div>
      <Form.Field.Input
        className='w-full mt-3'
        label={'Thinking and Limit Exceed Text Color'}
        {...register('style.color.thinkingContainer.text', {
          required: 'This field is required',
        })}
        type='color'
        onChange={(e)=>{
          const value = e.currentTarget.value
          const config = configurations
          config.style.color.thinkingContainer.text = value
          updateFunction(config)
        }}
      />
      <div className='flex gap-3 mt-3'>
        <Form.Field.Input
          className='w-full'
          label={'Typing Area Background Color'}
          {...register('style.color.typingArea.background', {
            required: 'This field is required',
          })}
          type='color'
          onChange={(e)=>{
            const value = e.currentTarget.value
            const config = configurations
            config.style.color.typingArea.background = value
            updateFunction(config)
          }}
        />
        <Form.Field.Input
          className='w-full'
          label={'Typing Area Text Color'}
          {...register('style.color.typingArea.text', {
            required: 'This field is required',
          })}
          type='color'
          onChange={(e)=>{
            const value = e.currentTarget.value
            const config = configurations
            config.style.color.typingArea.text = value
            updateFunction(config)
          }}
        />
      </div>
      <div className='flex gap-3 mt-3'>
        <Form.Field.Input
          className='w-full'
          label={'Send Button Background Color'}
          {...register('style.color.sendButton.background', {
            required: 'This field is required',
          })}
          type='color'
          onChange={(e)=>{
            const value = e.currentTarget.value
            const config = configurations
            config.style.color.sendButton.background = value
            updateFunction(config)
          }}
        />
        <Form.Field.Input
          className='w-full'
          label={'Send Button Text Color'}
          {...register('style.color.sendButton.text', {
            required: 'This field is required',
          })}
          type='color'
          onChange={(e)=>{
            const value = e.currentTarget.value
            const config = configurations
            config.style.color.sendButton.text = value
            updateFunction(config)
          }}
        />
      </div>
      <div className='flex gap-3 mt-3'>
        <Form.Field.Input
          className='w-full'
          label={'Icon Background Color'}
          {...register('style.color.icon.background', {
            required: 'This field is required',
          })}
          type='color'
          onChange={(e)=>{
            const value = e.currentTarget.value
            const config = configurations
            config.style.color.icon.background = value
            updateFunction(config)
          }}
        />
        <Form.Field.Input
          className='w-full'
          label={'Icon Text Color'}
          {...register('style.color.icon.text', {
            required: 'This field is required',
          })}
          type='color'
          onChange={(e)=>{
            const value = e.currentTarget.value
            const config = configurations
            config.style.color.icon.text = value
            updateFunction(config)
          }}
        />
      </div>
      <div className='flex gap-3 mt-3'>
        <Form.Field.Input
          className='w-full'
          label={'Icon Postion From Bottom'}
          {...register('style.iconPosition.bottom', {
            required: 'This field is required',
          })}
          error={formState.errors.style?.iconPosition?.bottom?.message}
          type='number'
          onChange={(e)=>{
            const value = e.currentTarget.value
            const config = configurations
            config.style.iconPosition.bottom = value
            updateFunction(config)
          }}
        />
        <Form.Field.Input
          className='w-full'
          label={'Icon Postion From Right'}
          {...register('style.iconPosition.right', {
            required: 'This field is required',
          })}
          type='number'
          error={formState.errors.style?.iconPosition?.right?.message}
          onChange={(e)=>{
            const value = e.currentTarget.value
            const config = configurations
            config.style.iconPosition.right = value
            updateFunction(config)
          }}
        />
      </div>
    </div>
  )
}
