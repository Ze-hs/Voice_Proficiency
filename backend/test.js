const { AssemblyAI } = require( 'assemblyai' )

const client = new AssemblyAI({
  apiKey: '36da051d16a24e1399f8b44a803a0083' 
})

// You can use a local filepath:
// const audioFile = "./example.mp3"

// Or use a publicly-accessible URL:
const audioFile = 'https://my.microsoftpersonalcontent.com/personal/708a76cb65cc0790/_layouts/15/download.aspx?UniqueId=65190554-7a23-4b9b-a194-c283d07ca0d2&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiJlMjdjOWYxZi1mMDA5LTRiY2UtYjhjMC0xNGY3YTg5MmRiZmUiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3MzEyNjM4MDIifQ.8ksnA_EOe7-fh8CWcTKKrvVBFHC883N9D7cePZwfOzrhT2zJMdeit7hiziIDBbjWawyA25LOAhJalDD9uO5Kv9ijW-nXL-XkmXFmWpMdQgijcFqnqiq5xsVFGPwk2zPWaQQBJMHrQI6tQ7hEoiGNbo1ujM0ABxcxRChCOQevVVqDY7o1T2OpdQAOH6C4Pqxq8Q1KtiWqq0Yww5e96LUoDB0T1Fbir-s3cmPzWA8BmSKj6jLVglTXKXZTge4MlaQ4HwQ2rmC0s5yO9k2mo_QSAkEgEuCOFOCZBRFIIuxtIOyQekKZ2xK-FFmltMnjfi2eVNHWb6y1kXS35CNBRCYuR7MTjZaMzHHf491Sn-o17UGTMrgKz07gcJZjJKXSosxyK7pSX0IVvBmhrGDVdUTjkg.9ufqCpRiPemOXG-128_ZHRsubKZ9GahbVFYCiggrC3c&ApiVersion=2.0'

const params = {
  audio: audioFile,
  speaker_labels: true
}

const run = async () => {
  const transcript = await client.transcripts.transcribe(params)

  if (transcript.status === 'error') {
    console.error(`Transcription failed: ${transcript.error}`)
    process.exit(1)
  }

  console.log(transcript.text)

  for (let utterance of transcript.utterances) {
    console.log(`Speaker ${utterance.speaker}: ${utterance.text}`)
  }
}

run()