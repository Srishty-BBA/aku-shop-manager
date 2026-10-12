HOUSE OF AKU - PWA PACKAGE
==========================
Files: index.html (the app), manifest.json, sw.js (offline), icons/ (app icons),
       images/ (85 product photos, full quality)

1. Create a GitHub repository and upload ALL of these files, keeping the folders.
   (GitHub's web uploader accepts about 100 files at a time: upload the images folder
   in a separate batch if it complains.)
2. Settings > Pages > Deploy from branch > main > / (root). Wait ~1 minute.
3. Open https://<your-username>.github.io/<repo>/ on your phone to check it loads.
4. Go to pwabuilder.com, paste that URL, Start, then Package for stores (Android).

Google Sheet link: the app reads your product list, MRP, retailer price and
In stock / Out of stock status from the sheet each time it opens (Setup > Google Sheet).
The sheet must be shared as "Anyone with the link can view".

Notes:
- On GitHub the app saves data only on that device. Use Setup > Backup regularly.
- When you update index.html or images, change V = 'aku-v5' to 'aku-v6' in sw.js.
