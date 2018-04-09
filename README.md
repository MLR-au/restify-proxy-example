# Example Restify Proxy Setup

## Preamble

I needed to figure out how to proxy certain restify endpoints back to other
services. The repo `http-proxy-middleware` can't be used with restify per
endpoint so we need to use the `http-proxy` code per route; being sure to
disable the bodyParser middleware on those routes.

In `gateway/index.js` you'll see a method `middlewareApplicator` which is applied
to the `bodyParser` middleware to conditionally turn it on or off. In this case,
it is not applied to the `/upload` as this route is the one being proxied elsewhere.

## Setup the containers

There are two services in this repo (gateway and backend) that can be run as
docker containers. To build them do the following:

```
> cd gateway
> docker build -t play/gateway .
> cd ../backend
> docker build -t play/backend .
```

The tags are required as these are used in the compose file

## Install the required packages:

```
> cd gateway
> yarn install
> cd ../backend
> yarn install
> cd ../frontend
> yarn install
```

## Starting and stopping the containers

To start the containers `./start.sh`. Likewise, to stop them: './stop.sh'

## Logging

You probably want to have three terminals open at this point. Two of them should
show the container logs for each of gateway and backend (docker logs -f
${containerid}) and the third is where you run the client from.

## Testing

In the third terminal:

```
> cd frontend
> node .
```

If all goes well you shouldn't see anything in the gateway logs and the backend
logs should show something like:

```
{ image:
   File {
     domain: null,
     _events: {},
     _eventsCount: 0,
     _maxListeners: undefined,
     size: 18154,
     path: '/tmp/upload_99253a38a3e777424beca8f508111ed5',
     name: 'photo.jpg',
     type: 'image/jpeg',
     hash: null,
     lastModifiedDate: 2018-04-09T23:26:51.865Z,
     _writeStream:
      WriteStream {
        _writableState: [Object],
        writable: false,
        domain: null,
        _events: {},
        _eventsCount: 0,
        _maxListeners: undefined,
        path: '/tmp/upload_99253a38a3e777424beca8f508111ed5',
        fd: null,
        flags: 'w',
        mode: 438,
        start: undefined,
        autoClose: true,
        pos: undefined,
        bytesWritten: 18154,
        closed: true } } }
```
