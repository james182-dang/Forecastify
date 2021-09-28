 window.onSpotifyWebPlaybackSDKReady = () => {
     const token = 'BQB-hlKahpdBd55qlh2we6bimzSTa299qoQPKp2YK0gUN7jlPuyFryXtDQA5zqTxzffgN_KyXbjFy4Mom7YbWfJpGtMKd16LfdW-LzWfNwmsQjzyeiXTGAyDcQvjnCcGMtXJwCnTMou7vUg36EPbdY46b8eEEedAsSODB--gW7goJHRyb3aaUrk';
   const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); },
       volume: 0.5
   })
    
 Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
   });

 Not Ready
   player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

 player.addListener('initialization_error', ({ message }) => { 
      console.error(message);
 });

 player.addListener('authentication_error', ({ message }) => {
    console.error(message);
});

 player.addListener('account_error', ({ message }) => {
    console.error(message);
 });

 player.connect();


 };


