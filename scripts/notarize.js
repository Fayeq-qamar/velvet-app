const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  
  if (electronPlatformName !== 'darwin') {
    return;
  }

  console.log('🍎 Notarizing macOS app...');

  const appName = context.packager.appInfo.productFilename;
  const appPath = `${appOutDir}/${appName}.app`;

  // Check for required environment variables
  const appleId = process.env.APPLE_ID;
  const appleIdPassword = process.env.APPLE_ID_PASSWORD;
  const teamId = process.env.APPLE_TEAM_ID;

  if (!appleId || !appleIdPassword || !teamId) {
    console.log('⚠️ Skipping notarization (missing credentials)');
    console.log('To enable notarization, set these environment variables:');
    console.log('- APPLE_ID: Your Apple ID email');
    console.log('- APPLE_ID_PASSWORD: App-specific password');
    console.log('- APPLE_TEAM_ID: Your Apple Developer Team ID');
    return;
  }

  try {
    await notarize({
      appBundleId: 'com.velvet.ai.assistant',
      appPath: appPath,
      appleId: appleId,
      appleIdPassword: appleIdPassword,
      teamId: teamId,
    });

    console.log('✅ App notarized successfully');
  } catch (error) {
    console.error('❌ Notarization failed:', error);
    throw error;
  }
};