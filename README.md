# asdf_chat

## Usage:  
$ npm init  
$ npm install  
$ nodemon index.js  


## Message types
```json
Message format:
{
  "txt": {
      "author": "Who send this message.",
      "message": "Message body.",
  },
}

Image format:
{
  "img": {
      "author": "Who send this message.",
      "uri": "Image path.",
  },
}

Sound format:
{
  "wav": {
      "author": "Who send this message.",
      "uri": "Audio path.",
  },
}
```