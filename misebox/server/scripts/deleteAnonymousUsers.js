// server/scripts/deleteAnonymousUsers.js
import { auth } from '../utils/firebase.js'; // Import the Firebase Auth module

// Function to delete anonymous users
const deleteAnonymousUsers = async () => {
  try {
    let nextPageToken;
    do {
      // List users, 1000 at a time
      const listUsersResult = await auth.listUsers(1000, nextPageToken);

      // Filter out anonymous users (those without providerData)
      const anonymousUsers = listUsersResult.users.filter(user => user.providerData.length === 0);

      // Delete each anonymous user
      for (const user of anonymousUsers) {
        try {
          await auth.deleteUser(user.uid);
          console.log(`Deleted anonymous user: ${user.uid}`);
        } catch (error) {
          console.error(`Error deleting user ${user.uid}:`, error);
        }
      }

      // If there are more users to fetch, continue with the next page
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);

    console.log('Finished deleting anonymous users.');
  } catch (error) {
    console.error('Error listing users:', error);
  }
};

// Execute the function
deleteAnonymousUsers();
// node server/scripts/deleteAnonymousUsers.js
