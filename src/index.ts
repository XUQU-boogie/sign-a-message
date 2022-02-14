import { Wallet } from '@ethersproject/wallet'
import { prompt } from 'enquirer'

interface PromptResponse {
  pk: string
  message: string
}
async function main() {
  const { pk, message } = await prompt<PromptResponse>([
    {
      type: 'input',
      name: 'pk',
      message: 'the private key with which to sign your message',
      validate: (x) => (!x ? 'private key required' : true),
    },
    {
      type: 'input',
      name: 'message',
      message: 'the message you would like to sign',
      validate: (x) => (!x ? 'message required' : true),
    },
  ])
  const w = new Wallet(pk)
  const result = await w.signMessage(message)
  console.log(`result: ${result}`)
  return result
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
  })
