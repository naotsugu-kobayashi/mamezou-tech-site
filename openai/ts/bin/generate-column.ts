import { ask } from '../util/chat-gpt.js';
import { ChatCompletionRequestMessage } from 'openai';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { WebClient } from '@slack/web-api';

type Gpt = {
  columns: {
    title: string,
    text: string,
    created: string,
  }[]
};

async function main(path: string) {
  console.log('talk to AI Chat...');
  const json: Gpt = JSON.parse(fs.readFileSync(path).toString());

  const prompt: ChatCompletionRequestMessage = {
    content: `Output funny jargon used by IT developers in programming.

Please follow the restrictions below.
- No need to reply message
- 20 output words in newline delimited format
- Only known jargon to be output
- Used around the world`,
    role: 'user'
  };
  const keywordsResponse = await ask({
    messages: [prompt],
    maxTokens: 1024,
    temperature: 0.7
  });
  const message = keywordsResponse.choices[0].message?.content || '';

  const arr = message.split('\n').filter(x => !!x).map(x => x.replace(/\d+\. /, ''));
  console.log(arr)
  const keyword = pickup(arr, json.columns.map(column => column.title));
  const result = await ask({
    messages: [prompt, {
      role: 'assistant',
      content: message
    }, {
      role: 'user',
      content: `用語「${keyword}」についてその内容を説明してください。
説明には以下の要素を必ず含めてください。
- 用語の説明
- 用語のジョーク

以下の制約事項を守ってください。

- Speak in Japanese
- 「はい」や「わかりました」等の返事はしない
- 明るく元気な口語で話す
- 挨拶はしない
- 「です」「ます」等の敬語は使わない
- AI Chatの一人称は「豆香」を使う
- AI Chatは美少女キャラクターとして話す`
    }],
    maxTokens: 2048,
    temperature: 0.7
  });
  const column = result.choices[0].message?.content.trim() || '';
  if (!column) throw new Error('no content');
  if (!safeResponse(column) || !safeResponse(column)) new Error(`un-safe content found: ${column}`);

  const item = {
    title: keyword,
    text: column.replaceAll(/\r?\n/g, '<br />'),
    created: new Date().toISOString(),
  };
  json.columns.unshift(item);
  json.columns = json.columns.slice(0, 20);
  fs.writeFileSync(path, JSON.stringify(json, null, 2));

  const token = process.env.SLACK_BOT_TOKEN;
  const web = new WebClient(token);

  const today = new Date();
  await web.chat.postMessage({
    channel: "C034MCKP4M6",
    // channel: "C04F1QJDLJD", // ops
    mrkdwn: true,
    text: "今日の豆香の豆知識コラム(予告)",
    unfurl_media: false,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}の豆香の豆知識コラム(予告)`
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: item.title,
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: column,
        }
      },
    ]
  })
}

function pickup(arr: string[], excludes: string[]): string {
  const i = Math.floor(Math.random() * arr.length);
  const target = arr[i];
  if (excludes.includes(target)) return pickup(arr, excludes);
  return target;
}

function safeResponse(inputString: string) {
  const patterns = [
    /<script[^>]*>/i,
    /<\/script>/i,
    /<[^>]+on\w+=/i,
    /javascript\s*:/i
  ];

  for (const pattern of patterns) {
    if (pattern.test(inputString)) {
      return false;
    }
  }
  return true;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const reportDir = `${__dirname}/../../../src/_data`;
const reportFile = `${reportDir}/gpt.json`;

await main(reportFile);