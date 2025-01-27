# Installation and Running Examples

## Node version

We're using Node's native fetch API, which is included for all node versions >= 18.0. Type node -v to check your current node version. Our SDK only works for Node versions 18.0 and above.

## Install dependencies

```bash
$ npm install
```

## Setup your API Key

Navigate to https://app.hamming.ai/settings to create an API Key, and add it to your _.env_ file:

```bash
HAMMING_API_KEY="<YOUR_API_KEY>"
```

## Running Examples

### Custom Voice Agent Monitoring
1. Ensure you have `HAMMING_API_KEY` in your .env
2. `npm install`
3. `npm run voiceAgentMonitoring`


## Monitoring

```
$ npm run monitoring
```

Visit the traces at: [https://app.hamming.ai/monitoring](https://app.hamming.ai/monitoring)

