/* eslint-disable no-undef */
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import path from 'path'
import { readFileSync, writeFileSync } from 'fs'

config()

const API_KEY = process.env.SUPABASE_API
const URL = process.env.SUPABASE_URL
const BUCKET_NAME = 'static_bundle'

const supabase = createClient(URL, API_KEY)

const getFiles = () => {
  const jsPath = path.join(process.cwd(), 'build', 'syro.js')
  const cssPath = path.join(process.cwd(), 'build', 'syro.css')

  const jsFile = readFileSync(jsPath)

  const cssFile = readFileSync(cssPath)
  return [jsFile, cssFile]
}

const uploadFiles = async () => {
  const [jsFile, cssFile] = getFiles()
  const bucket = supabase.storage.from(BUCKET_NAME)
  try {
    let res = await bucket.upload('/bundle.js', jsFile, {
      upsert: true,
      contentType: 'text/javascript'
    })
    console.log('js bundle result: ',res)
    res = await bucket.upload('/bundle.css', cssFile, {
      upsert: true,
      contentType: 'text/css'
    })
    console.log('css bundle result: ',res)
  } catch (e) {
    console.log('error occured: ', e)
  }
  const jsBundleUrl = bucket.getPublicUrl('bundle.js')
  const cssBundleURL = bucket.getPublicUrl('bundle.css')
  writeFileSync('url.json',JSON.stringify({
    jsBundleUrl,
    cssBundleURL
  }))
  console.log('url.json updated')
}

uploadFiles()
