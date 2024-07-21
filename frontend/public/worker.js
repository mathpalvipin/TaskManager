self.addEventListener('push', async function(event) {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const title = data.title || 'Default title';
  const options = {
    body: data.body || 'Default body',
    //  icon: 'logo.png',  // Ensure the icon path is correct
    //  badge: 'logo.png'  // Optional: Add a badge icon if you have one
  };
  // console.log('[Service Worker] Push Received.',data ,options);
  event.waitUntil(
      self.registration.showNotification(title).then(() => {
        console.log('Notification shown successfully');
      }).catch(error => {
        console.error('Error showing notification:', error);
      })
    );
});
