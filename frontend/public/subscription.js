// public/subscribe.js
const publicVapidKey = "BHKaG4rVvAKEGQPaJf73yZ4w0SL3bSfzaoTUiDuUtOq6VGC9YbhpeIReA-BJtVIWscu_sKkSgQS51wtrYKFNnGY";
console.log("Register Service Worker");
// const apiUrl = "https://task-manager-backend-khaki.vercel.app";
const apiUrl = "http://localhost:5000";

// Check for service worker
if ('serviceWorker' in navigator) {
  Notification.requestPermission().then(function(permission) {
    if (permission !== 'granted') {
     return  console.error('Notification permission not granted');
    }
    console.log('Permission granted');
  });
  
  send().then(()=>{console.log("serverworker register")}).catch(err => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
  // console.log("send function ");
  // Register Service Worker
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });

  // Register Push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey
  });
 
  localStorage.setItem('subscription', JSON.stringify(subscription));;
  // Send Push Notification
  // await fetch(`${apiUrl}/subscribe`, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     userId: 'USER_ID', // Replace with the actual user ID
  //     subscription
  //   }),
  //   headers: {
  //     'content-type': 'application/json'
  //   }
  // });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  // console.log(outputArray);
  return outputArray;
}

// Call this function on user logout
async function unsubscribe() {
  const register = await navigator.serviceWorker.ready;
  const subscription = await register.pushManager.getSubscription();

  if (subscription) {
    // Unsubscribe from push notifications
    await subscription.unsubscribe();

    // Send unsubscribe request to the server
    await fetch('/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({
        userId: 'USER_ID', // Replace with the actual user ID
        endpoint: subscription.endpoint
      }),
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}

// Call this function when the user logs out
async function logout() {
  await unsubscribe();
  // Perform other logout operations here (e.g., clearing tokens, redirecting, etc.)
}
