jarsigner -verbose -keystore key android-release-unsigned.apk hume
zipalign -f -v 4 android-release-unsigned.apk run.apk