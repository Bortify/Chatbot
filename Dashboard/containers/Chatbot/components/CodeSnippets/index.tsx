import ToolTip from '@/components/Tooltip'
import Typography from '@/components/Typography'
import { Copy, CopyCheck } from 'lucide-react'
import React, { useState } from 'react'

function CodeSnippets({
  jsCode,
  cssCode,
  bodyCode,
}: {
  jsCode: string
  bodyCode: string
  cssCode: string
}) {
  return (
    <div className='sticky top-0 w-2/5 pt-10'>
      <Typography.Heading
        size='4xl'
        variant='h2'
        boldness={700}
        fontFamily='poppins'
        className='mb-3 text-gray-700'>
        Steps To Integrate
      </Typography.Heading>
      <Typography.Content
        size='sm'
        boldness={500}
        fontFamily='poppins'
        className='mb-2 text-gray-500'>
        1. Add below JS script to head of your HTML or JSX source code.
      </Typography.Content>
      <Snippet code={jsCode} />
      <Typography.Content
        size='sm'
        boldness={500}
        fontFamily='poppins'
        className='mt-4 mb-2 text-gray-500'>
        2. Add below CSS to head of your HTML or JSX source code.
      </Typography.Content>
      <Snippet code={cssCode} />
      <Typography.Content
        size='sm'
        boldness={500}
        fontFamily='poppins'
        className='mt-4 mb-2 text-gray-500'>
        3. Add below code snippet to body of your HTML or JSX source code.
      </Typography.Content>
      <Snippet code={bodyCode} />
    </div>
  )
}

export default CodeSnippets

function Snippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    const tempInput = document.createElement('input')
    tempInput.value = code
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
    setCopied(true)
  }

  return (
    <div className='relative'>
      <div className='mockup-code'>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
      <span
        className='absolute text-white cursor-pointer top-4 right-4'
        onClick={copyToClipboard}>
        <ToolTip text={copied ? 'Copied!' : 'Copy'} position='TOP'>
          {copied ? (
            <CopyCheck className='w-5 h-5' />
          ) : (
            <Copy className='w-5 h-5' />
          )}
        </ToolTip>
      </span>
    </div>
  )
}
