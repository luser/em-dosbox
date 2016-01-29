Module['webrtc'] = {
  //FIXME
  //broker: 'wss://webrtc-p2p-broker.herokuapp.com',
  broker: 'wss://webrtc-broker.ngrok.io',
  session: window.location.search ? window.location.search.substr(1) : undefined,
  onpeer: function(peer) {
    if (Module['webrtc']['session']) {
      console.log('connecting, route: %s', Module['webrtc']['session']);
      peer.connect(Module['webrtc']['session']);
    }
  },
  onroute: function(peer, route) {
    if (!Module['webrtc']['session']) {
      var a = document.getElementById('share');
      a.href = window.location + '?' + route;
      a.innerHTML = 'Send this link to a friend to play';
      console.log('listening, route: %s', route);
      peer.listen();
    }
  },
  onconnect: function(peer) {
  },
  ondisconnect: function(peer) {
  },
  onerror: function(error) {
    console.error(error);
  }
};
Module['preRun'].push(function() { Sockets.connectPeer(); });
