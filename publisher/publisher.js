const { WebPubSubServiceClient } = require('@azure/web-pubsub');

const hub = "pubsub";
let service = new WebPubSubServiceClient(process.env.Endpoint, hub);

// by default it uses `application/json`, specify contentType as `text/plain` if you want plain-text
service.sendToAll(process.argv[2], { contentType: "text/plain" });